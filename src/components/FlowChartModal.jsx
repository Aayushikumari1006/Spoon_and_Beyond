import React, { useState, useMemo } from 'react';
import { 
  X, 
  Workflow, 
  Clock, 
  Flame, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  ChefHat, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  CheckCircle2, 
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Lightbulb
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ALL_PANTRY_INGREDIENTS, 
  INGREDIENT_QUALITY_SPECS,
  GENUINE_DATABASE_SUBSTITUTES 
} from '../data/recipes';

export function FlowChartModal({ 
  isOpen, 
  onClose, 
  recipe, 
  selectedIds = [],
  feedback,
  onOpenCookAlong 
}) {
  const [selectedNodeId, setSelectedNodeId] = useState(1);
  const [completedStages, setCompletedStages] = useState([1]);
  const [activeTimerNode, setActiveTimerNode] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [filterPhase, setFilterPhase] = useState('all'); // 'all' | 'prep' | 'cook' | 'finish'
  const [zoomLevel, setZoomLevel] = useState(1);

  // Compute 100% Dynamic Stages STRICTLY from the active recipe steps and selected ingredients!
  const FLOW_STAGES = useMemo(() => {
    if (!recipe || !recipe.steps || recipe.steps.length === 0) {
      return [
        {
          id: 1,
          phase: 'prep',
          phaseName: 'Phase 1: Mise en Place',
          title: 'Ingredient Preparation',
          shortTitle: '1. Prep & Chop',
          duration: '5 mins',
          heat: 'Room Temp',
          technique: 'Knife Work & Measure',
          equipment: 'Chef Knife, Prep Bowls',
          image: '/images/steps/2_sizzle_garlic.jpg',
          ingredients: [
            { 
              name: 'Garlic', 
              quantity: '4 plump cloves',
              quality: 'Peeled & sliced paper-thin', 
              image: '/images/ingredients/garlic.jpg',
              isOnBoard: true
            },
            { 
              name: 'Tomatoes', 
              quantity: '2 large vine-ripened',
              quality: 'Seeded & finely diced into 1/4-inch cubes', 
              image: '/images/ingredients/roma_tomatoes.jpg',
              isOnBoard: true
            }
          ],
          desc: 'Prepare all produce uniformly so cooking heat distributes evenly.',
          tip: 'Uniform knife cuts guarantee consistent texture throughout the dish.'
        }
      ];
    }

    const allPantry = ALL_PANTRY_INGREDIENTS;
    const totalSteps = recipe.steps.length;

    return recipe.steps.map((st, idx) => {
      const stepNum = st.step || idx + 1;
      let phase = 'cook';
      let phaseName = `Phase ${stepNum}: Thermal Cooking`;
      if (idx === 0) {
        phase = 'prep';
        phaseName = `Phase 1: Mise en Place & Prep`;
      } else if (idx === totalSteps - 1) {
        phase = 'finish';
        phaseName = `Phase ${stepNum}: Plating & Presentation`;
      } else if (idx === 1) {
        phaseName = `Phase 2: Aromatics & Sizzle`;
      } else if (idx === 2) {
        phaseName = `Phase 3: Core Cooking & Reduction`;
      } else if (idx === 3) {
        phaseName = `Phase 4: Glazing & Emulsion`;
      }

      // Match actual ingredients mentioned in this step description and title
      const combinedText = `${(st.description || '').toLowerCase()} ${(st.title || '').toLowerCase()}`;

      let matchedIngredients = allPantry.filter(p => {
        const pName = p.name.toLowerCase();
        const pId = p.id.toLowerCase().replace('_', ' ');
        return combinedText.includes(pName) || combinedText.includes(pId) || 
               (p.id === 'tomatoes' && combinedText.includes('tomato')) ||
               (p.id === 'garlic' && combinedText.includes('garlic')) ||
               (p.id === 'onions' && (combinedText.includes('onion') || combinedText.includes('shallot'))) ||
               (p.id === 'pasta' && (combinedText.includes('pasta') || combinedText.includes('penne') || combinedText.includes('fettuccine') || combinedText.includes('spaghetti'))) ||
               (p.id === 'olive_oil' && combinedText.includes('olive oil')) ||
               (p.id === 'heavy_cream' && (combinedText.includes('cream') || combinedText.includes('cashew') || combinedText.includes('yogurt'))) ||
               (p.id === 'parmesan' && (combinedText.includes('parmesan') || combinedText.includes('cheese') || combinedText.includes('yeast'))) ||
               (p.id === 'chicken' && combinedText.includes('chicken')) ||
               (p.id === 'salmon' && combinedText.includes('salmon')) ||
               (p.id === 'shrimp' && combinedText.includes('shrimp')) ||
               (p.id === 'tofu' && combinedText.includes('tofu')) ||
               (p.id === 'mushrooms' && combinedText.includes('mushroom')) ||
               (p.id === 'gnocchi' && combinedText.includes('gnocchi')) ||
               (p.id === 'avocado' && combinedText.includes('avocado')) ||
               (p.id === 'broccoli' && combinedText.includes('broccoli')) ||
               (p.id === 'spinach' && combinedText.includes('spinach')) ||
               (p.id === 'eggplant' && combinedText.includes('eggplant')) ||
               (p.id === 'bell_peppers' && (combinedText.includes('pepper') || combinedText.includes('bell pepper'))) ||
               (p.id === 'basil' && combinedText.includes('basil')) ||
               (p.id === 'lemon' && combinedText.includes('lemon')) ||
               (p.id === 'butter' && combinedText.includes('butter'));
      }).map(p => {
        const spec = INGREDIENT_QUALITY_SPECS[p.id] || {
          quantity: 'Portioned to recipe',
          quality: 'Kitchen-fresh grade, uniform prep',
          prep: 'Standard culinary preparation',
          culinaryRole: 'Core aromatic & texture component',
          subCategory: p.id
        };
        const subKey = spec.subCategory || (p.id.includes('onion') ? 'onions' : p.id);
        const topSub = (GENUINE_DATABASE_SUBSTITUTES[subKey] || [])[0];
        return {
          id: p.id,
          name: p.name,
          quantity: spec.quantity,
          quality: spec.quality,
          prep: spec.prep,
          culinaryRole: spec.culinaryRole,
          image: p.image,
          isOnBoard: selectedIds.includes(p.id),
          topSub
        };
      });

      // Fallback: If no ingredient matched in text, take from recipe required ingredients
      if (matchedIngredients.length === 0) {
        matchedIngredients = (recipe.requiredIngredients || ['garlic', 'tomatoes', 'olive_oil']).slice(0, 3).map(id => {
          const match = allPantry.find(p => p.id === id);
          const spec = INGREDIENT_QUALITY_SPECS[id] || {
            quantity: 'Portioned to recipe',
            quality: 'High grade, fresh preparation',
            prep: 'Mise en place cut',
            culinaryRole: 'Essential dish foundation',
            subCategory: id
          };
          const subKey = spec.subCategory || (id.includes('onion') ? 'onions' : id);
          const topSub = (GENUINE_DATABASE_SUBSTITUTES[subKey] || [])[0];
          return {
            id,
            name: match ? match.name : id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            quantity: spec.quantity,
            quality: spec.quality,
            prep: spec.prep,
            culinaryRole: spec.culinaryRole,
            image: match ? match.image : '/images/ingredients/garlic.jpg',
            isOnBoard: selectedIds.includes(id),
            topSub
          };
        });
      }

      // Dynamic technique and equipment suited to this step
      let heat = 'Medium Heat (160°C)';
      let technique = 'Chef Pan Sauté';
      let equipment = 'Heavy-bottom Skillet or Sauté Pan';
      let tip = 'Keep heat steady to allow sugars and volatile oils to harmonize smoothly.';

      if (phase === 'prep') {
        heat = 'Room Temp';
        technique = 'Precision Knife Cut & Measure';
        equipment = 'Chef Knife, Cutting Board, Prep Bowls';
        tip = 'Uniform cuts ensure identical heat absorption and even texture throughout the dish.';
      } else if (combinedText.includes('boil')) {
        heat = 'Rolling Boil (100°C)';
        technique = 'Osmotic Salting & Starch Gelatinization';
        equipment = 'Deep Stockpot, Colander, Measuring Ladle';
        tip = 'Heavily salt the boiling water—it seasons the grains from the inside out.';
      } else if (combinedText.includes('sear') || combinedText.includes('fry') || combinedText.includes('crisp')) {
        heat = 'High Heat Sizzle (185°C)';
        technique = 'Maillard Reaction & Crisp Sear';
        equipment = 'Cast Iron or Stainless Steel Skillet, Metal Tongs';
        tip = 'Do not overcrowd the pan; high surface heat ensures a crisp golden crust rather than steaming.';
      } else if (combinedText.includes('simmer') || combinedText.includes('reduction')) {
        heat = 'Gentle Simmer (90°C)';
        technique = 'Aroma Reduction & Viscosity Thickening';
        equipment = 'Sauté Pan, Wooden Spoon';
        tip = 'Low, slow simmering concentrates natural umami and deepens flavor complexities.';
      } else if (phase === 'finish' || combinedText.includes('plate') || combinedText.includes('garnish')) {
        heat = 'Warm Serving Temp';
        technique = 'Artisanal Plating & Herbal Finish';
        equipment = 'Warmed Ceramic Dinnerware, Microplane';
        tip = 'Add fresh herbs at the final second off the flame to preserve delicate volatile aromas.';
      }

      return {
        id: stepNum,
        phase,
        phaseName,
        title: st.title,
        shortTitle: `${stepNum}. ${st.title.split(' ').slice(0, 2).join(' ')}`,
        duration: st.time || '5 mins',
        heat,
        technique,
        equipment,
        image: st.image || recipe.image || '/images/dishes/creamy_garlic_pasta.jpg',
        ingredients: matchedIngredients,
        desc: st.description,
        tip
      };
    });
  }, [recipe]);

  if (!isOpen) return null;

  const currentRecipe = recipe || {
    title: 'RecipeDB Culinary Creation',
    subtitle: 'RecipeDB Culinary Cooking Pipeline',
    time: '30 mins',
    people: 2,
    difficulty: 'Medium'
  };

  const filteredStages = FLOW_STAGES.filter(stage => {
    if (filterPhase === 'all') return true;
    return stage.phase === filterPhase;
  });

  const activeStageIndex = FLOW_STAGES.findIndex(s => s.id === selectedNodeId);
  const currentIndex = activeStageIndex >= 0 ? activeStageIndex : 0;
  const activeNode = FLOW_STAGES[currentIndex] || FLOW_STAGES[0];

  // Dynamic % completion based on active step progression and completed stages
  const activePercentComplete = Math.max(
    Math.round(((currentIndex + 1) / FLOW_STAGES.length) * 100),
    Math.round((completedStages.length / FLOW_STAGES.length) * 100)
  );

  const handleNextStage = () => {
    if (currentIndex < FLOW_STAGES.length - 1) {
      sounds.playStepNext();
      const nextStage = FLOW_STAGES[currentIndex + 1];
      setSelectedNodeId(nextStage.id);
      // Auto-mark active node completed as user advances
      setCompletedStages(prev => Array.from(new Set([...prev, activeNode.id])));
    } else {
      sounds.playChime();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
      setCompletedStages(FLOW_STAGES.map(s => s.id));
    }
  };

  const handlePrevStage = () => {
    if (currentIndex > 0) {
      sounds.playPop(480);
      const prevStage = FLOW_STAGES[currentIndex - 1];
      setSelectedNodeId(prevStage.id);
    }
  };

  const toggleStageCompleted = (id) => {
    sounds.playPop(520);
    setCompletedStages(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        const next = [...prev, id];
        if (next.length === FLOW_STAGES.length) {
          sounds.playChime();
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        }
        return next;
      }
    });
  };

  const handleSelectNode = (id) => {
    sounds.playPop(460);
    setSelectedNodeId(id);
  };

  return (
    <div className="flowchart-modal-backdrop" onClick={onClose}>
      <div 
        className="flowchart-modal-window glass-panel-electric" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flowchart-modal-header">
          <div className="flowchart-title-group">
            <div className="flowchart-icon-ring">
              <Workflow size={22} className="flow-sparkle-icon" />
            </div>
            <div>
              <div className="flowchart-super-badge">
                <Sparkles size={11} />
                <span>RecipeDB Interactive Cooking Pipeline</span>
              </div>
              <h2 className="flowchart-main-title">{currentRecipe.title}</h2>
              <p className="flowchart-subtitle">
                Formulated for your selected ingredients • {currentRecipe.time || '25 mins'} • {currentRecipe.difficulty || 'Easy'}
              </p>
            </div>
          </div>

          <div className="flowchart-header-actions">
            <div className="progress-pill-badge active-pipeline">
              <span className="live-dot-pulse"></span>
              <span>Step {currentIndex + 1} of {FLOW_STAGES.length} • {activePercentComplete}% Complete</span>
            </div>

            <button 
              type="button" 
              className="flowchart-cook-btn glow-btn"
              onClick={() => {
                onClose();
                if (onOpenCookAlong) onOpenCookAlong();
              }}
            >
              <Flame size={15} />
              <span>Start Cook-Along</span>
            </button>

            <button 
              type="button" 
              className="flowchart-close-btn" 
              onClick={onClose}
              title="Close Diagram"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter & Zoom Toolbar */}
        <div className="flowchart-toolbar">
          <div className="filter-chips-row">
            <span className="toolbar-label">Filter Stages:</span>
            <button 
              type="button" 
              className={`filter-chip-btn ${filterPhase === 'all' ? 'active' : ''}`}
              onClick={() => setFilterPhase('all')}
            >
              All Stages ({FLOW_STAGES.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip-btn ${filterPhase === 'prep' ? 'active' : ''}`}
              onClick={() => setFilterPhase('prep')}
            >
              Mise en Place
            </button>
            <button 
              type="button" 
              className={`filter-chip-btn ${filterPhase === 'cook' ? 'active' : ''}`}
              onClick={() => setFilterPhase('cook')}
            >
              Cooking & Emulsion
            </button>
            <button 
              type="button" 
              className={`filter-chip-btn ${filterPhase === 'finish' ? 'active' : ''}`}
              onClick={() => setFilterPhase('finish')}
            >
              Plating & Garnish
            </button>
          </div>

          <div className="zoom-controls-row">
            <button 
              type="button" 
              className="zoom-btn"
              onClick={() => setZoomLevel(Math.max(0.85, zoomLevel - 0.1))}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="zoom-indicator">{Math.round(zoomLevel * 100)}%</span>
            <button 
              type="button" 
              className="zoom-btn"
              onClick={() => setZoomLevel(Math.min(1.25, zoomLevel + 0.1))}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>

        {/* Interactive Diagram Pipeline Canvas */}
        <div className="flowchart-diagram-canvas" style={{ transform: `scale(${zoomLevel})` }}>
          <div className="pipeline-nodes-track">
            {filteredStages.map((stage, idx) => {
              const isSelected = stage.id === selectedNodeId;
              const isCompleted = completedStages.includes(stage.id);

              return (
                <React.Fragment key={stage.id}>
                  {/* Stage Node Box */}
                  <div 
                    className={`flow-node-card ${isSelected ? 'selected active-step' : ''} ${isCompleted ? 'completed' : ''}`}
                    onClick={() => handleSelectNode(stage.id)}
                  >
                    <div className="node-top-bar">
                      <span className="node-phase-tag">{stage.phaseName}</span>
                      {isSelected && (
                        <span className="node-active-pulse-badge">
                          <span className="live-dot-pulse"></span> Active
                        </span>
                      )}
                      <button 
                        type="button" 
                        className={`node-check-circle ${isCompleted ? 'checked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStageCompleted(stage.id);
                        }}
                        title={isCompleted ? 'Stage marked complete' : 'Mark stage complete'}
                      >
                        {isCompleted && <Check size={11} strokeWidth={3} />}
                      </button>
                    </div>

                    <div className="node-card-content-with-thumb">
                      <div className="node-thumb-wrapper">
                        <img 
                          src={stage.image || '/images/steps/1_boil_pasta.jpg'} 
                          alt={stage.shortTitle} 
                          className="node-thumb-photo" 
                          onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
                        />
                      </div>
                      <div className="node-titles-block">
                        <h4 className="node-title">{stage.shortTitle}</h4>
                        <p className="node-technique-snippet">{stage.technique}</p>
                      </div>
                    </div>

                    <div className="node-meta-row">
                      <span className="node-meta-tag"><Clock size={11} /> {stage.duration}</span>
                      <span className="node-meta-tag"><Flame size={11} /> {stage.heat.split(' ')[0]}</span>
                    </div>

                    <div className="node-active-glow"></div>
                  </div>

                  {/* Connecting Arrow Pipeline between nodes */}
                  {idx < filteredStages.length - 1 && (
                    <div className={`pipeline-connector-line ${isCompleted ? 'completed-flow' : ''}`}>
                      <div className="pulse-arrow-dot"></div>
                      <ChevronRight size={18} className="pipeline-arrow-icon" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Dynamic Pipeline Progression & Prev/Next Controller Bar */}
        <div className="flowchart-stepper-bar">
          <div className="stepper-progress-block">
            <div className="stepper-info-line">
              <div className="stepper-stage-title-wrap">
                <span className="stepper-current-pill">Step {currentIndex + 1} of {FLOW_STAGES.length}</span>
                <span className="stepper-stage-title">{activeNode.shortTitle}</span>
              </div>
              <div className="stepper-percentage-wrap">
                <span className="stepper-pct-number">{activePercentComplete}%</span>
                <span className="stepper-pct-label">Cooking Progress</span>
              </div>
            </div>

            {/* Animated Glowing Progress Bar */}
            <div className="stepper-progress-track">
              <div 
                className="stepper-progress-fill" 
                style={{ width: `${activePercentComplete}%` }}
              >
                <div className="stepper-progress-glow-head"></div>
              </div>
            </div>
          </div>

          {/* Interactive Prev & Next Action Buttons */}
          <div className="stepper-nav-actions">
            <button 
              type="button"
              className="flow-stepper-btn prev"
              onClick={handlePrevStage}
              disabled={currentIndex === 0}
              title="Go to previous culinary stage"
            >
              <ChevronLeft size={16} />
              <span>Previous Step</span>
            </button>

            {/* Step Indicator Dots with 1-click stage jump */}
            <div className="flow-stepper-dots">
              {FLOW_STAGES.map((stg, i) => {
                const isDone = completedStages.includes(stg.id) || i < currentIndex;
                const isCurrent = i === currentIndex;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    className={`flow-step-dot ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}`}
                    onClick={() => {
                      sounds.playStepNext();
                      setSelectedNodeId(stg.id);
                    }}
                    title={`Jump to Stage ${i + 1}: ${stg.shortTitle}`}
                  >
                    {isDone && !isCurrent ? <Check size={10} strokeWidth={3} /> : i + 1}
                  </button>
                );
              })}
            </div>

            <button 
              type="button"
              className={`flow-stepper-btn next ${currentIndex === FLOW_STAGES.length - 1 ? 'finish' : 'primary-glow'}`}
              onClick={handleNextStage}
              title={currentIndex === FLOW_STAGES.length - 1 ? 'Finish & Celebrate Dish!' : 'Proceed to next culinary stage'}
            >
              <span>{currentIndex === FLOW_STAGES.length - 1 ? '🎉 Finish Dish' : 'Next Step'}</span>
              {currentIndex < FLOW_STAGES.length - 1 && <ChevronRight size={16} />}
            </button>
          </div>
        </div>

        {/* Selected Stage Detail Inspector */}
        <div className="flowchart-node-inspector">
          <div className="inspector-header">
            <div className="inspector-left-title">
              <span className="inspector-stage-tag">{activeNode.phaseName}</span>
              <h3>{activeNode.title}</h3>
            </div>

            <div className="inspector-specs-bar">
              <div className="spec-item">
                <span className="spec-label">Duration</span>
                <span className="spec-value">{activeNode.duration}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Target Heat</span>
                <span className="spec-value">{activeNode.heat}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Culinary Technique</span>
                <span className="spec-value">{activeNode.technique}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Equipment</span>
                <span className="spec-value">{activeNode.equipment}</span>
              </div>
            </div>
          </div>

          <div className="inspector-body-grid">
            <div className="inspector-instructions-pane">
              {/* Stage Hero Photo Banner */}
              <div className="inspector-stage-banner-box">
                <img 
                  src={activeNode.image || '/images/steps/1_boil_pasta.jpg'} 
                  alt={activeNode.title} 
                  className="inspector-stage-hero-img"
                  onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
                />
                <div className="inspector-banner-overlay">
                  <span className="stage-banner-phase-badge">{activeNode.shortTitle}</span>
                  <span className="stage-banner-technique">{activeNode.technique}</span>
                </div>
              </div>

              <h4>Chef Action & Chemical Transformation</h4>
              <p className="inspector-desc">{activeNode.desc}</p>
              
              <div className="inspector-pro-tip">
                <Sparkles size={14} className="sparkle-gold" />
                <div>
                  <strong>Culinary Science Secret:</strong>
                  <p>{activeNode.tip}</p>
                </div>
              </div>

              {feedback && (
                <div className="inspector-feedback-memory-tip">
                  <Lightbulb size={14} className="sparkle-gold" />
                  <div>
                    <strong>Your Taste Memory Adaptation:</strong>
                    <p>"{feedback.note}" — <em>{feedback.recommendation}</em></p>
                  </div>
                </div>
              )}
            </div>

            <div className="inspector-ingredients-pane">
              <div className="pane-header-with-count">
                <h4>Stage Inputs & Ingredients</h4>
                <span className="ing-count-pill">{activeNode.ingredients?.length || 0} items</span>
              </div>
              
              <div className="stage-ingredients-list">
                {activeNode.ingredients.map((ing, i) => (
                  <div key={i} className={`stage-ing-item-rich ${ing.isOnBoard ? 'in-pantry' : 'missing'}`}>
                    <div className="stage-ing-main-row">
                      <div className="stage-ing-thumb-box">
                        <img 
                          src={ing.image || '/images/ingredients/garlic.jpg'} 
                          alt={ing.name} 
                          className="stage-ing-thumb-photo"
                          onError={(e) => { e.currentTarget.src = '/images/ingredients/garlic.jpg'; }}
                        />
                      </div>
                      <div className="stage-ing-text-block">
                        <div className="stage-ing-header-line">
                          <span className="stage-ing-name">{ing.name}</span>
                          {ing.isOnBoard ? (
                            <span className="stage-ing-status in-pantry">✓ In Pantry</span>
                          ) : (
                            <span className="stage-ing-status missing">⚠️ Missing from Pantry</span>
                          )}
                        </div>
                        <div className="stage-ing-quality-line">
                          <strong>{ing.quantity}</strong> • <span>{ing.quality}</span>
                        </div>
                        {ing.prep && <p className="stage-ing-prep-hint">{ing.prep}</p>}
                      </div>
                    </div>

                    {/* Catchy Smart Substitute Box inside Flowchart */}
                    {ing.topSub && (
                      <div className={`stage-ing-substitute-pill ${!ing.isOnBoard ? 'alert-missing' : ''}`}>
                        <div className="stage-sub-header">
                          <span className="stage-sub-badge">
                            {!ing.isOnBoard ? '✨ Smart Missing Swap:' : '⇄ Culinary Swap:'}
                          </span>
                          <span className="stage-sub-match">{ing.topSub.match}</span>
                        </div>
                        <div className="stage-sub-body">
                          <span className="stage-sub-name">{ing.topSub.name} ({ing.topSub.ratio})</span>
                          <p className="stage-sub-desc">{ing.topSub.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowChartModal;
