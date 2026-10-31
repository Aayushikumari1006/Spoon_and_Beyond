import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquareHeart, 
  Sparkles, 
  Check, 
  ChefHat, 
  Lightbulb, 
  Clock, 
  History, 
  Trash2,
  ChevronDown
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { DYNAMIC_RECIPEDB_CATALOG } from '../data/recipes';

export function FeedbackModal({
  isOpen,
  onClose,
  activeRecipe,
  feedbacks = {},
  onSaveFeedback,
  onDeleteFeedback
}) {
  const [selectedDishId, setSelectedDishId] = useState(activeRecipe?.id || 'rec_creamy_garlic_veg');
  const [tag, setTag] = useState('Salt was more than needed');
  const [noteText, setNoteText] = useState('Last time when you prepared this dish 2 tablespoons of salt was felt more than needed, so try less than that this time (approx. 1 tsp).');
  const [recommendation, setRecommendation] = useState('Reduce salt to 1 tsp during the sauce simmer step for a lighter, balanced flavor.');

  // Sync with active recipe when modal opens
  useEffect(() => {
    if (activeRecipe?.id) {
      setSelectedDishId(activeRecipe.id);
      const existing = feedbacks[activeRecipe.id];
      if (existing) {
        setTag(existing.tag || 'Salt was more than needed');
        setNoteText(existing.note || '');
        setRecommendation(existing.recommendation || '');
      } else {
        setTag('Salt was more than needed');
        setNoteText('Last time when you prepared this dish 2 tablespoons of salt was felt more than needed, so try less than that this time (approx. 1 tsp).');
        setRecommendation('Reduce salt to 1 tsp during the sauce simmer step for a lighter, balanced flavor.');
      }
    }
  }, [activeRecipe, isOpen]);

  // When selected dish changes via dropdown
  const handleDishChange = (dishId) => {
    setSelectedDishId(dishId);
    sounds.playPop(480);
    const existing = feedbacks[dishId];
    if (existing) {
      setTag(existing.tag || 'Salt was more than needed');
      setNoteText(existing.note || '');
      setRecommendation(existing.recommendation || '');
    } else {
      setTag('Salt was more than needed');
      setNoteText('Last time when you prepared this dish 2 tablespoons of salt was felt more than needed, so try less than that this time (approx. 1 tsp).');
      setRecommendation('Reduce salt to 1 tsp during the sauce simmer step for a lighter, balanced flavor.');
    }
  };

  if (!isOpen) return null;

  const currentDish = DYNAMIC_RECIPEDB_CATALOG.find(d => d.id === selectedDishId) || activeRecipe || DYNAMIC_RECIPEDB_CATALOG[0];
  const existingFeedback = feedbacks[selectedDishId];

  const QUICK_TAGS = [
    { 
      label: '🧂 Salt was more than needed', 
      tag: 'Salt was more than needed',
      sampleNote: 'Last time when you prepared this dish 2 tablespoons of salt was felt more than needed, so try less than that this time (approx. 1 tsp).',
      sampleRec: 'Reduce salt from 2 tbsp to 1 tsp during sauce reduction for optimal palate balance.'
    },
    { 
      label: '🌶️ Too spicy / high chili', 
      tag: 'Too spicy / high chili',
      sampleNote: 'Chili flakes gave too much heat last time. Halve the pepper or add dairy.',
      sampleRec: 'Use only a gentle pinch of chili flakes and fold in an extra splash of cream.'
    },
    { 
      label: '🍋 Needed more acidity', 
      tag: 'Needed more acidity',
      sampleNote: 'Felt slightly flat; needed a fresh pop of citrus or white wine vinegar.',
      sampleRec: 'Squeeze half a fresh lemon and zest right before plating.'
    },
    { 
      label: '🧄 More garlic wanted', 
      tag: 'More garlic wanted',
      sampleNote: 'Garlic flavor was too subtle. Increase by 2 cloves next time.',
      sampleRec: 'Sauté 2 additional minced garlic cloves over low heat for 90 seconds.'
    },
    { 
      label: '🥣 Sauce was too thick', 
      tag: 'Sauce was too thick',
      sampleNote: 'Sauce dried up quickly. Reserve more starchy water.',
      sampleRec: 'Reserve an extra 1/2 cup of starchy pasta water to loosen the glaze.'
    },
    { 
      label: '⏱️ Cooked faster than expected', 
      tag: 'Cooked faster than expected',
      sampleNote: 'Veggies cooked fast on high flame. Lower heat to medium-low.',
      sampleRec: 'Reduce flame after boiling and shave 3 minutes off simmer time.'
    },
    { 
      label: '✨ Seasoning was perfect!', 
      tag: 'Seasoning was perfect!',
      sampleNote: 'Turned out restaurant-quality. Keep exact measurements!',
      sampleRec: 'Lock in this exact ratio of seasoning and aromatics.'
    }
  ];

  const handleSelectQuickTag = (item) => {
    sounds.playDietSelect();
    setTag(item.tag);
    setNoteText(item.sampleNote);
    setRecommendation(item.sampleRec);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    sounds.playFeedbackSubmitted();
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ffd166', '#06d6a0', '#118ab2', '#ff477e']
    });

    const newFeedback = {
      dishId: selectedDishId,
      dishTitle: currentDish?.title || 'Selected Dish',
      tag,
      note: noteText.trim(),
      recommendation: recommendation.trim() || 'Adaptive culinary adjustment saved for this dish.',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (onSaveFeedback) {
      onSaveFeedback(newFeedback);
    }
    onClose();
  };

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="feedback-modal-box glass-panel-electric" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="picker-modal-header">
          <div className="header-left-title">
            <div className="picker-icon-badge feedback-badge-glow">
              <MessageSquareHeart size={20} className="sparkle-gold" />
            </div>
            <div>
              <h3>Chef's Sensory Feedback & Taste Memory</h3>
              <p>Personalize future recipe steps & seasoning based on your real palate</p>
            </div>
          </div>
          <button className="picker-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        {/* Selected Dish Card Strip */}
        <div className="feedback-dish-selector-strip">
          <img 
            src={currentDish?.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
            alt={currentDish?.title} 
            className="feedback-dish-thumb"
            onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
          />
          <div className="feedback-dish-meta">
            <span className="feedback-sub-label">Giving Feedback For:</span>
            <div className="feedback-select-wrap">
              <select 
                value={selectedDishId} 
                onChange={(e) => handleDishChange(e.target.value)}
                className="feedback-dish-dropdown"
              >
                {DYNAMIC_RECIPEDB_CATALOG.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Existing Note Banner (if present) */}
        {existingFeedback && (
          <div className="existing-feedback-banner">
            <div className="existing-top-line">
              <span className="existing-tag"><History size={12} /> Active Note Saved on {existingFeedback.date}</span>
              {onDeleteFeedback && (
                <button 
                  type="button" 
                  className="delete-feedback-btn"
                  onClick={() => {
                    sounds.playPop(350);
                    onDeleteFeedback(selectedDishId);
                  }}
                  title="Remove this saved feedback"
                >
                  <Trash2 size={12} /> Clear Note
                </button>
              )}
            </div>
            <p className="existing-note-body">"{existingFeedback.note}"</p>
          </div>
        )}

        {/* Quick Seasoning & Palate Tags */}
        <div className="feedback-section">
          <label className="feedback-section-title">
            <Sparkles size={13} className="sparkle-gold" />
            <span>Quick Palate & Seasoning Shortcuts:</span>
          </label>
          <div className="quick-tags-grid">
            {QUICK_TAGS.map(item => {
              const isSelected = tag === item.tag;
              return (
                <button
                  key={item.tag}
                  type="button"
                  className={`quick-tag-chip ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectQuickTag(item)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed User Note Textarea */}
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="feedback-section">
            <label className="feedback-section-title" htmlFor="feedback-note-input">
              <ChefHat size={13} className="sparkle-gold" />
              <span>What did you observe or want to adjust next time?</span>
            </label>
            <textarea
              id="feedback-note-input"
              className="feedback-textarea"
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Salt was more than needed: last time 2 tablespoons of salt was felt more than needed, so try less than that this time..."
              required
            />
          </div>

          {/* Adaptive Suggestion Preview */}
          <div className="adaptive-suggestion-preview-box">
            <div className="preview-header">
              <Lightbulb size={14} className="sparkle-gold" />
              <strong>AI RecipeDB Adaptive Suggestion Preview:</strong>
            </div>
            <p className="preview-text">
              {recommendation || 'Next time you view or cook this dish, Spoon & Beyond will automatically alert you with this note and advise adjusted quantities!'}
            </p>
          </div>

          {/* Modal Actions */}
          <div className="feedback-modal-actions">
            <button 
              type="button" 
              className="feedback-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="feedback-save-cta glow-feedback-cta"
            >
              <Check size={14} strokeWidth={3} />
              <span>Save Chef's Memory & Adaptive Note</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;
