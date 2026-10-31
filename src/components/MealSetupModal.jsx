import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  Clock, 
  Utensils, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Coffee,
  Sun,
  Moon,
  Cookie,
  Cake,
  Shuffle,
  AlertCircle
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function MealSetupModal({
  isOpen,
  onClose,
  initialSetup = {},
  onSaveSetup
}) {
  // 1. Serving Size State (Question 1)
  const [servings, setServings] = useState(() => initialSetup.servings || 2);
  const [isMoreServings, setIsMoreServings] = useState(() => (initialSetup.servings || 2) > 6);

  // 2. Available Time State (Question 2)
  const [timeLimit, setTimeLimit] = useState(() => initialSetup.timeLimit || 30);

  // 3. What are you preparing State (Question 3)
  const [mealType, setMealType] = useState(() => initialSetup.mealType || 'dinner');

  // 4. Allergies and Avoidances State (Question 4 - Optional)
  const [allergies, setAllergies] = useState(() => initialSetup.allergies || []);
  const [customAvoid, setCustomAvoid] = useState(() => initialSetup.customAvoid || '');
  const [isOtherOpen, setIsOtherOpen] = useState(() => !!initialSetup.customAvoid);

  // Sync with initialSetup whenever opened
  useEffect(() => {
    if (isOpen && initialSetup) {
      if (initialSetup.servings) {
        setServings(initialSetup.servings);
        setIsMoreServings(initialSetup.servings > 6);
      }
      if (initialSetup.timeLimit) setTimeLimit(initialSetup.timeLimit);
      if (initialSetup.mealType) setMealType(initialSetup.mealType);
      if (initialSetup.allergies) setAllergies(initialSetup.allergies);
      if (initialSetup.customAvoid) {
        setCustomAvoid(initialSetup.customAvoid);
        setIsOtherOpen(true);
      }
    }
  }, [isOpen, initialSetup]);

  if (!isOpen) return null;

  // Simple, friendly serving options
  const SERVING_OPTIONS = [
    { label: 'Just me (1)', value: 1 },
    { label: '2 People', value: 2 },
    { label: '3 People', value: 3 },
    { label: '4 People', value: 4 },
    { label: '5-6 People', value: 6 },
    { label: 'More...', value: 'more' }
  ];

  // Simple, friendly time options
  const TIME_OPTIONS = [
    { label: '15 mins', value: 15, tag: '⚡ Quick Meal' },
    { label: '30 mins', value: 30, tag: '⏱️ Weeknight Staple' },
    { label: '45 mins', value: 45, tag: '🍲 Balanced Cook' },
    { label: 'Any time', value: 999, tag: '⏳ No Rush' }
  ];

  // Simple, friendly meal options
  const MEAL_CARDS = [
    { id: 'dinner', label: 'Dinner', icon: Moon, desc: 'Warm evening comfort' },
    { id: 'lunch', label: 'Lunch', icon: Sun, desc: 'Fresh & balanced midday' },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee, desc: 'Energizing morning' },
    { id: 'snack', label: 'Snack / Bites', icon: Cookie, desc: 'Quick small plates' },
    { id: 'sweet', label: 'Sweet / Dessert', icon: Cake, desc: 'Guilt-free indulgences' },
    { id: 'anything', label: 'Surprise Me!', icon: Shuffle, desc: 'Open to anything delicious' }
  ];

  // Optional allergy and dietary checklist
  const ALLERGY_OPTIONS = [
    { id: 'none', label: 'No Restrictions (Eat Everything)', exclusive: true },
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Vegan', label: 'Vegan' },
    { id: 'Gluten-free', label: 'Gluten-Free' },
    { id: 'Dairy-free', label: 'Dairy-Free' },
    { id: 'Peanuts', label: 'Nut-Free' },
    { id: 'Egg-free', label: 'Egg-Free' },
    { id: 'Soy', label: 'Soy-Free' }
  ];

  const handleSelectServings = (val) => {
    sounds.playPeopleChange(val);
    if (val === 'more') {
      setIsMoreServings(true);
      if (servings <= 6) setServings(8);
    } else {
      setIsMoreServings(false);
      setServings(val);
    }
  };

  const handleToggleAllergy = (opt) => {
    sounds.playDietSelect();
    if (opt.exclusive) {
      setAllergies(['none']);
      setCustomAvoid('');
      setIsOtherOpen(false);
      return;
    }

    setAllergies(prev => {
      const filtered = prev.filter(x => x !== 'none');
      if (filtered.includes(opt.id)) {
        return filtered.filter(x => x !== opt.id);
      } else {
        return [...filtered, opt.id];
      }
    });
  };

  const handleConfirm = () => {
    sounds.playChime();
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#14b8a6', '#2dd4bf', '#ffc857', '#38bdf8']
    });

    const finalSetup = {
      servings: typeof servings === 'number' ? servings : parseInt(servings) || 2,
      timeLimit: typeof timeLimit === 'number' ? timeLimit : parseInt(timeLimit) || 30,
      mealType,
      dishType: mealType === 'sweet' ? 'sweet' : (mealType === 'snack' ? 'side' : 'main'),
      allergies: allergies.filter(a => a !== 'none'),
      customAvoid: isOtherOpen ? customAvoid.trim() : ''
    };

    try {
      localStorage.setItem('platera_meal_setup', JSON.stringify(finalSetup));
      sessionStorage.setItem('spoon_setup_asked', 'true');
    } catch (e) {
      console.warn('Could not persist meal setup:', e);
    }

    if (onSaveSetup) {
      onSaveSetup(finalSetup);
    }
    onClose();
  };

  const activeAllergiesDisplay = allergies.filter(a => a !== 'none');

  return (
    <div className="meal-setup-backdrop" onClick={onClose}>
      <div 
        className="meal-setup-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="setup-header-strip">
          <div className="setup-title-group">
            <div className="setup-badge-icon">
              <Utensils size={20} className="sparkle-gold" />
            </div>
            <div>
              <div className="setup-mini-badge">
                <Sparkles size={11} />
                <span>Personalized Kitchen Studio</span>
              </div>
              <h2 className="setup-headline-text">Personalize Your Cooking Experience</h2>
              <p className="setup-sub-caption">
                4 quick preferences so every recipe we suggest is practical, healthy, and tailored to you.
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="setup-close-btn" 
            onClick={onClose}
            aria-label="Close setup"
            title="Close and use current settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Questions Body */}
        <div className="setup-modal-body custom-scrollbar">

          {/* 1. TABLE SIZE (SERVINGS) */}
          <section className="setup-section-card">
            <div className="setup-question-title">
              <div className="title-left">
                <span className="setup-step-num">1</span>
                <div>
                  <h3 className="setup-question-text">How many people are eating?</h3>
                  <p className="setup-question-hint">We scale ingredient quantities and pan sizes automatically.</p>
                </div>
              </div>
              <span className="setup-active-pill-preview">
                <Users size={12} /> {servings} {servings === 1 ? 'Person' : 'People'}
              </span>
            </div>

            <div className="setup-chips-row">
              {SERVING_OPTIONS.map(opt => {
                const isSelected = opt.value === 'more' 
                  ? isMoreServings 
                  : (!isMoreServings && servings === opt.value);

                return (
                  <button
                    key={opt.label}
                    type="button"
                    className={`setup-choice-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectServings(opt.value)}
                  >
                    <span className="chip-tick">{isSelected ? '✓' : '•'}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Stepper for 6+ people */}
            {isMoreServings && (
              <div className="setup-more-stepper-box animate-fade-in">
                <span>Custom serving count:</span>
                <div className="stepper-controls">
                  <button 
                    type="button"
                    onClick={() => { sounds.playPeopleChange(servings - 1); setServings(Math.max(7, servings - 1)); }}
                  >
                    -
                  </button>
                  <span className="stepper-value">{servings} people</span>
                  <button 
                    type="button"
                    onClick={() => { sounds.playPeopleChange(servings + 1); setServings(servings + 1); }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 2. TIME AVAILABLE */}
          <section className="setup-section-card">
            <div className="setup-question-title">
              <div className="title-left">
                <span className="setup-step-num">2</span>
                <div>
                  <h3 className="setup-question-text">When should food be ready?</h3>
                  <p className="setup-question-hint">Recipes are strictly filtered to your available time.</p>
                </div>
              </div>
              <span className="setup-active-pill-preview">
                <Clock size={12} /> {timeLimit === 999 ? 'Any time' : `≤ ${timeLimit} mins`}
              </span>
            </div>

            <div className="setup-time-grid">
              {TIME_OPTIONS.map(opt => {
                const isSelected = timeLimit === opt.value;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    className={`setup-time-card ${isSelected ? 'active' : ''}`}
                    onClick={() => { sounds.playTimeChange(opt.value); setTimeLimit(opt.value); }}
                  >
                    <div className="card-top-indicator">
                      <span className="tick-box">{isSelected ? '✓' : ''}</span>
                    </div>
                    <span className="setup-time-val">{opt.label}</span>
                    <span className="setup-time-sub">{opt.tag}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 3. MEAL TYPE / VIBE */}
          <section className="setup-section-card">
            <div className="setup-question-title">
              <div className="title-left">
                <span className="setup-step-num">3</span>
                <div>
                  <h3 className="setup-question-text">What are you in the mood to make?</h3>
                  <p className="setup-question-hint">Select the course or meal vibe you prefer.</p>
                </div>
              </div>
              <span className="setup-active-pill-preview text-capitalize">
                {mealType}
              </span>
            </div>

            <div className="setup-meals-grid">
              {MEAL_CARDS.map(card => {
                const isSelected = mealType === card.id;
                const IconComponent = card.icon;
                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`setup-meal-card ${isSelected ? 'active' : ''}`}
                    onClick={() => { sounds.playMealTypeChange(card.id); setMealType(card.id); }}
                  >
                    <div className="meal-card-header-row">
                      <div className="meal-icon-wrap">
                        <IconComponent size={18} />
                      </div>
                      <span className="meal-tick">{isSelected ? '✓' : ''}</span>
                    </div>
                    <span className="setup-meal-label">{card.label}</span>
                    <span className="setup-meal-desc">{card.desc}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 4. DIET & ALLERGIES (OPTIONAL) */}
          <section className="setup-section-card optional-section">
            <div className="setup-question-title">
              <div className="title-left">
                <span className="setup-step-num neutral">4</span>
                <div>
                  <div className="optional-title-row">
                    <h3 className="setup-question-text">Diet & Allergies to Avoid</h3>
                    <span className="setup-optional-pill">Optional</span>
                  </div>
                  <p className="setup-question-hint">Tick anything you want to skip. Leave unselected to see all meals.</p>
                </div>
              </div>
              {activeAllergiesDisplay.length > 0 && (
                <span className="setup-active-pill-preview alert">
                  {activeAllergiesDisplay.length} excluded
                </span>
              )}
            </div>

            <div className="setup-allergies-grid">
              {ALLERGY_OPTIONS.map(opt => {
                const isSelected = opt.exclusive
                  ? (allergies.length === 0 || allergies.includes('none')) && !customAvoid
                  : allergies.includes(opt.id);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`setup-allergy-chip ${isSelected ? 'active' : ''} ${opt.exclusive ? 'none' : ''}`}
                    onClick={() => handleToggleAllergy(opt)}
                  >
                    <span className="allergy-check-icon">{isSelected ? '✓' : '+'}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}

              {/* Add custom ingredient button */}
              <button
                type="button"
                className={`setup-allergy-chip custom-trigger ${isOtherOpen ? 'active' : ''}`}
                onClick={() => {
                  sounds.playPop(400);
                  setIsOtherOpen(!isOtherOpen);
                }}
              >
                <span>{isOtherOpen ? '− Custom Avoidance' : '+ Custom Ingredient'}</span>
              </button>
            </div>

            {/* Custom avoidance input */}
            {isOtherOpen && (
              <div className="setup-custom-avoid-box animate-fade-in">
                <ShieldAlert size={16} className="text-amber" />
                <input
                  type="text"
                  className="custom-avoid-input"
                  placeholder="Type specific ingredient to strictly avoid (e.g. mushrooms, shellfish, cilantro)..."
                  value={customAvoid}
                  onChange={(e) => setCustomAvoid(e.target.value)}
                />
                {customAvoid && (
                  <button 
                    type="button" 
                    className="clear-avoid-btn"
                    onClick={() => setCustomAvoid('')}
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            )}
          </section>

        </div>

        {/* Modal Action Footer */}
        <div className="setup-action-footer">
          <div className="setup-current-summary-preview">
            <span className="summary-dot"></span>
            <span>Cooking for <strong>{servings} {servings === 1 ? 'person' : 'people'}</strong></span>
            <span className="summary-sep">•</span>
            <span>Ready in <strong>{timeLimit === 999 ? 'Any time' : `≤ ${timeLimit}m`}</strong></span>
            <span className="summary-sep">•</span>
            <span className="text-capitalize"><strong>{mealType}</strong></span>
            {activeAllergiesDisplay.length > 0 && (
              <>
                <span className="summary-sep">•</span>
                <span className="avoid-preview">Avoiding {activeAllergiesDisplay.join(', ')}</span>
              </>
            )}
          </div>

          <div className="footer-btns-group">
            <button
              type="button"
              className="skip-setup-btn"
              onClick={onClose}
              title="Close without changing"
            >
              Skip
            </button>
            <button
              type="button"
              className="show-meals-primary-btn glow-cta"
              onClick={handleConfirm}
            >
              <span>Save & Discover Recipes</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MealSetupModal;
