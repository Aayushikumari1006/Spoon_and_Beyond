import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RoleHeroBanner from './components/RoleHeroBanner';
import Mode1IngredientMap from './components/Mode1IngredientMap';
import CookAlongModal from './components/CookAlongModal';
import CartDrawer from './components/CartDrawer';
import SavedModal from './components/SavedModal';
import { DiscoverRecipesModal } from './components/DiscoverRecipesModal';
import { MealSetupModal } from './components/MealSetupModal';
import FeedbackModal from './components/FeedbackModal';
import { sounds } from './utils/audio';
import confetti from 'canvas-confetti';
import { searchRecipesByTitle, searchRecipesByIngredients } from './services/recipedb';
import { RECIPE_MODE_1, DEFAULT_MEAL_SETUP } from './data/recipes';

function App() {
  // Required Meal Setup State (Serving size, time, meal type, allergies)
  const [mealSetup, setMealSetup] = useState(() => {
    try {
      const saved = localStorage.getItem('platera_meal_setup');
      return saved ? JSON.parse(saved) : DEFAULT_MEAL_SETUP;
    } catch {
      return DEFAULT_MEAL_SETUP;
    }
  });

  // Prompt user for timing and number of people before specifying recipes if not set in this session
  const [isMealSetupOpen, setIsMealSetupOpen] = useState(() => {
    try {
      const asked = sessionStorage.getItem('spoon_setup_asked');
      return !asked;
    } catch {
      return true;
    }
  });


  // Theme: 'ocean-breeze' (Primary Theme from PRD) or 'electric-plum'
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('spoon_theme') || 'ocean-breeze';
  });

  // Persona / Cooking Role (from PRD Section 7)
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('spoon_role') || 'Everyday Home Cook';
  });

  // Time Filter: '15 min' | '30 min' | '45 min' | '60+ min'
  const [activeTimeFilter, setActiveTimeFilter] = useState('30 min');

  // Active Navigation Destination: 'discover' | 'kitchen' | 'cooking' | 'saved'
  const [activeNav, setActiveNav] = useState('kitchen');

  // Modals Visibility
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isCookAlongOpen, setIsCookAlongOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // User Palate Feedback & Adaptive Taste Memory State
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const saved = localStorage.getItem('spoon_dish_feedbacks');
      return saved ? JSON.parse(saved) : {
        'rec_creamy_garlic_veg': {
          dishId: 'rec_creamy_garlic_veg',
          dishTitle: 'Creamy Garlic Vegetable Penne',
          tag: 'Salt was more than needed',
          note: 'Last time when you prepared this dish 2 tablespoons of salt was felt more than needed, so try less than that this time.',
          recommendation: 'Reduce salt to 1 tsp during the sauce simmer step for a lighter, balanced flavor.',
          date: 'Last cooked'
        }
      };
    } catch {
      return {};
    }
  });

  const handleSaveFeedback = (newFeedback) => {
    setFeedbacks(prev => {
      const updated = {
        ...prev,
        [newFeedback.dishId]: newFeedback
      };
      try {
        localStorage.setItem('spoon_dish_feedbacks', JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save feedback to localStorage:', e);
      }
      return updated;
    });
    showToast(`Taste memory saved for "${newFeedback.dishTitle}"!`);
  };

  const handleDeleteFeedback = (dishId) => {
    setFeedbacks(prev => {
      const updated = { ...prev };
      delete updated[dishId];
      try {
        localStorage.setItem('spoon_dish_feedbacks', JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not update localStorage:', e);
      }
      return updated;
    });
    showToast('Feedback note cleared.');
  };

  // Active Selected Recipe shared across views and cooking mode
  const [activeRecipe, setActiveRecipe] = useState(RECIPE_MODE_1);
  const [activeRecipeSteps, setActiveRecipeSteps] = useState(null);

  // Search Query State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  // Global Shopping Cart with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('spoon_cart');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: 'Parmesan', quantity: 1, checked: false },
        { id: 2, name: 'Fresh Basil', quantity: 1, checked: false },
        { id: 3, name: 'Heavy Cream', quantity: 1, checked: false }
      ];
    } catch {
      return ['Parmesan', 'Fresh Basil', 'Heavy Cream'];
    }
  });

  // Saved Recipes & Notes with localStorage persistence
  const [savedRecipes, setSavedRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem('spoon_saved_recipes');
      return saved ? JSON.parse(saved) : [
        {
          id: '100001',
          title: 'Creamy Garlic Vegetable Pasta',
          subtitle: 'Italian • Balanced • RecipeDB Verified',
          image: '/images/dishes/creamy_garlic_pasta.jpg',
          time: '30 mins',
          people: 2,
          rating: 5,
          notes: 'Added an extra clove of minced garlic and a pinch of chili flakes. Excellent sauce consistency!',
          steps: RECIPE_MODE_1.steps
        }
      ];
    } catch {
      return [];
    }
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Sync Theme to HTML root attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('spoon_theme', currentTheme);
  }, [currentTheme]);


  useEffect(() => {
    localStorage.setItem('spoon_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    try {
      localStorage.setItem('spoon_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('spoon_saved_recipes', JSON.stringify(savedRecipes));
    } catch {}
  }, [savedRecipes]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSaveMealSetup = (newSetup) => {
    setMealSetup(newSetup);
    try {
      localStorage.setItem('platera_meal_setup', JSON.stringify(newSetup));
    } catch {}
    const timeText = newSetup.timeLimit === 999 ? 'any time' : `≤ ${newSetup.timeLimit}m`;
    showToast(`Preferences updated: For ${newSetup.servings} people · ${newSetup.mealType} · ${timeText}!`);
  };

  const handleToggleTheme = () => {
    sounds.playPop(520);
    const nextTheme = currentTheme === 'ocean-breeze' ? 'electric-plum' : 'ocean-breeze';
    setCurrentTheme(nextTheme);
    showToast(`Switched theme to ${nextTheme === 'ocean-breeze' ? 'Ocean Breeze 🌊' : 'Electric Plum 🔮'}`);
  };


  const handleRoleChange = (roleTitle) => {
    setActiveRole(roleTitle);
    showToast(`Personalized for ${roleTitle}!`);
  };

  const handleTimeFilterChange = (timeVal) => {
    setActiveTimeFilter(timeVal);
    showToast(`Filtering recipes under ${timeVal}...`);
    // Also trigger query with time criteria
    setActiveSearchQuery(`time_${timeVal.replace(' ', '')}`);
  };

  const handleNavClick = (navDestination) => {
    setActiveNav(navDestination);
    if (navDestination === 'discover') {
      sounds.playPop(480);
      setIsDiscoverOpen(true);
    } else if (navDestination === 'kitchen') {
      sounds.playPop(520);
      showToast('Switched to My Kitchen culinary workspace!');
    } else if (navDestination === 'cooking') {
      sounds.playChime();
      setIsCookAlongOpen(true);
    } else if (navDestination === 'saved') {
      sounds.playPop(500);
      setIsSavedOpen(true);
    }
  };

  const handleHeaderSearch = (query) => {
    setActiveSearchQuery(query);
    showToast(`Searching RecipeDB for "${query}"...`);
  };

  // "Surprise Me!" Action from PRD Section 4
  const handleSurpriseMe = async () => {
    sounds.playChime();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#168aad', '#7acbfa', '#ffc857', '#c026d3', '#ff3366']
    });

    const surpriseTerms = ['pasta', 'curry', 'bruschetta', 'salad', 'risotto', 'soup', 'stir fry'];
    const randomTerm = surpriseTerms[Math.floor(Math.random() * surpriseTerms.length)];
    
    showToast(`Surprise Discovery: Querying RecipeDB for "${randomTerm}"...`);
    setActiveSearchQuery(randomTerm);

    try {
      const res = await searchRecipesByTitle(randomTerm, { limit: 4 });
      if (res.success && res.recipes.length > 0) {
        const dish = res.recipes[0];
        setActiveRecipe(dish);
        if (dish.steps) setActiveRecipeSteps(dish.steps);
      }
    } catch (err) {
      // safe fallback
    }
  };

  // Cart Management
  const handleAddToCart = (itemName) => {
    setCartItems(prev => {
      const exists = prev.find(i => (typeof i === 'string' ? i : i.name).toLowerCase() === itemName.toLowerCase());
      if (exists) {
        return prev.map(i => {
          const name = typeof i === 'string' ? i : i.name;
          if (name.toLowerCase() === itemName.toLowerCase()) {
            return typeof i === 'string' ? { id: Date.now(), name, quantity: 2, checked: false } : { ...i, quantity: (i.quantity || 1) + 1 };
          }
          return i;
        });
      }
      return [...prev, { id: Date.now(), name: itemName, quantity: 1, checked: false }];
    });
    showToast(`Added "${itemName}" to your shopping list!`);
  };

  const handleToggleItemChecked = (idx) => {
    setCartItems(prev => prev.map((item, i) => {
      if (i === idx) {
        const obj = typeof item === 'string' ? { id: Date.now(), name: item, quantity: 1, checked: false } : item;
        return { ...obj, checked: !obj.checked };
      }
      return item;
    }));
  };

  const handleUpdateItemQuantity = (idx, newQty) => {
    setCartItems(prev => prev.map((item, i) => {
      if (i === idx) {
        const obj = typeof item === 'string' ? { id: Date.now(), name: item, quantity: 1, checked: false } : item;
        return { ...obj, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    sounds.playPop(300);
    setCartItems([]);
  };

  // Saved Recipes Management
  const handleSaveRecipe = (recipeObj) => {
    sounds.playChime();
    setSavedRecipes(prev => {
      if (prev.some(r => r.id === recipeObj.id)) {
        showToast(`"${recipeObj.title}" is already in your Saved Recipes.`);
        return prev;
      }
      const newEntry = {
        ...recipeObj,
        savedAt: new Date().toLocaleDateString(),
        rating: 5,
        notes: recipeObj.notes || ''
      };
      showToast(`Saved "${recipeObj.title}" to your Recipe Book!`);
      return [newEntry, ...prev];
    });
  };

  const handleRemoveSavedRecipe = (recipeId) => {
    setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
    showToast('Removed recipe from Saved collection.');
  };

  const handleUpdateRecipeNote = (recipeId, noteText) => {
    setSavedRecipes(prev => prev.map(r => r.id === recipeId ? { ...r, notes: noteText } : r));
    showToast('Cooking note saved!');
  };

  const handleUpdateRecipeRating = (recipeId, ratingNum) => {
    setSavedRecipes(prev => prev.map(r => r.id === recipeId ? { ...r, rating: ratingNum } : r));
    showToast(`Rated ${ratingNum} stars!`);
  };

  const handleSelectRecipeFromSaved = (recipeObj) => {
    setActiveRecipe(recipeObj);
    if (recipeObj.steps) setActiveRecipeSteps(recipeObj.steps);
    showToast(`Loaded "${recipeObj.title}"!`);
  };

  return (
    <div className="spoon-beyond-app">
      {/* Top Navigation Bar with Logo and Mode/Theme Switchers */}
      <Header
        onOpenCookAlong={() => { sounds.playChime(); setIsCookAlongOpen(true); }}
        cartCount={cartItems.length}
        onOpenCart={() => { sounds.playPop(480); setIsCartOpen(true); }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleHeaderSearch}
        currentTheme={currentTheme}
        onToggleTheme={handleToggleTheme}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        activeTimeFilter={activeTimeFilter}
        onTimeFilterChange={handleTimeFilterChange}
        onOpenSaved={() => { sounds.playPop(480); setIsSavedOpen(true); }}
        onSurpriseMe={handleSurpriseMe}
        onOpenMealSetup={() => setIsMealSetupOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        mealSetup={mealSetup}
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />

      {/* Role-Based Hero Action Banner */}
      <RoleHeroBanner
        activeRole={activeRole}
        onFindDelicious={handleSurpriseMe}
        onUseWhatIHave={() => {
          sounds.playPop(500);
          showToast('Select your ingredients in the Constellation Map!');
        }}
        onSurpriseMe={handleSurpriseMe}
      />

      {/* Main View: Spoon & Beyond Interactive Cooking Studio */}
      <main className="app-main-content">
        <Mode1IngredientMap 
          activeRecipe={activeRecipe}
          feedbacks={feedbacks}
          onOpenFeedback={() => setIsFeedbackOpen(true)}
          onAddToCart={handleAddToCart} 
          externalQuery={activeSearchQuery}
          onSaveRecipe={handleSaveRecipe}
          activeRole={activeRole}
          timeLimit={activeTimeFilter}
          mealSetup={mealSetup}
          onEditSetup={() => setIsMealSetupOpen(true)}
          onSaveMealSetup={handleSaveMealSetup}
          onOpenCookAlong={(rec) => {
            if (rec) {
              setActiveRecipe(rec);
              if (rec.steps) setActiveRecipeSteps(rec.steps);
            }
            sounds.playChime();
            setIsCookAlongOpen(true);
          }}
        />
      </main>

      {/* Required Meal Setup Modal (4 Questions: Servings, Time, Meal Type, Allergies) */}
      <MealSetupModal
        isOpen={isMealSetupOpen}
        onClose={() => setIsMealSetupOpen(false)}
        initialSetup={mealSetup}
        onSaveSetup={handleSaveMealSetup}
      />

      {/* Interactive Step-by-Step Cook-Along Modal */}
      <CookAlongModal 
        isOpen={isCookAlongOpen}
        onClose={() => setIsCookAlongOpen(false)}
        activeRecipe={activeRecipe}
        activeSteps={activeRecipeSteps}
        onSaveRecipe={handleSaveRecipe}
      />

      {/* Interactive Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onToggleItemChecked={handleToggleItemChecked}
        onUpdateQuantity={handleUpdateItemQuantity}
      />

      {/* Interactive Saved Recipes & Notes Modal */}
      <SavedModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedRecipes={savedRecipes}
        onRemoveRecipe={handleRemoveSavedRecipe}
        onSelectRecipe={handleSelectRecipeFromSaved}
        onUpdateNote={handleUpdateRecipeNote}
        onUpdateRating={handleUpdateRecipeRating}
      />

      {/* RecipeDB Culinary Explorer / Discover Recipes Modal */}
      <DiscoverRecipesModal 
        isOpen={isDiscoverOpen}
        onClose={() => setIsDiscoverOpen(false)}
        mealSetup={mealSetup}
        onEditSetup={() => setIsMealSetupOpen(true)}
        onSelectRecipe={(selectedDish) => {
          setActiveRecipe(selectedDish);
          if (selectedDish.steps) setActiveRecipeSteps(selectedDish.steps);
          setIsDiscoverOpen(false);
          showToast(`Loaded "${selectedDish.title}" into kitchen!`);
        }}
      />

      {/* Culinary Feedback & Taste Memory Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        activeRecipe={activeRecipe}
        feedbacks={feedbacks}
        onSaveFeedback={handleSaveFeedback}
        onDeleteFeedback={handleDeleteFeedback}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="app-toast-alert glass-panel-electric">
          <span className="toast-glow-dot"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
