import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  Clock, 
  Users, 
  Flame, 
  Check, 
  Compass, 
  Filter, 
  ArrowRight,
  ChefHat
} from 'lucide-react';
import { DYNAMIC_RECIPEDB_CATALOG, filterCatalogByMealSetup } from '../data/recipes';
import { MealSetupSummaryBar } from './MealSetupSummaryBar';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function DiscoverRecipesModal({
  isOpen,
  onClose,
  onSelectRecipe,
  mealSetup,
  onEditSetup
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  if (!isOpen) return null;

  const CUISINES = ['All', 'Italian', 'Mediterranean', 'Seafood', 'High Protein', 'Vegan', 'Comfort'];

  // 1. First filter verified recipes by Meal Setup (allergies hard exclusion, meal/dish type, time limit)
  const baseEligibleRecipes = filterCatalogByMealSetup(DYNAMIC_RECIPEDB_CATALOG, mealSetup);

  const filteredRecipes = baseEligibleRecipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.keywords || []).some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCuisine = 
      selectedCuisine === 'All' || 
      recipe.subtitle.toLowerCase().includes(selectedCuisine.toLowerCase()) ||
      (recipe.badge || '').toLowerCase().includes(selectedCuisine.toLowerCase()) ||
      (selectedCuisine === 'Seafood' && (recipe.keywords?.includes('shrimp') || recipe.keywords?.includes('salmon'))) ||
      (selectedCuisine === 'Vegan' && (recipe.badge || '').toLowerCase().includes('vegan')) ||
      (selectedCuisine === 'High Protein' && (recipe.badge || '').toLowerCase().includes('protein'));

    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="discover-modal-box glass-panel-electric" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="discover-modal-header">
          <div className="discover-title-group">
            <div className="discover-icon-badge">
              <Compass size={22} className="sparkle-gold" />
            </div>
            <div>
              <h2>RecipeDB Culinary Explorer</h2>
              <p>Browse verified culinary recipes from the RecipeDB database</p>
            </div>
          </div>
          <button className="picker-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Editable Meal Setup Summary Bar */}
        <div style={{ padding: '0 1.25rem', marginBottom: '0.6rem' }}>
          <MealSetupSummaryBar mealSetup={mealSetup} onEditSetup={onEditSetup} />
        </div>

        {/* Search & Cuisine Filter Bar */}
        <div className="discover-filters-strip">
          <div className="discover-search-input-box">
            <Search size={15} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search RecipeDB: pasta, salmon, risotto, shrimp, soup..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <X size={13} />
              </button>
            )}
          </div>

          <div className="discover-cuisine-pills">
            {CUISINES.map(c => (
              <button
                key={c}
                type="button"
                className={`cuisine-pill-btn ${selectedCuisine === c ? 'active' : ''}`}
                onClick={() => { sounds.playPop(420); setSelectedCuisine(c); }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="discover-cards-grid">
          {filteredRecipes.length === 0 ? (
            <div className="no-recipes-empty-state">
              <ChefHat size={36} className="empty-icon" />
              <h4>No dishes matched "{searchQuery}"</h4>
              <p>Try searching for ingredients like "garlic", "spinach", "mushrooms", or "shrimp".</p>
            </div>
          ) : (
            filteredRecipes.map((dish) => (
              <div 
                key={dish.id} 
                className="discover-dish-card glass-panel-electric"
                onClick={() => {
                  sounds.playChime();
                  confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
                  onSelectRecipe(dish);
                  onClose();
                }}
              >
                <div className="discover-card-banner" style={{ height: '140px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={dish.image} 
                    alt={dish.title} 
                    className="discover-card-img"
                    style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
                  />
                  <span className="discover-card-badge">{dish.badge || 'RecipeDB'}</span>
                  <div className="discover-hover-load">
                    <span>Load to Kitchen →</span>
                  </div>
                </div>

                <div className="discover-card-details">
                  <h3 className="discover-dish-title">{dish.title}</h3>
                  <p className="discover-dish-subtitle">{dish.subtitle}</p>

                  <div className="discover-dish-meta-pills">
                    <span><Clock size={11} /> {dish.time}</span>
                    <span><Users size={11} /> {dish.people} serves</span>
                    <span><Flame size={11} /> {dish.nutrition?.calories || '420 kcal'}</span>
                  </div>

                  <div className="discover-ingredients-preview">
                    {dish.requiredIngredients.slice(0, 4).map(ing => (
                      <span key={ing} className="mini-ing-chip">
                        {ing.replace('_', ' ')}
                      </span>
                    ))}
                    {dish.requiredIngredients.length > 4 && (
                      <span className="mini-ing-more">+{dish.requiredIngredients.length - 4} more</span>
                    )}
                  </div>

                  <button 
                    type="button"
                    className="discover-select-cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playChime();
                      confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
                      onSelectRecipe(dish);
                      onClose();
                    }}
                  >
                    <span>Cook This Recipe</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscoverRecipesModal;
