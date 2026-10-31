import React, { useState } from 'react';
import { X, Sparkles, Clock, Users, Flame, Check, Search, ChefHat, Workflow } from 'lucide-react';
import { sounds } from '../utils/audio';

export function DishesPickerModal({
  isOpen,
  onClose,
  recipes = [],
  activeRecipeId,
  onSelectRecipe,
  onOpenFlowChart
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = recipes.filter(r => 
    (r.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="dishes-picker-modal-box glass-panel-electric" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="picker-modal-header">
          <div className="header-left-title">
            <div className="picker-icon-badge">
              <ChefHat size={18} className="sparkle-gold" />
            </div>
            <div>
              <h3>Recipe Suggestions from Same Ingredients</h3>
              <p>Found {recipes.length} recipes dynamically computed from your active ingredients</p>
            </div>
          </div>
          <button className="picker-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        {/* Search filter */}
        <div className="picker-search-bar">
          <Search size={15} className="search-icon" />
          <input 
            type="text"
            placeholder="Search RecipeDB dishes by name, cuisine, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')} type="button">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Dishes Grid */}
        <div className="dishes-cards-grid">
          {filtered.length === 0 ? (
            <div className="no-dishes-found">
              <p>No dishes matched "{searchTerm}". Try a different search term.</p>
            </div>
          ) : (
            filtered.map((dish, idx) => {
              const isSelected = String(dish.id) === String(activeRecipeId);
              return (
                <div 
                  key={dish.id || idx}
                  className={`dish-select-card ${isSelected ? 'active-dish-card' : ''}`}
                  onClick={() => {
                    sounds.playChime();
                    if (onOpenFlowChart) {
                      onOpenFlowChart(dish);
                    }
                    if (onSelectRecipe) {
                      onSelectRecipe(dish);
                    }
                    onClose();
                  }}
                  title={`Click to view interactive Recipe Flow for ${dish.title}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="dish-card-img-wrapper" style={{ height: '135px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={dish.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
                      alt={dish.title}
                      className="dish-card-photo"
                      style={{ width: '100%', height: '135px', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
                    />
                    <span className="dish-badge-pill">{dish.badge || 'RecipeDB'}</span>
                    <span className="dish-synergy-pill" style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(0, 0, 0, 0.82)',
                      border: '1px solid #ffd166',
                      color: '#ffd166',
                      fontSize: '10px',
                      fontWeight: '800',
                      padding: '2.5px 8px',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      zIndex: 2
                    }}>
                      <Sparkles size={10} className="sparkle-gold" /> {dish.synergyScore || dish.matchPercentage || 92}% Match
                    </span>
                    {isSelected && (
                      <div className="selected-active-indicator">
                        <Check size={12} strokeWidth={3} />
                        <span>Active</span>
                      </div>
                    )}
                  </div>

                  <div className="dish-card-info">
                    <h4 className="dish-card-title">{dish.title}</h4>
                    <p className="dish-card-subtitle">{dish.subtitle || 'RecipeDB Verified Recipe'}</p>

                    <div className="dish-card-meta-row">
                      <span><Clock size={11} /> {dish.time || '25m'}</span>
                      <span><Users size={11} /> {dish.people || 2} serves</span>
                      <span><Flame size={11} /> {dish.nutrition?.calories || dish.calories || '380 kcal'}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button 
                        type="button"
                        style={{
                          flex: '1.2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          background: 'linear-gradient(135deg, rgba(22, 138, 173, 0.85), rgba(2, 132, 199, 0.85))',
                          border: '1px solid rgba(122, 203, 250, 0.7)',
                          color: '#ffffff',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          fontSize: '11px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playChime();
                          if (onOpenFlowChart) onOpenFlowChart(dish);
                          if (onSelectRecipe) onSelectRecipe(dish);
                          onClose();
                        }}
                      >
                        <Workflow size={13} />
                        <span>Recipe Flow &rarr;</span>
                      </button>

                      <button 
                        type="button"
                        className={`select-dish-btn ${isSelected ? 'active' : ''}`}
                        style={{ flex: '1', marginTop: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playChime();
                          onSelectRecipe(dish);
                          onClose();
                        }}
                      >
                        {isSelected ? 'Active Formula' : 'Set as Active'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default DishesPickerModal;
