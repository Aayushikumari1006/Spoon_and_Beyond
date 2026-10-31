import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Star, 
  Trash2, 
  Play, 
  Clock, 
  Users, 
  Sparkles, 
  Edit3, 
  Check, 
  UtensilsCrossed 
} from 'lucide-react';
import { sounds } from '../utils/audio';

export function SavedModal({ 
  isOpen, 
  onClose, 
  savedRecipes = [], 
  onRemoveRecipe, 
  onSelectRecipe, 
  onUpdateNote, 
  onUpdateRating 
}) {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  if (!isOpen) return null;

  const handleStartEditNote = (recipe) => {
    setEditingNoteId(recipe.id);
    setTempNote(recipe.notes || '');
  };

  const handleSaveNote = (recipeId) => {
    sounds.playPop(520);
    if (onUpdateNote) onUpdateNote(recipeId, tempNote);
    setEditingNoteId(null);
  };

  return (
    <div className="cart-backdrop">
      <div className="saved-recipes-drawer glass-panel-electric">
        {/* Header */}
        <div className="saved-drawer-header">
          <div className="saved-header-title">
            <Bookmark size={22} className="bookmark-icon-accent" />
            <div>
              <h3>Saved Culinary Recipes</h3>
              <p>{savedRecipes.length} {savedRecipes.length === 1 ? 'recipe' : 'recipes'} in your collection</p>
            </div>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="saved-drawer-content">
          {savedRecipes.length === 0 ? (
            <div className="saved-empty-state">
              <UtensilsCrossed size={48} className="empty-saved-icon" />
              <h4>Your Recipe Book is Waiting</h4>
              <p>Click the bookmark or heart icon on any recipe in Mode 1 or Mode 2 to save your favorite dishes here.</p>
              <button 
                className="saved-discover-cta"
                onClick={onClose}
              >
                <Sparkles size={14} />
                <span>Discover Delicious Recipes</span>
              </button>
            </div>
          ) : (
            <div className="saved-recipes-list">
              {savedRecipes.map((item) => {
                const isEditingThisNote = editingNoteId === item.id;
                const rating = item.rating || 5;

                return (
                  <div key={item.id} className="saved-recipe-card">
                    <div className="saved-card-top">
                      <img 
                        src={item.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
                        alt={item.title} 
                        className="saved-thumb" 
                      />
                      <div className="saved-card-info">
                        <h4>{item.title}</h4>
                        <span className="saved-subtitle">{item.subtitle || 'Foodoscope RecipeDB'}</span>
                        
                        <div className="saved-meta-tags">
                          {item.time && (
                            <span className="saved-meta-pill">
                              <Clock size={11} /> {item.time}
                            </span>
                          )}
                          {item.people && (
                            <span className="saved-meta-pill">
                              <Users size={11} /> {item.people} Servings
                            </span>
                          )}
                          <span className="saved-meta-pill badge">RecipeDB</span>
                        </div>
                      </div>

                      <div className="saved-actions-column">
                        <button 
                          className="saved-cook-btn"
                          title="Cook this recipe now"
                          onClick={() => {
                            sounds.playChime();
                            if (onSelectRecipe) onSelectRecipe(item);
                            onClose();
                          }}
                        >
                          <Play size={13} fill="currentColor" />
                          <span>Cook</span>
                        </button>

                        <button 
                          className="saved-delete-btn"
                          title="Remove from saved"
                          onClick={() => {
                            sounds.playPop(300);
                            if (onRemoveRecipe) onRemoveRecipe(item.id);
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Star Rating Bar */}
                    <div className="saved-rating-bar">
                      <span className="rating-label">My Rating:</span>
                      <div className="star-rating-group">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className={`star-btn ${star <= rating ? 'filled' : 'empty'}`}
                            onClick={() => {
                              sounds.playPop(480 + star * 30);
                              if (onUpdateRating) onUpdateRating(item.id, star);
                            }}
                            title={`Rate ${star} stars`}
                          >
                            <Star size={14} fill={star <= rating ? '#fbbf24' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Personal Cooking Notes */}
                    <div className="saved-notes-section">
                      {isEditingThisNote ? (
                        <div className="notes-edit-box">
                          <textarea
                            value={tempNote}
                            onChange={(e) => setTempNote(e.target.value)}
                            placeholder="Add your personal cooking notes, spice adjustments, pairings..."
                            rows={2}
                            className="notes-textarea"
                          />
                          <div className="notes-btn-row">
                            <button 
                              className="save-note-btn"
                              onClick={() => handleSaveNote(item.id)}
                            >
                              <Check size={12} />
                              <span>Save Note</span>
                            </button>
                            <button 
                              className="cancel-note-btn"
                              onClick={() => setEditingNoteId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="notes-display-box"
                          onClick={() => handleStartEditNote(item)}
                          title="Click to edit cooking notes"
                        >
                          <Edit3 size={12} className="note-pencil-icon" />
                          <span className="note-text-snippet">
                            {item.notes ? item.notes : 'Click to add personal notes or flavor tweaks...'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedModal;
