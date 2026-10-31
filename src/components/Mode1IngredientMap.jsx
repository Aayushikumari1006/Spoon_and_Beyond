import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  X, 
  Check, 
  Heart, 
  Clock, 
  Users, 
  BarChart2, 
  RotateCcw, 
  Workflow, 
  UtensilsCrossed, 
  AlertCircle, 
  Search, 
  ChefHat,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  ALL_PANTRY_INGREDIENTS, 
  DYNAMIC_RECIPEDB_CATALOG, 
  getDynamicRecipeByIngredients,
  getAllMatchingRecipesByIngredients,
  RECIPE_MODE_1,
  FLAVOR_PAIRING_GRAPH,
  GENUINE_DATABASE_SUBSTITUTES,
  INGREDIENT_QUALITY_SPECS
} from '../data/recipes';
import { sounds } from '../utils/audio';
import { 
  searchRecipesByIngredients, 
  searchRecipesByTitle 
} from '../services/recipedb';
import FlowChartModal from './FlowChartModal';
import DishesPickerModal from './DishesPickerModal';
import SubstitutesModal from './SubstitutesModal';
import MissingIngredientsModal from './MissingIngredientsModal';
import { MealSetupSummaryBar } from './MealSetupSummaryBar';

export function Mode1IngredientMap({ 
  activeRecipe,
  feedbacks = {},
  onOpenFeedback,
  onAddToCart, 
  externalQuery, 
  onSaveRecipe, 
  _activeRole, 
  timeLimit,
  mealSetup,
  onEditSetup,
  onSaveMealSetup,
  onOpenCookAlong
}) {
  // Kitchen Settings State - Synchronized with user's Required Meal Setup
  const [peopleCount, setPeopleCount] = useState(() => mealSetup?.servings || 2);
  const [_cookingTime, setCookingTime] = useState(() => {
    if (mealSetup?.timeLimit && mealSetup.timeLimit !== 999) return mealSetup.timeLimit;
    if (timeLimit) return parseInt(timeLimit) || 30;
    return 30;
  });

  // Sync state whenever mealSetup prop updates
  useEffect(() => {
    if (mealSetup) {
      if (mealSetup.servings) setPeopleCount(mealSetup.servings);
      if (mealSetup.timeLimit) setCookingTime(mealSetup.timeLimit === 999 ? 45 : mealSetup.timeLimit);
    }
  }, [mealSetup]);

  // Recipe Card State (Dynamic RecipeDB match)
  const [recipe, setRecipe] = useState(() => activeRecipe || RECIPE_MODE_1);

  // Sync recipe when user selects a recipe from DiscoverRecipesModal
  useEffect(() => {
    if (activeRecipe) {
      setRecipe(activeRecipe);
    }
  }, [activeRecipe]);

  // Active dish user sensory feedback & taste memory
  const activeDishFeedback = feedbacks[recipe?.id] || Object.values(feedbacks).find(f => f.dishId === recipe?.id || f.dishTitle === recipe?.title);

  const _handleServesChange = (delta) => {
    const nextCount = Math.max(1, Math.min(12, peopleCount + delta));
    setPeopleCount(nextCount);
    if (onSaveMealSetup) {
      onSaveMealSetup({
        ...(mealSetup || {}),
        servings: nextCount
      });
    }
  };

  const _handleTimeChange = (mins) => {
    setCookingTime(mins);
    if (onSaveMealSetup) {
      onSaveMealSetup({
        ...(mealSetup || {}),
        timeLimit: mins
      });
    }
  };

  // Prominent Diet Choices
  const DIET_CHOICES = [
    { id: 'all', label: 'All Dishes', icon: '🍽️' },
    { id: 'veg', label: 'Pure Veg', icon: '🌱' },
    { id: 'non-veg', label: 'Non-Veg', icon: '🍗' },
    { id: 'vegan', label: '100% Vegan', icon: '🌿' },
    { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
    { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛' }
  ];
  const [activeDiet, setActiveDiet] = useState('all');

  const [dietary, setDietary] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false
  });
  const allergies = ['Nuts'];

  // Selected Ingredients IDs State - Default 5 primary ingredients
  const [selectedIds, setSelectedIds] = useState(['tomatoes', 'garlic', 'pasta', 'olive_oil', 'basil']);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Ingredient Pantry Dock Filter & Instant Hover Card State
  const [pantrySearch, setPantrySearch] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('All');
  const [hoveredPantryItem, setHoveredPantryItem] = useState(null);

  const [isSaved, setIsSaved] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);

  // RecipeDB API Search State
  const [_isSearchingAPI, setIsSearchingAPI] = useState(false);
  const [apiRecipesList, setApiRecipesList] = useState(DYNAMIC_RECIPEDB_CATALOG);

  // Modals Visibility
  const [isDishesModalOpen, setIsDishesModalOpen] = useState(false);
  const [isSubstitutesModalOpen, setIsSubstitutesModalOpen] = useState(false);
  const [isMissingModalOpen, setIsMissingModalOpen] = useState(false);
  const [isFlowChartOpen, setIsFlowChartOpen] = useState(false);

  // Active flow chart recipe target & multi-recipe suggestion cycle index
  const [flowChartRecipe, setFlowChartRecipe] = useState(null);
  const [recipeCycleIndex, setRecipeCycleIndex] = useState(0);

  // Dynamic alternative suggestions from the exact same ingredients
  const alternativeMatches = useMemo(() => {
    if (!apiRecipesList || apiRecipesList.length === 0) return [];
    return apiRecipesList.filter(r => r.id !== recipe?.id).slice(0, 3);
  }, [apiRecipesList, recipe?.id]);

  const handleCycleNext = (e) => {
    e.stopPropagation();
    if (!apiRecipesList || apiRecipesList.length <= 1) return;
    sounds.playPop(520);
    const nextIdx = (recipeCycleIndex + 1) % apiRecipesList.length;
    setRecipeCycleIndex(nextIdx);
    setRecipe(apiRecipesList[nextIdx]);
  };

  const handleCyclePrev = (e) => {
    e.stopPropagation();
    if (!apiRecipesList || apiRecipesList.length <= 1) return;
    sounds.playPop(460);
    const prevIdx = (recipeCycleIndex - 1 + apiRecipesList.length) % apiRecipesList.length;
    setRecipeCycleIndex(prevIdx);
    setRecipe(apiRecipesList[prevIdx]);
  };

  // Filter pantry ingredients by category, search text, and prominent diet choice
  const filteredPantry = useMemo(() => {
    return ALL_PANTRY_INGREDIENTS.filter(item => {
      const matchesCategory = activeCategoryTab === 'All' || item.category.toLowerCase() === activeCategoryTab.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(pantrySearch.toLowerCase());
      if (!matchesCategory || !matchesSearch) return false;

      // Diet filtering
      if (activeDiet === 'veg') {
        if (item.category === 'Proteins' && (item.id === 'chicken' || item.id === 'salmon' || item.id === 'shrimp')) {
          return false;
        }
      }
      if (activeDiet === 'vegan') {
        if (item.category === 'Dairy' || item.id === 'butter') return false;
        if (item.category === 'Proteins' && (item.id === 'chicken' || item.id === 'salmon' || item.id === 'shrimp')) return false;
      }
      if (activeDiet === 'dairy-free') {
        if (item.category === 'Dairy' || item.id === 'butter') return false;
      }
      return true;
    });
  }, [activeCategoryTab, pantrySearch, activeDiet]);

  // Ingredients from pantry currently matching active recipe
  const _matchingSelectedPantry = useMemo(() => {
    const recipeKeys = (recipe?.keywords || []).concat(recipe?.requiredIngredients || []);
    return ALL_PANTRY_INGREDIENTS.filter(item => 
      selectedIds.includes(item.id) && 
      (recipeKeys.length === 0 || recipeKeys.some(k => 
        k.toLowerCase() === item.id.toLowerCase() || 
        item.name.toLowerCase().includes(k.toLowerCase()) || 
        k.toLowerCase().includes(item.id.toLowerCase())
      ))
    );
  }, [selectedIds, recipe]);

  // Available substitutes for ingredients required by the current active recipe
  const _availableRecipeSubstitutes = useMemo(() => {
    const required = recipe?.requiredIngredients || ['garlic', 'tomatoes', 'pasta', 'olive_oil', 'basil'];
    const list = [];
    const addedCategories = new Set();

    required.forEach(reqId => {
      let cat = reqId;
      if (reqId.includes('onion') || reqId === 'shallot') cat = 'onions';
      else if (reqId.includes('garlic')) cat = 'garlic';
      else if (reqId.includes('tomato')) cat = 'tomatoes';
      else if (reqId.includes('cream')) cat = 'heavy_cream';
      else if (reqId.includes('cheese') || reqId.includes('parmesan')) cat = 'cheese';
      else if (reqId.includes('oil')) cat = 'olive_oil';
      else if (reqId.includes('pasta') || reqId.includes('penne') || reqId.includes('spaghetti')) cat = 'pasta';
      else if (reqId.includes('basil')) cat = 'fresh_basil';
      else if (['chicken', 'salmon', 'shrimp', 'beef', 'pork'].includes(reqId)) cat = 'proteins';

      if (GENUINE_DATABASE_SUBSTITUTES[cat] && !addedCategories.has(cat)) {
        addedCategories.add(cat);
        const originalName = reqId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const topSub = GENUINE_DATABASE_SUBSTITUTES[cat][0];
        if (topSub) {
          list.push({
            category: cat,
            originalName,
            topSub
          });
        }
      }
    });

    if (list.length === 0) {
      ['onions', 'garlic', 'olive_oil'].forEach(cat => {
        if (GENUINE_DATABASE_SUBSTITUTES[cat]) {
          const originalName = cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          list.push({
            category: cat,
            originalName,
            topSub: GENUINE_DATABASE_SUBSTITUTES[cat][0]
          });
        }
      });
    }

    return list;
  }, [recipe]);

  // Active Substitutes State (Deep real-time integration)
  const [activeSubstitutes, setActiveSubstitutes] = useState({});

  // Recalculate dynamic RecipeDB recipe in REAL TIME (0ms latency!)
  const updateRecipeFromIngredients = (activeIds) => {
    setIsRecalculating(true);
    setTimeout(() => setIsRecalculating(false), 380);

    const allMatches = getAllMatchingRecipesByIngredients(activeIds, mealSetup);
    if (allMatches && allMatches.length > 0) {
      setApiRecipesList(allMatches);
      setRecipeCycleIndex(0);
      const matched = allMatches[0];

      // Re-apply any active substitutes to the newly matched dish
      let nextTitle = matched.title;
      let nextSubtitle = matched.subtitle;
      let nextBadge = matched.badge || 'RecipeDB Real-Time';
      let nextSteps = matched.steps || [];

      if (Object.keys(activeSubstitutes).length > 0) {
        Object.entries(activeSubstitutes).forEach(([cat, sub]) => {
          nextTitle = `${matched.title} (${sub.name})`;
          nextSubtitle = `Customized with ${sub.name} • ${sub.match} • ${sub.badge}`;
          nextBadge = `${sub.badge} Formula`;
          nextSteps = nextSteps.map(st => {
            let desc = st.description || '';
            if (cat === 'heavy_cream') desc = desc.replace(/heavy cream/gi, sub.name).replace(/cream/gi, sub.name);
            if (cat === 'cheese') desc = desc.replace(/parmesan/gi, sub.name).replace(/cheese/gi, sub.name);
            if (cat === 'olive_oil') desc = desc.replace(/extra virgin olive oil/gi, sub.name).replace(/olive oil/gi, sub.name);
            if (cat === 'pasta') desc = desc.replace(/penne/gi, sub.name).replace(/pasta/gi, sub.name);
            if (cat === 'fresh_basil') desc = desc.replace(/fresh basil/gi, sub.name).replace(/basil/gi, sub.name);
            if (cat === 'proteins') desc = desc.replace(/chicken/gi, sub.name).replace(/salmon/gi, sub.name).replace(/shrimp/gi, sub.name);
            return { ...st, description: desc };
          });
        });
      }

      setRecipe({
        ...matched,
        title: nextTitle,
        subtitle: nextSubtitle,
        badge: nextBadge,
        steps: nextSteps
      });
    }
  };

  // Re-run dynamic matching whenever meal setup changes
  useEffect(() => {
    if (mealSetup) {
      updateRecipeFromIngredients(selectedIds);
    }
  }, [mealSetup]);

  // Diet selection handler with droplet sound
  const handleDietSelect = (dietId) => {
    sounds.playDietSelect();
    setActiveDiet(dietId);
    setDietary({
      vegetarian: dietId === 'veg' || dietId === 'vegan',
      vegan: dietId === 'vegan',
      glutenFree: dietId === 'gluten-free'
    });
    const allMatches = getAllMatchingRecipesByIngredients(selectedIds, {
      ...mealSetup,
      isVegetarian: dietId === 'veg' || dietId === 'vegan',
      isVegan: dietId === 'vegan',
      isGlutenFree: dietId === 'gluten-free',
      isDairyFree: dietId === 'dairy-free'
    });
    if (allMatches && allMatches.length > 0) {
      setApiRecipesList(allMatches);
      setRecipe(allMatches[0]);
    }
  };

  // Live Real-Time Substitutes Application Handler
  const handleApplySubstitute = (category, sub) => {
    sounds.playSubstituteSwap();

    const updatedSubs = {
      ...activeSubstitutes,
      [category]: sub
    };
    setActiveSubstitutes(updatedSubs);

    setRecipe(prev => {
      if (!prev) return prev;
      const baseTitle = prev.title.split(' (')[0];
      const updatedSteps = (prev.steps || []).map(st => {
        let desc = st.description || '';
        if (category === 'onions') desc = desc.replace(/onion/gi, sub.name).replace(/shallot/gi, sub.name);
        if (category === 'garlic') desc = desc.replace(/garlic/gi, sub.name);
        if (category === 'tomatoes') desc = desc.replace(/tomato/gi, sub.name);
        if (category === 'heavy_cream') desc = desc.replace(/heavy cream/gi, sub.name).replace(/cream/gi, sub.name);
        if (category === 'cheese') desc = desc.replace(/parmesan/gi, sub.name).replace(/cheese/gi, sub.name);
        if (category === 'olive_oil') desc = desc.replace(/extra virgin olive oil/gi, sub.name).replace(/olive oil/gi, sub.name);
        if (category === 'pasta') desc = desc.replace(/penne/gi, sub.name).replace(/pasta/gi, sub.name);
        if (category === 'fresh_basil') desc = desc.replace(/fresh basil/gi, sub.name).replace(/basil/gi, sub.name);
        if (category === 'proteins') desc = desc.replace(/chicken/gi, sub.name).replace(/salmon/gi, sub.name).replace(/shrimp/gi, sub.name);
        return { ...st, description: desc };
      });

      return {
        ...prev,
        title: `${baseTitle} (${sub.name})`,
        subtitle: `Customized with ${sub.name} • ${sub.match} • ${sub.badge}`,
        badge: `${sub.badge} Formula`,
        steps: updatedSteps
      };
    });
  };

  // Live Real-Time Substitutes Revert Handler
  const handleRemoveSubstitute = (category) => {
    sounds.playSubstituteRevert();
    const updatedSubs = { ...activeSubstitutes };
    delete updatedSubs[category];
    setActiveSubstitutes(updatedSubs);

    const baseRecipe = getDynamicRecipeByIngredients(selectedIds, mealSetup);
    let nextTitle = baseRecipe.title;
    let nextSubtitle = baseRecipe.subtitle;
    let nextBadge = baseRecipe.badge || 'RecipeDB Real-Time';
    let nextSteps = baseRecipe.steps || [];

    if (Object.keys(updatedSubs).length > 0) {
      Object.entries(updatedSubs).forEach(([cat, sub]) => {
        nextTitle = `${baseRecipe.title} (${sub.name})`;
        nextSubtitle = `Customized with ${sub.name} • ${sub.match} • ${sub.badge}`;
        nextBadge = `${sub.badge} Formula`;
        nextSteps = nextSteps.map(st => {
          let desc = st.description || '';
          if (cat === 'onions') desc = desc.replace(/onion/gi, sub.name).replace(/shallot/gi, sub.name);
          if (cat === 'garlic') desc = desc.replace(/garlic/gi, sub.name);
          if (cat === 'tomatoes') desc = desc.replace(/tomato/gi, sub.name);
          if (cat === 'heavy_cream') desc = desc.replace(/heavy cream/gi, sub.name).replace(/cream/gi, sub.name);
          if (cat === 'cheese') desc = desc.replace(/parmesan/gi, sub.name).replace(/cheese/gi, sub.name);
          if (cat === 'olive_oil') desc = desc.replace(/extra virgin olive oil/gi, sub.name).replace(/olive oil/gi, sub.name);
          if (cat === 'pasta') desc = desc.replace(/penne/gi, sub.name).replace(/pasta/gi, sub.name);
          if (cat === 'fresh_basil') desc = desc.replace(/fresh basil/gi, sub.name).replace(/basil/gi, sub.name);
          if (cat === 'proteins') desc = desc.replace(/chicken/gi, sub.name).replace(/salmon/gi, sub.name).replace(/shrimp/gi, sub.name);
          return { ...st, description: desc };
        });
      });
    }

    setRecipe({
      ...baseRecipe,
      title: nextTitle,
      subtitle: nextSubtitle,
      badge: nextBadge,
      steps: nextSteps
    });
  };

  // Toggle ingredient selection: Crisp marimba sound, no unnecessary confetti!
  const toggleIngredient = (id) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      sounds.playIngredientDeselect();
    } else {
      sounds.playIngredientSelect();
    }
    let nextIds;
    if (isSelected) {
      nextIds = selectedIds.filter(item => item !== id);
    } else {
      nextIds = [...selectedIds, id];
    }
    setSelectedIds(nextIds);
    updateRecipeFromIngredients(nextIds);

    // Background asynchronous RecipeDB query
    triggerBackgroundRecipeDBSearch(nextIds);
  };

  // Trigger background search on real RecipeDB API without blocking UI
  const triggerBackgroundRecipeDBSearch = async (activeIds) => {
    const activeNames = ALL_PANTRY_INGREDIENTS
      .filter(i => activeIds.includes(i.id))
      .map(i => i.name.toLowerCase());

    const activeExclusions = [...allergies.map(a => a.toLowerCase())];
    if (dietary.vegan) activeExclusions.push('meat', 'beef', 'chicken', 'dairy');
    else if (dietary.vegetarian) activeExclusions.push('meat', 'beef', 'chicken', 'fish');
    if (dietary.glutenFree) activeExclusions.push('wheat', 'flour', 'bread', 'gluten');

    setIsSearchingAPI(true);
    try {
      const res = await searchRecipesByIngredients({
        includeIngredients: activeNames,
        excludeIngredients: activeExclusions,
        limit: 15,
        mealSetup: mealSetup
      });
      setIsSearchingAPI(false);
      if (res && res.recipes && res.recipes.length > 0 && !res.fromLocal) {
        setApiRecipesList(res.recipes);
      }
    } catch {
      setIsSearchingAPI(false);
    }
  };

  // Handle external search query from Header
  useEffect(() => {
    if (externalQuery && externalQuery.trim()) {
      const runSearch = async () => {
        setIsSearchingAPI(true);
        const res = await searchRecipesByTitle(externalQuery);
        setIsSearchingAPI(false);
        if (res && res.recipes && res.recipes.length > 0) {
          sounds.playChime();
          setApiRecipesList(res.recipes);
          setRecipe(res.recipes[0]);
        }
      };
      runSearch();
    }
  }, [externalQuery]);



  // Missing ingredients detection
  const selectedPantryNames = ALL_PANTRY_INGREDIENTS
    .filter(i => selectedIds.includes(i.id))
    .map(i => i.name.toLowerCase());
  
  const recipeRequirements = recipe?.requiredIngredients || ['garlic', 'tomatoes', 'olive_oil', 'pasta', 'basil'];
  const missingIngredientItems = recipeRequirements
    .filter(req => {
      const rLower = req.toLowerCase().replace('_', ' ');
      return !selectedPantryNames.some(name => name.includes(rLower) || rLower.includes(name));
    })
    .map(req => {
      const matchInPantry = ALL_PANTRY_INGREDIENTS.find(p => p.id === req || p.name.toLowerCase().includes(req.replace('_', ' ')));
      return {
        id: req,
        name: matchInPantry ? matchInPantry.name : req.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        image: matchInPantry ? matchInPantry.image : '/images/ingredients/garlic.jpg',
        substitute: 'Pantry Alternative'
      };
    });

  // Calculate dynamic geometric constellation layout with DUAL-ORBIT HARMONY
  // Calculate dynamic geometric constellation layout with DUAL-ORBIT HARMONY
  // Ensures perfect breathing room and zero overlapping, even with 18+ active ingredients!
  const isDenseBoard = selectedIds.length > 7;

  const activeNodes = useMemo(() => {
    const selectedItems = ALL_PANTRY_INGREDIENTS.filter(item => selectedIds.includes(item.id));
    const count = selectedItems.length;
    if (count === 0) return [];

    if (count <= 7) {
      // Balanced single circular constellation with ample breathing room
      return selectedItems.map((item, idx) => {
        const angle = (idx / count) * 2 * Math.PI - Math.PI / 2;
        const x = Math.round(50 + 36 * Math.cos(angle));
        const y = Math.round(50 + 33 * Math.sin(angle));
        return {
          ...item,
          x: Math.max(12, Math.min(88, x)),
          y: Math.max(14, Math.min(86, y)),
          isInner: false,
          selected: true
        };
      });
    }

    // Concentric dual harmonic orbits:
    // Outer Galaxy (even indices): Rx=43, Ry=38
    // Inner Constellation (odd indices): Rx=27, Ry=23
    // Angle offset guarantees radial interleaving so labels and bubbles never collide!
    return selectedItems.map((item, idx) => {
      const isInner = idx % 2 === 1;
      const radiusX = isInner ? 27 : 43;
      const radiusY = isInner ? 23 : 38;

      const angle = (idx / count) * 2 * Math.PI - Math.PI / 2;
      const x = Math.round(50 + radiusX * Math.cos(angle));
      const y = Math.round(50 + radiusY * Math.sin(angle));

      return {
        ...item,
        x: Math.max(8, Math.min(92, x)),
        y: Math.max(10, Math.min(90, y)),
        isInner,
        selected: true
      };
    });
  }, [selectedIds]);

  // Generate constellation connection lines using FlavorDB Culinary Synergy Network
  // NEVER creates tiny adjacent segments; draws long, graceful, glowing cosmic bridges!
  const constellationEdges = useMemo(() => {
    const edges = [];
    if (activeNodes.length < 2) return edges;

    const count = activeNodes.length;
    const addedPairs = new Set();
    const nodeDegree = {};
    activeNodes.forEach(n => { nodeDegree[n.id] = 0; });

    const addEdge = (n1, n2, isSynergy = true) => {
      if (!n1 || !n2 || n1.id === n2.id) return;
      const pairKey = [n1.id, n2.id].sort().join('--');
      if (addedPairs.has(pairKey)) return;
      addedPairs.add(pairKey);
      nodeDegree[n1.id] = (nodeDegree[n1.id] || 0) + 1;
      nodeDegree[n2.id] = (nodeDegree[n2.id] || 0) + 1;

      edges.push({
        key: pairKey,
        x1: n1.x,
        y1: n1.y,
        x2: n2.x,
        y2: n2.y,
        isSynergy,
        isHovered: hoveredNode === n1.id || hoveredNode === n2.id
      });
    };

    if (count <= 6) {
      // For small sets, classic celestial ring is clean & spacious
      for (let i = 0; i < count; i++) {
        const nextIdx = (i + 1) % count;
        addEdge(activeNodes[i], activeNodes[nextIdx]);
      }
    } else {
      // 1. Primary Culinary FlavorDB Pairing Links
      // Connects real culinary partners across the board (e.g. Tomatoes with Basil, Garlic with Mushrooms)
      activeNodes.forEach(node => {
        const pairings = FLAVOR_PAIRING_GRAPH[node.id] || [];
        pairings.forEach(partnerId => {
          if (nodeDegree[node.id] >= 2) return;
          const partnerNode = activeNodes.find(n => n.id === partnerId);
          if (partnerNode && (nodeDegree[partnerNode.id] || 0) < 2) {
            addEdge(node, partnerNode, true);
          }
        });
      });

      // 2. Wide Sacred Star-Burst Chords: If any node has fewer than 2 connections,
      // connect across the constellation with a wide chord skip (step = floor(count / 3))
      // Guarantees all lines are long (150px - 350px) and majestic, NEVER tiny adjacent nubs!
      const step = Math.max(3, Math.floor(count / 3));
      for (let i = 0; i < count; i++) {
        if (nodeDegree[activeNodes[i].id] < 2) {
          const targetIdx = (i + step) % count;
          addEdge(activeNodes[i], activeNodes[targetIdx], false);
        }
      }

      // 3. Connect any isolated nodes to a complement across the canvas
      for (let i = 0; i < count; i++) {
        if (nodeDegree[activeNodes[i].id] < 1) {
          const complementIdx = (i + Math.floor(count / 2)) % count;
          addEdge(activeNodes[i], activeNodes[complementIdx], false);
        }
      }
    }

    return edges;
  }, [activeNodes, hoveredNode]);

  return (
    <div className="mode1-single-screen-dashboard">
      {/* ========================================================
          COLUMN 1: PANTRY DOCK & INGREDIENT SELECTOR (All ingredients clearly visible!)
          ======================================================== */}
      <aside className="pantry-dock-column glass-panel-electric">
        {/* Dock Header */}
        <div className="pantry-dock-header">
          <div className="dock-title-row">
            <div className="dock-badge-icon">
              <ChefHat size={16} className="sparkle-gold" />
            </div>
            <div>
              <h3>My Kitchen Pantry</h3>
              <p>Click any ingredient to add into the constellation</p>
            </div>
          </div>
          <span className="dock-active-count">{selectedIds.length} on board</span>
        </div>

        {/* Prominent Diet Choices Bar */}
        <div className="dock-diet-prominent-section">
          <div className="dock-section-title-row">
            <span className="dock-section-label">Diet Preferences</span>
            <span className="dock-diet-active-pill">
              {DIET_CHOICES.find(d => d.id === activeDiet)?.label || 'All Dishes'}
            </span>
          </div>
          <div className="dock-diet-grid">
            {DIET_CHOICES.map(d => (
              <button
                key={d.id}
                type="button"
                className={`diet-select-card ${activeDiet === d.id ? 'active' : ''}`}
                onClick={() => handleDietSelect(d.id)}
              >
                <span className="diet-card-icon">{d.icon}</span>
                <span className="diet-card-name">{d.label}</span>
                {activeDiet === d.id && <Check size={11} className="diet-check-glow" />}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Category Tabs */}
        <div className="dock-search-box">
          <Search size={13} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search all 36+ ingredients..."
            value={pantrySearch}
            onChange={(e) => setPantrySearch(e.target.value)}
          />
          {pantrySearch && (
            <button className="clear-search-btn" onClick={() => setPantrySearch('')}>
              <X size={12} />
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="dock-category-tabs">
          {['All', 'Produce', 'Aromatics', 'Grains', 'Dairy', 'Herbs', 'Proteins', 'Citrus'].map(tab => (
            <button
              key={tab}
              className={`dock-cat-tab ${activeCategoryTab === tab ? 'active' : ''}`}
              onClick={() => { sounds.playPop(420); setActiveCategoryTab(tab); }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Extensive Ingredients Grid with Instant Hover Pop-up */}
        <div className="dock-ingredients-scroll-grid">
          {filteredPantry.map(item => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                className={`dock-ingredient-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleIngredient(item.id)}
                onMouseEnter={() => {
                  setHoveredPantryItem(item);
                  sounds.playHoverTick();
                }}
                onMouseLeave={() => setHoveredPantryItem(null)}
                title={isSelected ? `${item.name} is on the board (Click to remove)` : `Click to add ${item.name} to the central chart`}
              >
                <div className="chip-img-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="chip-photo"
                    onError={(e) => { e.currentTarget.src = item.fallback || '/images/ingredients/garlic.jpg'; }}
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="chip-checked-glow">
                      <Check size={11} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span className="chip-name-text">{item.name}</span>
                <span className="chip-add-indicator">{isSelected ? '✓' : '+'}</span>
              </button>
            );
          })}
        </div>

        {/* Floating Instant Hover Card - ONLY visible while actively hovering on an ingredient */}
        {hoveredPantryItem && (
          <div className="ingredient-hover-floating-card">
            <div className="hover-card-header">
              <div className="hover-card-img-shell">
                <img 
                  src={hoveredPantryItem.image} 
                  alt={hoveredPantryItem.name} 
                  className="hover-card-large-img"
                  onError={(e) => { e.currentTarget.src = hoveredPantryItem.fallback || '/images/ingredients/garlic.jpg'; }}
                />
              </div>
              <div className="hover-card-meta">
                <span className="hover-card-category">{hoveredPantryItem.category} • Fresh Selection</span>
                <h4 className="hover-card-name">{hoveredPantryItem.name}</h4>
                <div className="hover-card-status-pill">
                  {selectedIds.includes(hoveredPantryItem.id) ? (
                    <span className="status-added">✓ On Constellation Board</span>
                  ) : (
                    <span className="status-available">+ Click to Add to Board</span>
                  )}
                </div>
              </div>
            </div>
            {INGREDIENT_QUALITY_SPECS[hoveredPantryItem.id] && (
              <div className="hover-card-specs">
                <div className="spec-line">
                  <span className="spec-label">Quality:</span>
                  <span className="spec-val">{INGREDIENT_QUALITY_SPECS[hoveredPantryItem.id].quality}</span>
                </div>
                <div className="spec-line">
                  <span className="spec-label">Portion:</span>
                  <span className="spec-val">{INGREDIENT_QUALITY_SPECS[hoveredPantryItem.id].quantity}</span>
                </div>
                <p className="spec-role">{INGREDIENT_QUALITY_SPECS[hoveredPantryItem.id].culinaryRole}</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Reset & Select All */}
        <div className="dock-footer-actions">
          <button 
            className="dock-action-btn secondary"
            onClick={() => {
              sounds.playPop(300);
              setSelectedIds([]);
              updateRecipeFromIngredients([]);
            }}
          >
            <RotateCcw size={12} /> Clear Board
          </button>
          <button 
            className="dock-action-btn primary"
            onClick={() => {
              sounds.playChime();
              const starterSet = ['tomatoes', 'garlic', 'pasta', 'olive_oil', 'heavy_cream', 'parmesan', 'basil'];
              setSelectedIds(starterSet);
              updateRecipeFromIngredients(starterSet);
            }}
          >
            <Sparkles size={12} /> Load Classic 7
          </button>
        </div>
      </aside>

      {/* ========================================================
          COLUMN 2: DYNAMIC CONSTELLATION CHART & REAL-TIME GRAPH
          ======================================================== */}
      <section className="constellation-chart-column">
        {/* Floating Top Status & Action Pills Bar */}
        <div className="chart-top-floating-bar">
          <div className="synergy-status-tag">
            <span className="synergy-pulse-dot"></span>
            <span className="synergy-title"><strong>{selectedIds.length} Ingredients Connected</strong></span>
          </div>

          <div className="chart-quick-actions">
            <button 
              className="chart-action-pill dishes"
              onClick={() => { sounds.playPop(480); setIsDishesModalOpen(true); }}
              title="Browse RecipeDB database dishes"
            >
              <UtensilsCrossed size={12} />
              <span>Dishes ({apiRecipesList.length})</span>
            </button>

            <button 
              className="chart-action-pill sub"
              onClick={() => { sounds.playPop(520); setIsSubstitutesModalOpen(true); }}
              title="View genuine culinary substitutes"
            >
              <Sparkles size={12} />
              <span>Substitutes {Object.keys(activeSubstitutes).length > 0 ? `(${Object.keys(activeSubstitutes).length})` : ''}</span>
            </button>

            <button 
              className={`chart-action-pill missing ${missingIngredientItems.length > 0 ? 'alert' : ''}`}
              onClick={() => { sounds.playPop(440); setIsMissingModalOpen(true); }}
              title="View missing recipe ingredients"
            >
              <AlertCircle size={12} />
              <span>Missing ({missingIngredientItems.length})</span>
            </button>
          </div>
        </div>

        {/* Constellation Canvas Slate Board */}
        <div className="constellation-canvas-viewport">
          <div className="slate-board-container">
            <div className="slate-ambient-vignette"></div>

            {/* Hand-drawn whimsical culinary chalk annotations */}
            <div className="handwritten-note note-top-left">
              <span>Pick your ingredients ⤴</span>
            </div>
            <div className="handwritten-note note-top-right">
              <span>Food connects people ♡</span>
            </div>
            <div className="handwritten-note note-bottom-right">
              <span>Same ingredients.<br />Endless possibilities. ✎</span>
            </div>

            {/* Center Dynamic Formula Badge - Catchy Culinary Holographic Hub */}
            <div 
              className={`constellation-center-hub clickable-center-dish dynamic-hub-glow ${isRecalculating ? 'recalculating-flash' : ''}`}
              onClick={() => {
                sounds.playChime();
                setIsDishesModalOpen(true);
              }}
              title="Click to view all matching recipes from your ingredients"
            >
              {/* Spinning Multi-color Synergy Aura */}
              <div className="hub-synergy-spinning-ring"></div>
              <div className="hub-core-pulse"></div>

              {/* Real Dish Photo Backdrop */}
              <div className="hub-dish-photo-bg">
                <img 
                  key={recipe?.id || recipe?.title}
                  src={recipe?.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
                  alt={recipe?.title} 
                  className="hub-dish-img-preview"
                  onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
                />
                <div className="hub-photo-gradient-overlay"></div>
              </div>

              <div className="hub-content">
                <div className={`hub-synergy-badge ${isRecalculating ? 'pulse-recalc' : ''}`}>
                  <Sparkles size={11} className="sparkle-gold" />
                  <span>
                    {isRecalculating 
                      ? '⚡ Updating Formulas...' 
                      : `✨ ${apiRecipesList.length} Recipes Matched`}
                  </span>
                </div>

                {/* Multi-Recipe Cycle Selector Bar inside Center Circle */}
                {apiRecipesList && apiRecipesList.length > 1 && (
                  <div className="hub-dish-cycle-bar" onClick={(e) => e.stopPropagation()}>
                    <button 
                      type="button" 
                      className="hub-nav-arrow" 
                      onClick={handleCyclePrev}
                      title="Previous suggested recipe"
                    >
                      <ChevronLeft size={11} />
                    </button>
                    <span 
                      className="hub-recipe-counter"
                      onClick={() => setIsDishesModalOpen(true)}
                      title="Click to view all recipe suggestions"
                    >
                      Formula {(recipeCycleIndex % apiRecipesList.length) + 1} / {apiRecipesList.length}
                    </span>
                    <button 
                      type="button" 
                      className="hub-nav-arrow" 
                      onClick={handleCycleNext}
                      title="Next suggested recipe"
                    >
                      <ChevronRight size={11} />
                    </button>
                  </div>
                )}

                <span className="hub-dish-name">{recipe?.title || 'Formulating Recipe...'}</span>
                <span className="hub-sub-text">{recipe?.subtitle?.split('•')[0] || 'RecipeDB Verified'}</span>
                
                <div className="hub-action-buttons-group">
                  <div 
                    className="hub-interactive-cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playChime();
                      setIsDishesModalOpen(true);
                    }}
                    title="Click inner circle to view recommended dishes"
                  >
                    <span>✨ View Recommended Dishes ({apiRecipesList.length}) &rarr;</span>
                  </div>
                  <button
                    type="button"
                    className="hub-see-all-formulas-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playFlowChartOpen();
                      setFlowChartRecipe(recipe);
                      setIsFlowChartOpen(true);
                    }}
                    title={`View dynamic cooking flowchart for ${recipe?.title}`}
                  >
                    <Workflow size={9} />
                    <span>View Flowchart &rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SVG Dynamic Network Lines connecting active nodes */}
            <svg className="constellation-svg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <filter id="neonPulseGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#168aad" />
                  <stop offset="50%" stopColor="#7acbfa" />
                  <stop offset="100%" stopColor="#ffc857" />
                </linearGradient>
              </defs>

              {constellationEdges.map(edge => (
                <g key={edge.key}>
                  {/* Glowing background line */}
                  <line 
                    x1={`${edge.x1}%`} 
                    y1={`${edge.y1}%`} 
                    x2={`${edge.x2}%`} 
                    y2={`${edge.y2}%`}
                    stroke="url(#neonGradient)"
                    strokeWidth={edge.isHovered ? '2.4' : '1.8'}
                    strokeLinecap="round"
                    filter="url(#neonPulseGlow)"
                    opacity={edge.isHovered ? '1' : '0.8'}
                  />
                  {/* Animated electric dash stream */}
                  <line 
                    x1={`${edge.x1}%`} 
                    y1={`${edge.y1}%`} 
                    x2={`${edge.x2}%`} 
                    y2={`${edge.y2}%`}
                    className="animated-flow-dash"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </g>
              ))}

              {/* Central hub luminous rays - cleanly connects 4 primary anchors without crowding the hub */}
              {activeNodes
                .filter((_, i) => activeNodes.length <= 6 || i % Math.max(2, Math.floor(activeNodes.length / 4)) === 0)
                .map(node => (
                  <line 
                    key={`hub--${node.id}`}
                    x1="50%" 
                    y1="50%" 
                    x2={`${node.x}%`} 
                    y2={`${node.y}%`}
                    stroke="rgba(122, 203, 250, 0.35)"
                    strokeWidth="1.2"
                    strokeDasharray="3 6"
                  />
                ))}
            </svg>

            {/* Active Interactive Ingredient Nodes */}
            <div className={`constellation-nodes-container ${isDenseBoard ? 'dense-board' : ''}`}>
              {activeNodes.map(node => (
                <div
                  key={node.id}
                  className={`constellation-node-bubble active-node ${node.isInner ? 'inner-orbit-node' : 'outer-orbit-node'} ${hoveredNode === node.id ? 'hovered' : ''}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => toggleIngredient(node.id)}
                  title={`Click to remove ${node.name}`}
                >
                  <div className="node-photo-shell">
                    <img 
                      src={node.image} 
                      alt={node.name} 
                      className="node-img"
                      onError={(e) => { e.currentTarget.src = node.fallback || '/images/ingredients/garlic.jpg'; }}
                    />
                    <div className="node-neon-ring"></div>
                  </div>

                  <div className="node-tag-banner">
                    <span className="node-check-icon">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="node-title-string">{node.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          COLUMN 3: LIVE RECIPE SPOTLIGHT & ZERO-SCROLL STEP NAVIGATOR
          ======================================================== */}
      <aside className="recipe-spotlight-column glass-panel-electric">
        {/* Editable Meal Setup Summary Pill near recipe results */}
        <MealSetupSummaryBar 
          mealSetup={mealSetup} 
          onEditSetup={onEditSetup} 
        />

        {/* Top Dish Banner - Image of the recipe and its name */}
        <div 
          className="spotlight-hero-card clickable-flow-trigger"
          onClick={() => {
            sounds.playChime();
            setIsFlowChartOpen(true);
          }}
          title="Click to view interactive RecipeDB cooking diagram"
        >
          <div className="spotlight-image-box">
            <img 
              key={recipe?.id || recipe?.title}
              src={recipe?.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
              alt={recipe?.title || 'Culinary Dish'} 
              className="spotlight-dish-img dynamic-swap"
              onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
            />
            <div className="spotlight-dish-badge">
              <Sparkles size={12} className="sparkle-gold" />
              <span>{recipe?.badge || 'RecipeDB'}</span>
            </div>
            <div className="dish-diagram-pill">
              <Workflow size={11} />
              <span>Click for Interactive Diagram</span>
            </div>
            <button 
              className={`spotlight-fav-btn ${isSaved ? 'saved' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                sounds.playPop(600);
                setIsSaved(!isSaved);
                if (onSaveRecipe && recipe) onSaveRecipe(recipe);
              }}
              title="Save to favorites"
            >
              <Heart size={14} fill={isSaved ? '#ff3366' : 'none'} color={isSaved ? '#ff3366' : '#ffffff'} />
            </button>
          </div>

          <div className="spotlight-meta-block">
            {/* Live Active Substitutes Indicator Pill with Revert button */}
            {Object.keys(activeSubstitutes).length > 0 && (
              <div className="active-substitutes-live-dock">
                {Object.entries(activeSubstitutes).map(([cat, sub]) => (
                  <div key={cat} className="active-sub-live-indicator">
                    <Sparkles size={11} className="sparkle-gold" />
                    <span>Substituted with <strong>{sub.name}</strong></span>
                    <span className="sub-live-match">{sub.match}</span>
                    <button 
                      type="button" 
                      className="sub-revert-mini-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSubstitute(cat);
                      }}
                      title="Revert back to original ingredient"
                    >
                      <RotateCcw size={10} /> Revert
                    </button>
                  </div>
                ))}
              </div>
            )}

            <h2 className="spotlight-title">{recipe?.title || 'Creamy Garlic Vegetable Pasta'}</h2>
            <p className="spotlight-subtext">{recipe?.subtitle || 'Foodoscope Computational RecipeDB'}</p>

            <div className="spotlight-dynamic-flavor-strip">
              <span className="flavor-chip"><Sparkles size={10} className="sparkle-gold" /> {recipe?.badge || 'RecipeDB'}</span>
              <span className="flavor-chip warm-tag">🔥 Sauté Infusion</span>
              <span className="flavor-chip green-tag">🌿 Fresh Herbal</span>
            </div>

            <div className="spotlight-pills-row">
              <span className="pill"><Users size={11} /> {mealSetup?.servings || peopleCount} {((mealSetup?.servings || peopleCount) === 1) ? 'Person' : 'People'}</span>
              <span className="pill"><Clock size={11} /> {recipe?.time || '25m'}</span>
              <span className="pill"><BarChart2 size={11} /> {recipe?.difficulty || 'Medium'}</span>
            </div>

            {/* Chef's Memory & Personal Sensory Feedback Note */}
            {activeDishFeedback && (
              <div 
                className="dish-feedback-memory-box animate-fade-in"
                onClick={() => {
                  sounds.playFeedbackOpen();
                  if (onOpenFeedback) onOpenFeedback();
                }}
                title="Tap to review or edit your personal palate note for this dish"
              >
                <div className="memory-box-header">
                  <div className="memory-badge-group">
                    <Sparkles size={11} className="sparkle-gold" />
                    <span className="memory-badge">Chef's Memory Note</span>
                  </div>
                  <span className="memory-edit-hint">Tap to edit ✎</span>
                </div>
                <p className="memory-note-text">
                  "{activeDishFeedback.note}"
                </p>
                <div className="memory-recommendation-pill">
                  💡 <strong>Adaptive Suggestion:</strong> {activeDishFeedback.recommendation}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nutritional Macro Bars */}
        <div className="spotlight-nutrition-bar">
          <div className="macro-meter-item">
            <span className="macro-value">{recipe?.nutrition?.calories || '450 kcal'}</span>
            <span className="macro-label">Calories</span>
            <div className="macro-track"><div className="macro-fill cal" style={{ width: '70%' }}></div></div>
          </div>
          <div className="macro-meter-item">
            <span className="macro-value">{recipe?.nutrition?.protein || '18g'}</span>
            <span className="macro-label">Protein</span>
            <div className="macro-track"><div className="macro-fill pro" style={{ width: '55%' }}></div></div>
          </div>
          <div className="macro-meter-item">
            <span className="macro-value">{recipe?.nutrition?.carbs || '62g'}</span>
            <span className="macro-label">Carbs</span>
            <div className="macro-track"><div className="macro-fill carb" style={{ width: '65%' }}></div></div>
          </div>
          <div className="macro-meter-item">
            <span className="macro-value">{recipe?.nutrition?.fat || '16g'}</span>
            <span className="macro-label">Fat</span>
            <div className="macro-track"><div className="macro-fill fat" style={{ width: '40%' }}></div></div>
          </div>
        </div>

        {/* INGREDIENTS SUBSTITUTES - CLICKABLE TRIGGER OPENING DYNAMIC POPUP ONLY */}
        <div className="spotlight-ingredients-substitutes-panel">
          <button 
            type="button"
            className="panel-intro-block clickable-substitutes-trigger"
            onClick={() => {
              sounds.playSubstituteOpen();
              setIsSubstitutesModalOpen(true);
            }}
            title="Click to view all ingredients & smart substitutes in a modal"
          >
            <div className="intro-title-line">
              <ChefHat size={15} className="sparkle-gold" />
              <h4>INGREDIENTS SUBSTITUTES</h4>
              <span className="view-flow-badge sub-modal-badge">
                <Sparkles size={11} className="sparkle-gold" />
                <span>View Substitutes ({recipe?.requiredIngredients?.length || 0}) ↗</span>
              </span>
            </div>
          </button>

          {/* Action Button: Open Recipe Flow */}
          <div className="spotlight-actions-dock">
            <button 
              type="button"
              className="start-cook-along-btn glow-cta"
              onClick={() => {
                sounds.playFlowChartOpen();
                setFlowChartRecipe(recipe);
                setIsFlowChartOpen(true);
              }}
            >
              <Workflow size={16} />
              <span>Recipe Flow &rarr;</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================
          POPUPS & MODALS (Everything viewable with zero scroll!)
          ======================================================== */}
      {/* 1. RecipeDB Matched Dishes Modal */}
      <DishesPickerModal
        isOpen={isDishesModalOpen}
        onClose={() => setIsDishesModalOpen(false)}
        recipes={apiRecipesList}
        activeRecipeId={recipe?.id}
        onSelectRecipe={(selectedDish) => {
          setRecipe(selectedDish);
          const foundIdx = apiRecipesList.findIndex(r => r.id === selectedDish.id);
          if (foundIdx !== -1) setRecipeCycleIndex(foundIdx);
        }}
        onOpenFlowChart={(dish) => {
          setFlowChartRecipe(dish);
          setIsFlowChartOpen(true);
        }}
      />

      {/* 2. Genuine Database Substitutes Modal - Dynamic ingredients list inside modal only */}
      <SubstitutesModal
        isOpen={isSubstitutesModalOpen}
        onClose={() => setIsSubstitutesModalOpen(false)}
        recipe={recipe}
        selectedIds={selectedIds}
        activeSubstitutes={activeSubstitutes}
        onApplySubstitute={handleApplySubstitute}
        onRemoveSubstitute={handleRemoveSubstitute}
      />

      {/* 3. Missing Ingredients Modal with 1-click Add to Cart */}
      <MissingIngredientsModal
        isOpen={isMissingModalOpen}
        onClose={() => setIsMissingModalOpen(false)}
        missingItems={missingIngredientItems}
        onAddToCart={(items) => {
          if (Array.isArray(items)) {
            items.forEach(it => onAddToCart && onAddToCart(it.name));
          }
        }}
        onOpenSubstitutes={() => setIsSubstitutesModalOpen(true)}
      />

      {/* 4. Interactive Visual Process Flow Chart Modal */}
      <FlowChartModal
        isOpen={isFlowChartOpen}
        onClose={() => {
          setIsFlowChartOpen(false);
          setFlowChartRecipe(null);
        }}
        recipe={flowChartRecipe || recipe}
        selectedIds={selectedIds}
        feedback={activeDishFeedback}
        onOpenCookAlong={() => {
          setIsFlowChartOpen(false);
          if (onOpenCookAlong) onOpenCookAlong(flowChartRecipe || recipe);
        }}
      />
    </div>
  );
}

export default Mode1IngredientMap;
