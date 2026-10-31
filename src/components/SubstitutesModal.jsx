import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ChefHat, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/audio';
import { 
  ALL_PANTRY_INGREDIENTS, 
  INGREDIENT_QUALITY_SPECS, 
  GENUINE_DATABASE_SUBSTITUTES 
} from '../data/recipes';

export function SubstitutesModal({
  isOpen,
  onClose,
  recipe,
  selectedIds = [],
  onApplySubstitute,
  onRemoveSubstitute,
  activeSubstitutes = {}
}) {
  const [appliedSubs, setAppliedSubs] = useState(activeSubstitutes);
  const [filterMissingOnly, setFilterMissingOnly] = useState(false);

  useEffect(() => {
    setAppliedSubs(activeSubstitutes);
  }, [activeSubstitutes]);

  if (!isOpen) return null;

  // Dynamic ingredients for the active recipe
  const requiredIds = recipe?.requiredIngredients || ['garlic', 'tomatoes', 'pasta', 'olive_oil', 'basil'];

  const ingredientsList = requiredIds.map(reqId => {
    const pantryMatch = ALL_PANTRY_INGREDIENTS.find(p => p.id === reqId) || {
      id: reqId,
      name: reqId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      image: '/images/ingredients/garlic.jpg',
      fallback: '/images/ingredients/garlic.jpg'
    };

    const spec = INGREDIENT_QUALITY_SPECS[reqId] || {
      quantity: 'Freshly portioned',
      quality: 'Grade A fresh produce, prepared uniformly',
      prep: 'Even knife work for optimal heat conductivity',
      culinaryRole: 'Harmonious base flavor component',
      subCategory: reqId
    };

    const isOnBoard = selectedIds.includes(reqId);
    let subCategory = spec.subCategory || reqId;
    if (reqId.includes('onion') || reqId === 'shallot') subCategory = 'onions';
    else if (reqId.includes('garlic')) subCategory = 'garlic';
    else if (reqId.includes('tomato')) subCategory = 'tomatoes';
    else if (reqId.includes('cream')) subCategory = 'heavy_cream';
    else if (reqId.includes('cheese') || reqId.includes('parmesan')) subCategory = 'cheese';
    else if (reqId.includes('oil')) subCategory = 'olive_oil';
    else if (reqId.includes('pasta') || reqId.includes('penne') || reqId.includes('spaghetti')) subCategory = 'pasta';
    else if (reqId.includes('basil')) subCategory = 'fresh_basil';
    else if (['chicken', 'salmon', 'shrimp', 'beef', 'pork'].includes(reqId)) subCategory = 'proteins';

    const subOptions = GENUINE_DATABASE_SUBSTITUTES[subCategory] || [];
    const isSubActive = !!appliedSubs[subCategory];

    return {
      reqId,
      pantryMatch,
      spec,
      isOnBoard,
      subCategory,
      subOptions,
      isSubActive
    };
  });

  const displayedList = filterMissingOnly 
    ? ingredientsList.filter(item => !item.isOnBoard)
    : ingredientsList;

  const missingCount = ingredientsList.filter(item => !item.isOnBoard).length;

  const handleToggle = (subCategory, sub) => {
    const isCurrentlyApplied = appliedSubs[subCategory]?.id === sub.id || appliedSubs[subCategory]?.name === sub.name;

    if (isCurrentlyApplied) {
      sounds.playSubstituteRevert();
      setAppliedSubs(prev => {
        const next = { ...prev };
        delete next[subCategory];
        return next;
      });
      if (onRemoveSubstitute) {
        onRemoveSubstitute(subCategory);
      }
    } else {
      sounds.playSubstituteSwap();
      setAppliedSubs(prev => ({
        ...prev,
        [subCategory]: sub
      }));
      if (onApplySubstitute) {
        onApplySubstitute(subCategory, sub);
      }
    }
  };

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="substitutes-modal-box glass-panel-electric" onClick={e => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        {/* Modal Header */}
        <div className="picker-modal-header">
          <div className="header-left-title">
            <div className="picker-icon-badge sub-badge-purple">
              <ChefHat size={18} className="sparkle-gold" />
            </div>
            <div>
              <h3>INGREDIENTS SUBSTITUTES</h3>
              <p>Dynamic culinary specifications and smart substitutes for <strong>{recipe?.title || 'your recipe'}</strong></p>
            </div>
          </div>
          <button className="picker-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        {/* Dynamic Recipe Overview Banner */}
        <div className="sub-recipe-overview-banner" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '10px 14px',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={recipe?.image || '/images/dishes/creamy_garlic_pasta.jpg'} 
              alt={recipe?.title} 
              style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.src = '/images/dishes/creamy_garlic_pasta.jpg'; }}
            />
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', margin: 0 }}>{recipe?.title}</h4>
              <span style={{ fontSize: '11px', color: '#7acbfa' }}>{recipe?.subtitle?.split('•')[0] || 'RecipeDB Verified'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setFilterMissingOnly(false)}
              style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '9999px',
                cursor: 'pointer',
                background: !filterMissingOnly ? 'rgba(22, 138, 173, 0.6)' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid ' + (!filterMissingOnly ? '#7acbfa' : 'rgba(255, 255, 255, 0.15)'),
                color: '#ffffff'
              }}
            >
              All Ingredients ({ingredientsList.length})
            </button>
            {missingCount > 0 && (
              <button
                type="button"
                onClick={() => setFilterMissingOnly(true)}
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  background: filterMissingOnly ? 'rgba(255, 200, 87, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid ' + (filterMissingOnly ? '#ffd166' : 'rgba(255, 255, 255, 0.15)'),
                  color: '#ffd166',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <AlertCircle size={12} />
                <span>Missing from Board ({missingCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Ingredients & Smart Substitutes List */}
        <div className="dynamic-substitutes-modal-list" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxHeight: '60vh',
          overflowY: 'auto',
          paddingRight: '4px'
        }}>
          {displayedList.map(({ reqId, pantryMatch, spec, isOnBoard, subCategory, subOptions, isSubActive }) => {
            const topSub = subOptions[0];
            const activeSub = appliedSubs[subCategory];

            return (
              <div 
                key={reqId} 
                style={{
                  background: 'rgba(20, 32, 52, 0.75)',
                  border: '1px solid ' + (isOnBoard ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 200, 87, 0.4)'),
                  borderRadius: '14px',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                {/* Ingredient Core Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={pantryMatch.image} 
                    alt={pantryMatch.name} 
                    style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0, border: '1.5px solid rgba(255, 255, 255, 0.2)' }}
                    onError={(e) => { e.currentTarget.src = pantryMatch.fallback || '/images/ingredients/garlic.jpg'; }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>{pantryMatch.name}</span>
                      {isOnBoard ? (
                        <span style={{ fontSize: '10px', fontWeight: '800', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.6)', color: '#4ade80', padding: '2px 8px', borderRadius: '9999px' }}>
                          ✓ On Your Board
                        </span>
                      ) : (
                        <span style={{ fontSize: '10px', fontWeight: '800', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.6)', color: '#fbbf24', padding: '2px 8px', borderRadius: '9999px' }}>
                          ⚠️ Missing from Board
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                      <strong style={{ color: '#ffd166' }}>{spec.quantity}</strong> • <span>{spec.quality}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: '3px 0 0' }}>{spec.culinaryRole}</p>
                  </div>
                </div>

                {/* Smart Substitutes for this Ingredient */}
                {subOptions.length > 0 && (
                  <div style={{
                    background: !isOnBoard ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid ' + (!isOnBoard ? 'rgba(245, 158, 11, 0.35)' : 'rgba(255, 255, 255, 0.08)'),
                    borderRadius: '10px',
                    padding: '8px 12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: !isOnBoard ? '#ffd166' : '#7acbfa', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                        {!isOnBoard ? '✨ Smart Missing Swap:' : '⇄ Verified Culinary Alternative:'}
                      </span>
                      {topSub.badge && (
                        <span style={{ fontSize: '9px', fontWeight: '700', background: 'rgba(192, 38, 211, 0.25)', border: '1px solid rgba(192, 38, 211, 0.6)', color: '#f0abfc', padding: '1px 6px', borderRadius: '4px' }}>
                          {topSub.badge}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={topSub.image || pantryMatch.image} 
                        alt={topSub.name}
                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                        onError={(e) => { e.currentTarget.src = pantryMatch.fallback || '/images/ingredients/garlic.jpg'; }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff' }}>{topSub.name}</span>
                          <span style={{ fontSize: '10px', fontWeight: '800', color: '#ffd166' }}>{topSub.ratio} • {topSub.match}</span>
                        </div>
                        <p style={{ fontSize: '10.5px', color: '#94a3b8', margin: '2px 0 0', lineHeight: '1.3' }}>{topSub.desc}</p>
                      </div>
                    </div>

                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                      {isSubActive ? (
                        <button
                          type="button"
                          onClick={() => handleToggle(subCategory, activeSub || topSub)}
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            background: 'rgba(34, 197, 94, 0.25)',
                            border: '1px solid #4ade80',
                            color: '#4ade80',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                          <span>Active in Recipe · Click to Revert to {pantryMatch.name}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggle(subCategory, topSub)}
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            background: !isOnBoard ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(22, 138, 173, 0.5)',
                            border: '1px solid ' + (!isOnBoard ? '#ffd166' : 'rgba(122, 203, 250, 0.6)'),
                            color: '#ffffff',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: !isOnBoard ? '0 2px 8px rgba(245, 158, 11, 0.4)' : 'none'
                          }}
                        >
                          <Sparkles size={11} className="sparkle-gold" />
                          <span>1-Click Swap: Use {topSub.name}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SubstitutesModal;
