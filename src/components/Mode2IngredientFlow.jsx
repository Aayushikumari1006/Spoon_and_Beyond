import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  X, 
  Info, 
  Sparkles, 
  Flame, 
  Layers, 
  Heart, 
  Workflow, 
  UtensilsCrossed, 
  AlertCircle, 
  Play, 
  Clock, 
  Users, 
  BarChart2, 
  Search,
  CheckCircle2,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  INGREDIENTS_MODE_2, 
  RECIPE_FLOW_STEPS_MODE_2, 
  ALL_PANTRY_INGREDIENTS,
  getDynamicRecipeByIngredients, 
  getAllMatchingRecipesByIngredients,
  DYNAMIC_RECIPEDB_CATALOG 
} from '../data/recipes';
import { sounds } from '../utils/audio';
import { searchRecipesByIngredients, searchRecipesByTitle } from '../services/recipedb';
import FlowChartModal from './FlowChartModal';
import DishesPickerModal from './DishesPickerModal';
import SubstitutesModal from './SubstitutesModal';
import MissingIngredientsModal from './MissingIngredientsModal';
import { MealSetupSummaryBar } from './MealSetupSummaryBar';

export function Mode2IngredientFlow({ 
  onAddToCart, 
  onOpenCookAlong, 
  externalQuery, 
  onSaveRecipe, 
  activeRole, 
  timeLimit,
  mealSetup,
  onEditSetup,
  onSaveMealSetup
}) {
  // Pinned items on board state (initially standard items, dynamic additions/removals supported)
  const [pinnedItems, setPinnedItems] = useState(INGREDIENTS_MODE_2);
  const [isSaved, setIsSaved] = useState(false);
  const [isFlowChartOpen, setIsFlowChartOpen] = useState(false);
  const [showDishesModal, setShowDishesModal] = useState(false);
  const [showSubstitutesModal, setShowSubstitutesModal] = useState(false);
  const [showMissingModal, setShowMissingModal] = useState(false);
  const [activeSubstitutes, setActiveSubstitutes] = useState({});
  
  // Recipe Step Flow state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState(RECIPE_FLOW_STEPS_MODE_2);

  // RecipeDB Live Search & Active Recipe State
  const [isSearchingAPI, setIsSearchingAPI] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiRecipesList, setApiRecipesList] = useState(DYNAMIC_RECIPEDB_CATALOG);
  const [activeApiRecipe, setActiveApiRecipe] = useState(DYNAMIC_RECIPEDB_CATALOG[0]);
  const [isMissingKeyAlert, setIsMissingKeyAlert] = useState(false);

  // Floating Details card state
  const [showDetailsCard, setShowDetailsCard] = useState(true);
  const [servesCount, setServesCount] = useState(2);
  const [timeSelection, setTimeSelection] = useState(() => timeLimit ? `${timeLimit} min` : '30 min');
  const [allergies, setAllergies] = useState({
    nuts: false,
    dairy: 'Medium',
    gluten: true
  });

  // Mode 2 Dynamic Pantry Dock Filtering
  const [dockCategory, setDockCategory] = useState('All');
  const [dockSearch, setDockSearch] = useState('');
  const [isDockOpen, setIsDockOpen] = useState(true);

  // Pin node element refs for SVG flow pipe calculation
  const containerRef = useRef(null);
  const pinRefs = useRef({});
  const [threadPathD, setThreadPathD] = useState('');
  const [arrowCoords, setArrowCoords] = useState(null);
  const [dashedPathD, setDashedPathD] = useState('');
  const [activeTickedNodes, setActiveTickedNodes] = useState([]);

  // Missing items derived dynamically
  const missingItems = useMemo(() => {
    return pinnedItems.filter(i => !i.defaultChecked);
  }, [pinnedItems]);

  // Filter pantry dock items for Mode 2
  const filteredDockItems = useMemo(() => {
    return ALL_PANTRY_INGREDIENTS.filter(item => {
      const matchCat = dockCategory === 'All' || item.category.toLowerCase().includes(dockCategory.toLowerCase());
      const matchSearch = item.name.toLowerCase().includes(dockSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [dockCategory, dockSearch]);

  // Recalculate dynamic recipe from active pinned items
  const updateRecipeFromPinned = (itemsList) => {
    const activeIds = itemsList
      .filter(i => i.defaultChecked)
      .map(i => i.id.replace('-', '_').replace('roma_tomatoes', 'tomatoes').replace('olive_oil', 'olive_oil'));

    const matched = getDynamicRecipeByIngredients(activeIds, mealSetup);
    const allMatches = getAllMatchingRecipesByIngredients(activeIds, mealSetup);
    if (allMatches && allMatches.length > 0) {
      setApiRecipesList(allMatches);
    }

    if (matched) {
      setActiveApiRecipe(matched);
      if (Array.isArray(matched.steps) && matched.steps.length > 0) {
        setSteps(matched.steps.map((st, i) => ({
          id: st.step || i + 1,
          title: st.title || `Phase ${i + 1}`,
          status: i === 0 ? 'NOW' : 'Upcoming',
          desc: st.description || st.desc || '',
          duration: st.time || '5 mins',
          image: matched.image || `/images/steps/${Math.min(i + 1, 6)}_boil_pasta.jpg`
        })));
        setCurrentStepIndex(0);
      }
    }
  };

  // Re-run dynamic matching when mealSetup changes
  useEffect(() => {
    if (mealSetup) {
      updateRecipeFromPinned(pinnedItems);
    }
  }, [mealSetup]);

  // Toggle ingredient checked state on the board
  const handleToggleIngredient = (id) => {
    sounds.playPin();
    const updated = pinnedItems.map(item => {
      if (item.id === id) {
        return { ...item, defaultChecked: !item.defaultChecked };
      }
      return item;
    });
    setPinnedItems(updated);
    updateRecipeFromPinned(updated);
  };

  // Dynamically Pin an item from the dock onto the board
  const handlePinFromDock = (pantryItem) => {
    sounds.playPin();
    const existingIndex = pinnedItems.findIndex(i => i.id === pantryItem.id || i.name.toLowerCase() === pantryItem.name.toLowerCase());
    
    if (existingIndex >= 0) {
      // Toggle its check state
      const updated = [...pinnedItems];
      updated[existingIndex] = {
        ...updated[existingIndex],
        defaultChecked: !updated[existingIndex].defaultChecked
      };
      setPinnedItems(updated);
      updateRecipeFromPinned(updated);
    } else {
      // Pin new ingredient to board
      sounds.playIngredientSelect();

      const newItem = {
        id: pantryItem.id,
        name: pantryItem.name,
        image: pantryItem.image,
        defaultChecked: true,
        row: 'top'
      };

      const updated = [...pinnedItems, newItem];
      setPinnedItems(updated);
      updateRecipeFromPinned(updated);
    }
  };

  // Unpin / Remove ingredient from the board
  const handleUnpinItem = (id, e) => {
    e.stopPropagation();
    sounds.playPop(350);
    const updated = pinnedItems.filter(item => item.id !== id);
    setPinnedItems(updated);
    updateRecipeFromPinned(updated);
  };

  // Recalculate dynamic SVG realistic culinary flow pipe connecting all ticked pins
  const calculateThreadPath = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    // Get ticked pins in sequence
    const tickedItems = pinnedItems.filter(i => i.defaultChecked);
    const tickedCoords = [];

    tickedItems.forEach(item => {
      const el = pinRefs.current[item.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        // Point is at the center of the metallic pinhead
        const x = rect.left + rect.width / 2 - containerRect.left;
        const y = rect.top + 10 - containerRect.top;
        tickedCoords.push({ x, y, id: item.id });
      }
    });

    setActiveTickedNodes(tickedCoords);

    if (tickedCoords.length > 0) {
      // Build smooth curving bezier path through all ticked pins
      let d = `M ${tickedCoords[0].x} ${tickedCoords[0].y}`;
      for (let i = 1; i < tickedCoords.length; i++) {
        const prev = tickedCoords[i - 1];
        const curr = tickedCoords[i];
        const midX = (prev.x + curr.x) / 2;
        // Curve loops gracefully between the pins
        const curveY = Math.min(prev.y, curr.y) - 26 + (i % 2 === 0 ? 8 : -8);
        d += ` Q ${midX} ${curveY}, ${curr.x} ${curr.y}`;
      }

      // Trailing culinary flow pipe arrow pointing towards Recipe Flow
      const last = tickedCoords[tickedCoords.length - 1];
      const endX = last.x + 110;
      const endY = last.y + 35;
      d += ` C ${last.x + 50} ${last.y - 8}, ${last.x + 70} ${endY + 15}, ${endX} ${endY}`;

      setThreadPathD(d);
      setArrowCoords({ x: endX, y: endY, angle: 14 });
    } else {
      setThreadPathD('');
      setArrowCoords(null);
    }

    // Unticked/Missing ingredients dashed thread (bottom row)
    const untickedItems = pinnedItems.filter(i => !i.defaultChecked);
    const untickedCoords = [];
    untickedItems.forEach(item => {
      const el = pinRefs.current[item.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - containerRect.left;
        const y = rect.top + 10 - containerRect.top;
        untickedCoords.push({ x, y, id: item.id });
      }
    });

    if (untickedCoords.length > 1) {
      let dashedD = `M ${untickedCoords[0].x} ${untickedCoords[0].y}`;
      for (let i = 1; i < untickedCoords.length; i++) {
        const prev = untickedCoords[i - 1];
        const curr = untickedCoords[i];
        const midX = (prev.x + curr.x) / 2;
        const curveY = Math.max(prev.y, curr.y) + 20;
        dashedD += ` Q ${midX} ${curveY}, ${curr.x} ${curr.y}`;
      }
      setDashedPathD(dashedD);
    } else {
      setDashedPathD('');
    }
  };

  useEffect(() => {
    calculateThreadPath();
    const ro = new ResizeObserver(() => {
      calculateThreadPath();
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    const t1 = setTimeout(calculateThreadPath, 60);
    const t2 = setTimeout(calculateThreadPath, 250);
    window.addEventListener('resize', calculateThreadPath);
    return () => {
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', calculateThreadPath);
    };
  }, [pinnedItems]);

  // Navigate steps
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      sounds.playPop(350);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      sounds.playPop(550);
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Perform live search using RecipeDB API endpoint
  const performRecipeDBSearch = async () => {
    sounds.playPop(520);
    setIsSearchingAPI(true);
    setApiError(null);

    const activeIngredients = pinnedItems
      .filter(i => i.defaultChecked)
      .map(i => i.name.toLowerCase().replace('roma tomatoes', 'tomato'));

    const activeExclusions = [];
    if (allergies.nuts) activeExclusions.push('peanut', 'walnut', 'almond', 'cashew');
    if (allergies.dairy === 'Off') activeExclusions.push('milk', 'cream', 'cheese', 'butter');
    if (allergies.gluten) activeExclusions.push('wheat', 'flour', 'gluten', 'bread');

    const result = await searchRecipesByIngredients({
      includeIngredients: activeIngredients,
      excludeIngredients: activeExclusions,
      limit: 6
    });

    setIsSearchingAPI(false);

    if (result.recipes && result.recipes.length > 0 && result.recipes[0]) {
      sounds.playChime();
      setApiRecipesList(result.recipes);
      const topRecipe = result.recipes[0];
      setActiveApiRecipe(topRecipe);

      if (Array.isArray(topRecipe.steps) && topRecipe.steps.length > 0) {
        setSteps(topRecipe.steps.map((st, i) => ({
          id: i + 1,
          title: `${st.step || (i + 1)} ${st.title || 'Phase'}`,
          status: i === 0 ? 'NOW' : 'Upcoming',
          desc: st.description || '',
          duration: st.time || '5 mins',
          image: topRecipe.image || `/images/steps/${Math.min(i + 1, 6)}_boil_pasta.jpg`
        })));
        setCurrentStepIndex(0);
      }
    }
  };

  // Listen to external search queries passed from Header
  useEffect(() => {
    if (externalQuery && externalQuery.trim()) {
      const searchTitle = async () => {
        setIsSearchingAPI(true);
        const res = await searchRecipesByTitle(externalQuery);
        setIsSearchingAPI(false);
        if (res.success && res.recipes && res.recipes.length > 0 && res.recipes[0]) {
          sounds.playChime();
          const r = res.recipes[0];
          setActiveApiRecipe(r);
        }
      };
      searchTitle();
    }
  }, [externalQuery]);

  return (
    <div className="mode2-full-wrapper single-screen-locked">
      {/* Visual Mode Breadcrumb Bar */}
      <div className="mode-breadcrumb-bar">
        <div className="step-indicator active">
          <span className="step-num">1</span>
          <span className="step-name">Pick Ingredients</span>
        </div>
        <ChevronRight size={14} className="step-arrow" />
        <div className="step-indicator">
          <span className="step-num">2</span>
          <span className="step-name">Your Details</span>
        </div>
        <ChevronRight size={14} className="step-arrow" />
        <div className="step-indicator">
          <span className="step-num">3</span>
          <span className="step-name">The Recipe Flow</span>
        </div>
      </div>

      {/* Main Mode 2 Screen Split Layout */}
      <div className="mode2-main-split-layout">
        {/* Left Column: Interactive Culinary Pushpin Board */}
        <div className="corkboard-container-wrapper">
          <div className="corkboard-main-panel glass-panel-electric" ref={containerRef}>
            {/* Header Titles */}
            <div className="corkboard-title-group">
              <h1 className="corkboard-main-title">Pin It. Thread It. Cook It.</h1>
              <p className="corkboard-subtitle">
                Tick ingredients to connect them with high-temperature culinary flow &rarr;
              </p>
            </div>

            {/* Floating Kitchen Details Card */}
            {showDetailsCard && (
              <div className="floating-details-card glass-panel-electric">
                <div className="details-card-header">
                  <h3>Your Details</h3>
                  <button 
                    className="close-details-btn"
                    onClick={() => setShowDetailsCard(false)}
                    aria-label="Close details"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Serves Counter */}
                <div className="details-row">
                  <span className="details-label">Serves</span>
                  <div className="counter-pill">
                    <button 
                      onClick={() => { sounds.playPop(350); if (servesCount > 1) setServesCount(servesCount - 1); }}
                      className="counter-btn"
                      aria-label="Decrease Servings"
                    >
                      &minus;
                    </button>
                    <span className="counter-val">{servesCount} People</span>
                    <button 
                      onClick={() => { sounds.playPop(550); setServesCount(servesCount + 1); }}
                      className="counter-btn"
                      aria-label="Increase Servings"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Time Selector */}
                <div className="details-row">
                  <span className="details-label">Time</span>
                  <div className="time-pills-row">
                    {['15 min', '30 min', '45 min'].map(t => (
                      <button 
                        key={t}
                        className={`time-pill ${timeSelection === t ? 'active' : ''}`}
                        onClick={() => { sounds.playPop(480); setTimeSelection(t); }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Allergies Toggles */}
                <div className="details-row allergies-row">
                  <span className="details-label">Allergies</span>
                  <div className="allergy-toggles">
                    <div className="allergy-item">
                      <span className="allergy-name">Nuts</span>
                      <div 
                        className={`mini-toggle ${allergies.nuts ? 'on' : 'off'}`}
                        onClick={() => setAllergies({ ...allergies, nuts: !allergies.nuts })}
                      >
                        <span className="toggle-label">{allergies.nuts ? 'On' : 'Off'}</span>
                        <div className="toggle-thumb"></div>
                      </div>
                    </div>

                    <div className="allergy-item">
                      <span className="allergy-name">Dairy</span>
                      <div 
                        className={`mini-toggle ${allergies.dairy === 'Medium' ? 'medium' : 'off'}`}
                        onClick={() => setAllergies({ ...allergies, dairy: allergies.dairy === 'Medium' ? 'Off' : 'Medium' })}
                      >
                        <span className="toggle-label">{allergies.dairy}</span>
                        <div className="toggle-thumb"></div>
                      </div>
                    </div>

                    <div className="allergy-item">
                      <span className="allergy-name">Gluten</span>
                      <div 
                        className={`mini-toggle ${allergies.gluten ? 'on' : 'off'}`}
                        onClick={() => setAllergies({ ...allergies, gluten: !allergies.gluten })}
                      >
                        <span className="toggle-label">{allergies.gluten ? 'On' : 'Off'}</span>
                        <div className="toggle-thumb"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live RecipeDB Search Trigger */}
                <button 
                  className="recipedb-search-btn"
                  onClick={performRecipeDBSearch}
                  disabled={isSearchingAPI}
                >
                  <Sparkles size={13} className={isSearchingAPI ? 'spin-icon' : ''} />
                  <span>{isSearchingAPI ? 'Querying RecipeDB...' : 'Search RecipeDB'}</span>
                </button>
              </div>
            )}

            {/* SVG REALISTIC CULINARY FLOW PIPE LAYER */}
            <svg className="dynamic-thread-svg" aria-hidden="true">
              <defs>
                {/* 3D Atmospheric Liquid Glow Filter */}
                <filter id="liquidFlowGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur1" />
                  <feGaussianBlur stdDeviation="12" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Ultra-realistic liquid coral-gold gradient */}
                <linearGradient id="culinaryPipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff2a70" />
                  <stop offset="35%" stopColor="#ff4d6d" />
                  <stop offset="70%" stopColor="#ff85a1" />
                  <stop offset="90%" stopColor="#ffc857" />
                  <stop offset="100%" stopColor="#ffe494" />
                </linearGradient>

                {/* Metallic Pin Joint Brass Gradient */}
                <radialGradient id="brassPinGradient" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fff8db" />
                  <stop offset="45%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#78350f" />
                </radialGradient>

                {/* Flow Directional Arrow Marker */}
                <marker 
                  id="pipeArrow" 
                  viewBox="0 0 16 16" 
                  refX="12" 
                  refY="8" 
                  markerWidth="12" 
                  markerHeight="12" 
                  orient="auto"
                >
                  <path d="M 0 2 L 14 8 L 0 14 Z" fill="#ffc857" />
                </marker>
              </defs>

              {/* Dashed line for unticked/missing ingredients */}
              {dashedPathD && (
                <path
                  d={dashedPathD}
                  className="thread-dashed-line"
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.45)"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              )}

              {/* REALISTIC 3D MULTI-LAYER CULINARY FLOW PIPE */}
              {threadPathD && (
                <>
                  {/* Layer 1: Ambient Outer Aura */}
                  <path
                    d={threadPathD}
                    className="pipe-ambient-aura"
                    fill="none"
                    stroke="rgba(255, 51, 102, 0.4)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    filter="url(#liquidFlowGlow)"
                  />
                  {/* Layer 2: Core Glowing Culinary Tube */}
                  <path
                    d={threadPathD}
                    className="pipe-core-tube"
                    fill="none"
                    stroke="url(#culinaryPipeGradient)"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                    markerEnd="url(#pipeArrow)"
                  />
                  {/* Layer 3: High-Gloss Light Reflection */}
                  <path
                    d={threadPathD}
                    className="pipe-gloss-ribbon"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.85)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Layer 4: Live Energy Pulses Passing Through */}
                  <path
                    d={threadPathD}
                    className="pipe-energy-pulse"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeDasharray="24, 160"
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* Golden Connector Beads at each pin node */}
              {activeTickedNodes.map(node => (
                <g key={node.id} className="pipe-joint-node">
                  <circle cx={node.x} cy={node.y} r="8.5" fill="url(#brassPinGradient)" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={node.x} cy={node.y} r="3.5" fill="#ffc857" />
                </g>
              ))}
            </svg>

            {/* Pinned Ingredients Grid */}
            <div className="pinned-grid">
              {/* Primary Ticked Ingredients Row */}
              <div className="pinned-row top-row">
                {pinnedItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`pinned-card ${item.defaultChecked ? 'ticked' : 'unticked'}`}
                    onClick={() => handleToggleIngredient(item.id)}
                  >
                    {/* Metallic Pushpin */}
                    <div 
                      className="metal-pin" 
                      ref={el => pinRefs.current[item.id] = el}
                    >
                      <div className={`pin-head ${item.defaultChecked ? 'gold' : 'silver'}`}>
                        <div className="pin-shine"></div>
                      </div>
                      <div className="pin-shadow"></div>
                    </div>

                    {/* Unpin remove button */}
                    <button 
                      className="unpin-x-btn" 
                      onClick={(e) => handleUnpinItem(item.id, e)}
                      title={`Remove ${item.name} from board`}
                      aria-label="Remove item"
                    >
                      <X size={10} />
                    </button>

                    {/* Missing Label if unticked */}
                    {!item.defaultChecked && (
                      <span className="missing-pin-badge">Missing</span>
                    )}

                    {/* Ingredient Photo */}
                    <div className="ingredient-img-wrapper">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="ingredient-photo" 
                        onError={(e) => { e.currentTarget.src = '/images/ingredients/garlic.jpg'; }}
                      />
                    </div>

                    {/* Checkbox circle */}
                    <button 
                      className={`pin-checkbox ${item.defaultChecked ? 'checked' : ''}`}
                      aria-label={`Toggle ${item.name}`}
                    >
                      {item.defaultChecked && <Check size={13} strokeWidth={3} />}
                    </button>

                    <div className="ingredient-name">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mode 2 Interactive Dynamic Pantry Dock */}
            <div className="mode2-pantry-dock-tray">
              <div className="dock-tray-header">
                <div className="dock-title-left">
                  <Sparkles size={13} className="sparkle-gold" />
                  <span>Interactive Ingredient Tray &bull; Click to Pin/Unpin:</span>
                </div>
                <div className="dock-category-pills">
                  {['All', 'Produce', 'Pantry', 'Dairy', 'Proteins', 'Herbs'].map(cat => (
                    <button
                      key={cat}
                      className={`dock-cat-btn ${dockCategory === cat ? 'active' : ''}`}
                      onClick={() => { sounds.playPop(480); setDockCategory(cat); }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontal Scrollable Ingredients Tray */}
              <div className="dock-items-slider">
                {filteredDockItems.map(item => {
                  const isPinned = pinnedItems.some(p => p.id === item.id || p.name.toLowerCase() === item.name.toLowerCase());
                  const isTicked = pinnedItems.some(p => (p.id === item.id || p.name.toLowerCase() === item.name.toLowerCase()) && p.defaultChecked);

                  return (
                    <button
                      key={item.id}
                      className={`dock-ingredient-chip ${isPinned ? 'is-pinned' : ''} ${isTicked ? 'is-ticked' : ''}`}
                      onClick={() => handlePinFromDock(item)}
                      title={isPinned ? `Pinned on board: Click to toggle or remove` : `Click to pin ${item.name} to board`}
                    >
                      <img src={item.image} alt={item.name} className="dock-chip-thumb" />
                      <span className="dock-chip-label">{item.name}</span>
                      {isPinned ? (
                        <CheckCircle2 size={13} className="dock-check-icon" />
                      ) : (
                        <Plus size={12} className="dock-plus-icon" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Yellow Sticky Note pinned on bottom left */}
            <div className="pinned-sticky-note">
              <div className="sticky-pin"></div>
              <p className="sticky-text">&bull; The thread dynamically connects what you tick!</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Dynamic Recipe Section */}
        <aside className="recipe-flow-sidebar">
          {/* Editable Meal Setup Summary Pill near recipe results */}
          <MealSetupSummaryBar 
            mealSetup={mealSetup} 
            onEditSetup={onEditSetup} 
          />

          <div className="flow-card-container glass-panel-electric">
            {/* Clickable Recipe Hero Banner */}
            <div 
              className="flow-dish-hero-wrap"
              onClick={() => {
                sounds.playChime();
                setIsFlowChartOpen(true);
              }}
              title="Click dish to view interactive RecipeDB cooking diagram"
            >
              <img 
                key={activeApiRecipe?.id || activeApiRecipe?.title}
                src={activeApiRecipe?.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
                alt={activeApiRecipe?.title || 'RecipeDB Dish'} 
                className="flow-dish-hero-img dynamic-swap"
                onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
              />
              <div className="flow-dish-click-overlay">
                <Workflow size={12} />
                <span>Click Dish to View Diagram</span>
              </div>
              <div className="flow-dish-badge">
                <Sparkles size={11} className="sparkle-gold" />
                <span>{activeApiRecipe?.badge || 'RecipeDB Signature'}</span>
              </div>
              <button 
                className={`flow-fav-btn ${isSaved ? 'saved' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playPop(600);
                  setIsSaved(!isSaved);
                  if (onSaveRecipe && activeApiRecipe) onSaveRecipe(activeApiRecipe);
                }}
                title="Save to Favorites"
              >
                <Heart size={14} fill={isSaved ? '#ff3366' : 'none'} color={isSaved ? '#ff3366' : '#ffffff'} />
              </button>
            </div>

            {/* Sidebar Title & Dish Meta */}
            <div className="flow-header">
              <div className="flow-meta-block">
                <h2 className="flow-recipe-title">
                  {activeApiRecipe?.title || 'Creamy Garlic & Tomato Penne'}
                </h2>
                <p className="flow-recipe-subtitle">
                  {activeApiRecipe?.subtitle || 'RecipeDB Verified Recipe'}
                </p>
                <div className="flow-meta-pills">
                  <span><Users size={11} /> {servesCount} People</span>
                  <span><Clock size={11} /> {activeApiRecipe?.time || timeSelection}</span>
                  <span><BarChart2 size={11} /> {activeApiRecipe?.difficulty || 'Medium'}</span>
                </div>
              </div>

              {/* Small Quick Action Toggles Bar */}
              <div className="flow-quick-toggles-bar">
                <button 
                  type="button" 
                  className="flow-pill-btn dishes-pill"
                  onClick={() => { sounds.playPop(480); setShowDishesModal(true); }}
                  title="View matched RecipeDB dishes"
                >
                  <UtensilsCrossed size={12} />
                  <span>Dishes ({apiRecipesList.length})</span>
                </button>

                <button 
                  type="button" 
                  className="flow-pill-btn sub-pill"
                  onClick={() => { sounds.playPop(480); setShowSubstitutesModal(true); }}
                  title="View genuine database substitutes"
                >
                  <Sparkles size={12} />
                  <span>Substitutes</span>
                </button>

                <button 
                  type="button" 
                  className="flow-pill-btn missing-pill"
                  onClick={() => { sounds.playPop(480); setShowMissingModal(true); }}
                  title="View missing ingredients"
                >
                  <AlertCircle size={12} />
                  <span>Missing ({missingItems.length})</span>
                </button>

                <button 
                  type="button" 
                  className={`flow-pill-btn save-pill ${isSaved ? 'saved' : ''}`}
                  onClick={() => {
                    sounds.playPop(isSaved ? 320 : 680);
                    setIsSaved(!isSaved);
                    if (onSaveRecipe && activeApiRecipe) onSaveRecipe(activeApiRecipe);
                  }}
                  title={isSaved ? 'Saved in Collection' : 'Save Recipe'}
                >
                  <Heart size={12} fill={isSaved ? '#ff3366' : 'none'} color={isSaved ? '#ff3366' : 'currentColor'} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Macro Stats Bar */}
            <div className="flow-macro-row">
              <div className="macro-chip">
                <strong>{activeApiRecipe?.nutrition?.calories || '460 kcal'}</strong>
                <span>Calories</span>
              </div>
              <div className="macro-chip">
                <strong>{activeApiRecipe?.nutrition?.protein || '18g'}</strong>
                <span>Protein</span>
              </div>
              <div className="macro-chip">
                <strong>{activeApiRecipe?.nutrition?.carbs || '62g'}</strong>
                <span>Carbs</span>
              </div>
              <div className="macro-chip">
                <strong>{activeApiRecipe?.nutrition?.fat || '16g'}</strong>
                <span>Fat</span>
              </div>
            </div>

            {/* Steps Timeline List */}
            <div className="steps-list">
              {steps.map((step, idx) => {
                const isCurrent = idx === currentStepIndex;
                const isDone = idx < currentStepIndex;

                return (
                  <div 
                    key={step.id || idx} 
                    className={`step-item ${isCurrent ? 'now-step' : ''} ${isDone ? 'done-step' : ''}`}
                    onClick={() => {
                      sounds.playPop(450);
                      setCurrentStepIndex(idx);
                    }}
                  >
                    {/* Connector line between steps */}
                    {idx < steps.length - 1 && (
                      <div className={`step-connector ${isDone ? 'done-connector' : ''}`}></div>
                    )}

                    {/* Step Thumbnail Preview */}
                    <div className="step-thumb-container">
                      <img 
                        src={step.image || activeApiRecipe?.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
                        alt={step.title} 
                        className="step-thumb" 
                        onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
                      />
                      {isDone && (
                        <div className="step-done-check">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Step Title & Status Badge */}
                    <div className="step-content">
                      <div className="step-title-line">
                        <span className="step-title-text">{step.title}</span>
                        {isDone && <span className="status-badge done-badge">Done</span>}
                        {isCurrent && <span className="status-badge now-badge">NOW</span>}
                      </div>
                      {isCurrent && (
                        <p className="step-live-desc">{step.desc}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step Navigation Controls & Cook-Along Action */}
            <div className="mode2-bottom-actions">
              <div className="step-navigation-actions">
                <button 
                  className="step-nav-btn prev-btn" 
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                >
                  <ChevronLeft size={15} />
                  <span>Previous</span>
                </button>
                <div className="step-count-pill">
                  {currentStepIndex + 1} / {steps.length}
                </div>
                <button 
                  className="step-nav-btn next-btn" 
                  onClick={handleNextStep}
                  disabled={currentStepIndex === steps.length - 1}
                >
                  <span>Next</span>
                  <ChevronRight size={15} />
                </button>
              </div>

              {/* Full Cook-Along CTA */}
              <button 
                className="mode2-cookalong-btn glow-cta"
                onClick={() => {
                  sounds.playChime();
                  if (onOpenCookAlong) onOpenCookAlong(activeApiRecipe);
                }}
              >
                <Play size={14} fill="currentColor" />
                <span>Open Full Cook-Along (Voice Guided)</span>
              </button>
            </div>

          </div>
        </aside>
      </div>

      {/* Modal 1: Dishes Picker Modal */}
      <DishesPickerModal
        isOpen={showDishesModal}
        onClose={() => setShowDishesModal(false)}
        recipes={apiRecipesList.length > 0 ? apiRecipesList : DYNAMIC_RECIPEDB_CATALOG}
        activeRecipeId={activeApiRecipe?.id}
        onSelectRecipe={(rec) => {
          setActiveApiRecipe(rec);
          if (Array.isArray(rec.steps) && rec.steps.length > 0) {
            setSteps(rec.steps.map((st, i) => ({
              id: st.step || i + 1,
              title: `${st.step || (i + 1)} ${st.title || 'Phase'}`,
              status: i === 0 ? 'NOW' : 'Upcoming',
              desc: st.description || st.desc || '',
              duration: st.time || '5 mins',
              image: rec.image || `/images/steps/${Math.min(i + 1, 6)}_boil_pasta.jpg`
            })));
            setCurrentStepIndex(0);
          }
        }}
      />

      {/* Modal 2: Genuine Database Substitutes Modal */}
      <SubstitutesModal
        isOpen={showSubstitutesModal}
        onClose={() => setShowSubstitutesModal(false)}
        activeSubstitutes={activeSubstitutes}
        onApplySubstitute={(cat, sub) => {
          setActiveSubstitutes(prev => ({ ...prev, [cat]: sub.id }));
          sounds.playChime();
        }}
      />

      {/* Modal 3: Missing Ingredients Modal */}
      <MissingIngredientsModal
        isOpen={showMissingModal}
        onClose={() => setShowMissingModal(false)}
        missingItems={missingItems}
        onAddToCart={(items) => {
          items.forEach(it => onAddToCart && onAddToCart(it));
        }}
        onOpenSubstitutes={() => setShowSubstitutesModal(true)}
      />

      {/* Modal 4: Interactive Process Flow Chart Modal */}
      <FlowChartModal
        isOpen={isFlowChartOpen}
        onClose={() => setIsFlowChartOpen(false)}
        recipe={activeApiRecipe || {
          title: 'Creamy Garlic & Tomato Penne',
          subtitle: 'Foodoscope RecipeDB • Flow',
          time: timeSelection || '30 min',
          people: servesCount || 2,
          difficulty: 'Medium'
        }}
        onOpenCookAlong={onOpenCookAlong}
      />
    </div>
  );
}

export default Mode2IngredientFlow;
