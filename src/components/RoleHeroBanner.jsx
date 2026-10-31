import React, { useState } from 'react';
import { 
  Sparkles, 
  UtensilsCrossed, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Clock, 
  Users, 
  CheckCircle2 
} from 'lucide-react';
import { sounds } from '../utils/audio';

export function RoleHeroBanner({ 
  activeRole = 'Everyday Home Cook',
  onFindDelicious,
  onUseWhatIHave,
  onSurpriseMe
}) {
  const [isMinimized, setIsMinimized] = useState(true);

  // Role metadata mapped from PRD Section 7
  const ROLE_CONFIGS = {
    'Everyday Home Cook': {
      headline: 'Good Food, Made Easier.',
      subtext: 'Tell us what’s in your kitchen. We’ll help you discover what to cook, what you can swap, and how to turn everyday ingredients into something delicious.',
      badge: 'Home Cook Mode',
      tip: 'Prioritizing quick weeknight meals and smart pantry swaps.'
    },
    'Beginner Cook': {
      headline: 'Let’s Make Something Delicious, One Step at a Time.',
      subtext: 'No complicated culinary jargon. Simple measurements, foolproof preparation checklists, and friendly step-by-step guidance.',
      badge: 'Beginner Friendly',
      tip: 'Step-by-step timers and beginner-friendly recipe instructions are enabled.'
    },
    'Creative Cook': {
      headline: 'Your Kitchen. Your Creativity. Endless Possibilities.',
      subtext: 'Experiment with bold flavor pairings, innovative ingredient substitutions, and alternative culinary techniques.',
      badge: 'Culinary Lab Mode',
      tip: 'Unlocking alternative recipe flavor pairings and culinary notes.'
    },
    'Party Host': {
      headline: 'Make Every Gathering Delicious.',
      subtext: 'Scale recipes effortlessly for your guest list, coordinate batch cooking, and consolidate your grocery shopping list.',
      badge: 'Gathering & Batch Mode',
      tip: 'Serving steppers and batch ingredient scaling are highlighted.'
    }
  };

  const currentConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS['Everyday Home Cook'];

  return (
    <div className={`role-hero-banner glass-panel-electric ${isMinimized ? 'minimized' : ''}`}>
      <div className="role-hero-inner">
        <div className="role-hero-text">
          <div className="role-badge-row">
            <span className="role-pill-badge">
              <Sparkles size={12} />
              <span>{currentConfig.badge}</span>
            </span>
            <span className="role-tip-snippet">{currentConfig.tip}</span>
          </div>

          {!isMinimized && (
            <>
              <h1 className="role-headline">{currentConfig.headline}</h1>
              <p className="role-subtext">{currentConfig.subtext}</p>
            </>
          )}
        </div>

        {/* 3 Prominent Consolidated Actions */}
        <div className="role-actions-group">
          <button 
            type="button"
            className="hero-action-btn primary glow-btn"
            onClick={() => {
              sounds.playPop(520);
              if (onUseWhatIHave) onUseWhatIHave();
            }}
            title="Start with what you have in your kitchen"
          >
            <UtensilsCrossed size={16} />
            <span>What’s in My Kitchen? →</span>
          </button>

          <button 
            type="button"
            className="hero-action-btn secondary"
            onClick={() => {
              sounds.playPop(480);
              if (onFindDelicious) onFindDelicious();
            }}
            title="Explore delicious recipes on RecipeDB"
          >
            <Compass size={15} />
            <span>Find Delicious</span>
          </button>

          <button 
            type="button"
            className="hero-action-btn surprise"
            onClick={() => {
              sounds.playChime();
              if (onSurpriseMe) onSurpriseMe();
            }}
            title="Surprise me with a verified dish"
          >
            <Sparkles size={15} className="sparkle-gold" />
            <span>Surprise Me!</span>
          </button>

          <button 
            type="button"
            className="hero-minimize-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Expand overview' : 'Minimize overview'}
          >
            {isMinimized ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleHeroBanner;
