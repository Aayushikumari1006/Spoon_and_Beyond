import React from 'react';
import { X, AlertCircle, ShoppingCart, Sparkles, Check, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

export function MissingIngredientsModal({
  isOpen,
  onClose,
  missingItems = [],
  onAddToCart,
  onOpenSubstitutes
}) {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="missing-modal-box glass-panel-electric" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="picker-modal-header">
          <div className="header-left-title">
            <div className="picker-icon-badge missing-badge-amber">
              <AlertCircle size={18} className="sparkle-gold" />
            </div>
            <div>
              <h3>Missing Ingredients</h3>
              <p>{missingItems.length} required items not yet selected in your kitchen pantry</p>
            </div>
          </div>
          <button className="picker-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        {/* Missing Items List */}
        <div className="missing-modal-items-list">
          {missingItems.length === 0 ? (
            <div className="all-ingredients-ready-box">
              <Check size={28} className="checked-green" />
              <h4>All Ingredients Ready!</h4>
              <p>You have selected all ingredients required for this culinary flow.</p>
            </div>
          ) : (
            missingItems.map((item, idx) => (
              <div key={item.id || idx} className="missing-ingredient-card">
                <div className="missing-card-left">
                  <div className="missing-card-thumb-box">
                    <img 
                      src={item.image || '/images/ingredients/garlic.jpg'} 
                      alt={item.name} 
                      onError={(e) => { e.currentTarget.src = '/images/ingredients/garlic.jpg'; }}
                    />
                  </div>
                  <div className="missing-card-text">
                    <h4>{item.name}</h4>
                    <span className="missing-need-badge">Required for Recipe Flow</span>
                    {item.substitute && (
                      <p className="missing-sub-hint">
                        <strong>Substitute available:</strong> {item.substitute}
                      </p>
                    )}
                  </div>
                </div>

                <div className="missing-card-actions">
                  {onOpenSubstitutes && (
                    <button 
                      type="button" 
                      className="explore-sub-mini-btn"
                      onClick={() => {
                        sounds.playPop(420);
                        onClose();
                        onOpenSubstitutes();
                      }}
                    >
                      <Sparkles size={12} />
                      <span>Substitutes</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {missingItems.length > 0 && (
          <div className="missing-modal-footer">
            <button 
              type="button" 
              className="add-all-missing-btn glow-cta"
              onClick={() => {
                sounds.playChime();
                if (onAddToCart) {
                  onAddToCart(missingItems);
                }
                onClose();
              }}
            >
              <ShoppingCart size={16} />
              <span>Add All {missingItems.length} Missing to Shopping List</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MissingIngredientsModal;
