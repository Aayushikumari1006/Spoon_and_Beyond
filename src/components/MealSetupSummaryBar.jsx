import React from 'react';
import { Users, Clock, Utensils, ShieldAlert, Edit3, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export function MealSetupSummaryBar({ 
  mealSetup = {}, 
  onEditSetup,
  className = ''
}) {
  const {
    servings = 2,
    timeLimit = 30,
    mealType = 'dinner',
    dishType = 'main',
    allergies = [],
    customAvoid = ''
  } = mealSetup;

  const formattedTime = timeLimit === 999 ? 'Any time' : `≤ ${timeLimit}m`;
  const formattedMeal = mealType ? (mealType.charAt(0).toUpperCase() + mealType.slice(1)).replace('-', ' ') : 'Dinner';
  
  const formattedAllergies = [
    ...allergies.filter(a => a !== 'none'),
    ...(customAvoid ? [customAvoid] : [])
  ];

  return (
    <div 
      className={`meal-setup-summary-bar glass-panel-electric ${className}`}
      onClick={() => {
        sounds.playPop(480);
        if (onEditSetup) onEditSetup();
      }}
      title="Tap to change meal preferences (Serving size, time limit, meal type, allergies)"
    >
      <div className="summary-bar-badge">
        <Sparkles size={11} className="sparkle-gold" />
        <span>MEAL SETUP:</span>
      </div>

      <div className="summary-bar-pills">
        <span className="summary-pill">
          <Users size={11} />
          <span>{servings === 1 ? 'Just me (1)' : `For ${servings} people`}</span>
        </span>

        <span className="summary-dot">•</span>

        <span className="summary-pill">
          <Clock size={11} />
          <span>{formattedTime}</span>
        </span>

        <span className="summary-dot">•</span>

        <span className="summary-pill">
          <Utensils size={11} />
          <span>{formattedMeal}</span>
        </span>

        {formattedAllergies.length > 0 && (
          <>
            <span className="summary-dot">•</span>
            <span className="summary-pill allergy-warning-pill">
              <ShieldAlert size={11} />
              <span>Avoid: {formattedAllergies.slice(0, 2).join(', ')}{formattedAllergies.length > 2 ? ` +${formattedAllergies.length - 2}` : ''}</span>
            </span>
          </>
        )}
      </div>

      <button 
        type="button" 
        className="summary-edit-cta"
        onClick={(e) => {
          e.stopPropagation();
          sounds.playPop(480);
          if (onEditSetup) onEditSetup();
        }}
      >
        <Edit3 size={12} />
        <span>Change</span>
      </button>
    </div>
  );
}

export default MealSetupSummaryBar;
