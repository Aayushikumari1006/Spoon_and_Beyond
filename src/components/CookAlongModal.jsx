import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Flame, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Sparkles,
  RotateCcw,
  Heart,
  Star,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RECIPE_FLOW_STEPS_MODE_2 } from '../data/recipes';
import { sounds } from '../utils/audio';

export function CookAlongModal({ 
  isOpen, 
  onClose, 
  activeRecipe = null, 
  activeSteps = null,
  onSaveRecipe = null 
}) {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [isSavedInCook, setIsSavedInCook] = useState(false);

  // Derive steps dynamically from active recipe or default
  const steps = (activeSteps && activeSteps.length > 0) 
    ? activeSteps 
    : (activeRecipe?.steps && activeRecipe.steps.length > 0)
      ? activeRecipe.steps.map((st, i) => ({
          id: i + 1,
          title: st.title || `Step ${i + 1}`,
          desc: st.description || st.desc || 'Follow the step instructions.',
          duration: st.time || '5 mins',
          image: activeRecipe.image || `/images/steps/${Math.min(i + 1, 6)}_boil_pasta.jpg`
        }))
      : RECIPE_FLOW_STEPS_MODE_2;

  const currentStep = steps[stepIdx] || steps[0];

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStepIdx(0);
      setIsCompleted(false);
      setIsPlaying(false);
      setTimerSeconds(180);
    }
  }, [isOpen]);

  // Voice narration helper using Web Speech API
  const speakInstruction = (text) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // SpeechSynthesis may be restricted or unsupported
    }
  };

  // Speak step when step changes
  useEffect(() => {
    if (isOpen && isVoiceEnabled && currentStep && !isCompleted) {
      speakInstruction(`${currentStep.title}. ${currentStep.desc}`);
    }
  }, [stepIdx, isOpen, isCompleted]);

  // Live Timer countdown
  useEffect(() => {
    let interval = null;
    if (isPlaying && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timerSeconds === 0) {
      setIsPlaying(false);
      sounds.playChime();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      speakInstruction("Timer finished! Ready for the next culinary step.");
    }
    return () => clearInterval(interval);
  }, [isPlaying, timerSeconds]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (stepIdx < steps.length - 1) {
      sounds.playPop(550);
      setStepIdx(stepIdx + 1);
      setTimerSeconds(240);
      setIsPlaying(false);
    } else {
      sounds.playChime();
      setIsCompleted(true);
      confetti({ 
        particleCount: 150, 
        spread: 100, 
        origin: { y: 0.5 },
        colors: ['#c026d3', '#ff3366', '#10b981', '#38bdf8', '#fbbf24']
      });
      speakInstruction("Congratulations! Look at what you made. Enjoy your delicious meal!");
    }
  };

  const handlePrev = () => {
    if (stepIdx > 0) {
      sounds.playPop(350);
      setStepIdx(stepIdx - 1);
      setTimerSeconds(180);
      setIsPlaying(false);
      setIsCompleted(false);
    }
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="cook-along-backdrop">
      <div className="cook-along-modal glass-panel-electric">
        {/* Modal Top Bar */}
        <div className="cook-along-header">
          <div className="cook-along-title-group">
            <Flame className="fire-icon-pulse" size={22} />
            <div>
              <h2>Cook-Along Mode</h2>
              <p>{activeRecipe?.title || 'Interactive Step-by-Step Cooking Assistant'}</p>
            </div>
          </div>

          <div className="cook-along-tools">
            <button 
              className={`voice-toggle-btn ${isVoiceEnabled ? 'active' : ''}`}
              onClick={() => {
                const nextState = !isVoiceEnabled;
                setIsVoiceEnabled(nextState);
                if (!nextState && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              title={isVoiceEnabled ? 'Voice Guidance Active (Click to Mute)' : 'Voice Muted (Click to Enable)'}
            >
              {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button className="cook-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        {isCompleted ? (
          /* Celebration Completion Screen */
          <div className="cook-completion-screen">
            <div className="completion-card glass-panel-electric">
              <PartyPopper size={54} className="completion-party-icon" />
              <h2>Look at what you made! ✨</h2>
              <p className="completion-recipe-title">
                {activeRecipe?.title || 'Your Dish Is Fresh & Delicious'}
              </p>
              <p className="completion-subtext">
                You followed every computational step and brought fresh ingredients together. Take a breath, plate beautifully, and savor every bite.
              </p>

              {/* Star Rating Experience */}
              <div className="completion-rating-group">
                <span>Rate your cooking experience:</span>
                <div className="completion-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`comp-star ${star <= userRating ? 'active' : ''}`}
                      onClick={() => {
                        sounds.playPop(500 + star * 30);
                        setUserRating(star);
                      }}
                    >
                      <Star size={22} fill={star <= userRating ? '#fbbf24' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="completion-actions-row">
                {onSaveRecipe && activeRecipe && (
                  <button 
                    type="button"
                    className={`completion-save-btn ${isSavedInCook ? 'saved' : ''}`}
                    onClick={() => {
                      sounds.playChime();
                      setIsSavedInCook(true);
                      onSaveRecipe(activeRecipe);
                    }}
                  >
                    <Heart size={16} fill={isSavedInCook ? '#ff3366' : 'none'} color={isSavedInCook ? '#ff3366' : '#ffffff'} />
                    <span>{isSavedInCook ? 'Saved to Favorites!' : 'Save to My Favorites'}</span>
                  </button>
                )}
                <button 
                  type="button"
                  className="completion-finish-btn"
                  onClick={onClose}
                >
                  <Sparkles size={16} />
                  <span>Enjoy &amp; Close</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cook-along-body">
            <div className="cook-image-column">
              <img 
                src={currentStep.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
                alt={currentStep.title} 
                className="cook-hero-image" 
              />
              <div className="cook-step-pill">
                <span>Step {stepIdx + 1} of {steps.length}</span>
              </div>
            </div>

            <div className="cook-instructions-column">
              <div className="cook-step-indicator">
                <h3>{currentStep.title}</h3>
                <span className="cook-step-duration">{currentStep.duration || '5 mins'}</span>
              </div>

              <p className="cook-step-desc">{currentStep.desc}</p>

              {/* Smart Voice Audio Coach bubble */}
              {isVoiceEnabled && (
                <div className="cook-coach-bubble">
                  <Sparkles size={16} className="coach-sparkle" />
                  <span>
                    <strong>Chef AI:</strong> Keep your heat balanced and follow the RecipeDB sequence for optimal texture and aroma extraction.
                  </span>
                </div>
              )}

              {/* Live Interactive Timer */}
              <div className="cook-timer-panel">
                <div className="timer-display-digits">{formatTimer(timerSeconds)}</div>
                <div className="timer-controls">
                  <button 
                    className={`timer-play-btn ${isPlaying ? 'paused' : 'running'}`}
                    onClick={() => { sounds.playPop(isPlaying ? 350 : 650); setIsPlaying(!isPlaying); }}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                    <span>{isPlaying ? 'Pause Timer' : 'Start Timer'}</span>
                  </button>
                  <button 
                    className="timer-reset-btn"
                    onClick={() => { sounds.playPop(300); setTimerSeconds(180); setIsPlaying(false); }}
                    title="Reset Timer"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        {!isCompleted && (
          <div className="cook-along-footer">
            <button 
              className="cook-nav-btn prev"
              onClick={handlePrev}
              disabled={stepIdx === 0}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <div className="cook-progress-dots">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`cook-dot ${i === stepIdx ? 'active' : ''} ${i < stepIdx ? 'done' : ''}`}
                  onClick={() => {
                    sounds.playPop(480);
                    setStepIdx(i);
                  }}
                  title={`Jump to step ${i + 1}`}
                />
              ))}
            </div>

            <button 
              className="cook-nav-btn next"
              onClick={handleNext}
            >
              <span>{stepIdx === steps.length - 1 ? 'Finish Dish' : 'Next Step'}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CookAlongModal;
