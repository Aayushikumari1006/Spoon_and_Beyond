import React from 'react';
import { 
  X, 
  Trash2, 
  Check, 
  ShoppingBag, 
  Sparkles, 
  Plus, 
  Minus, 
  Copy, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onClearCart, 
  onToggleItemChecked = null,
  onUpdateQuantity = null 
}) {
  if (!isOpen) return null;

  // Normalized item structure: { name, quantity, checked }
  const normalizedItems = items.map((item, idx) => {
    if (typeof item === 'string') {
      return { id: idx, name: item, quantity: 1, checked: false };
    }
    return {
      id: item.id ?? idx,
      name: item.name || 'Ingredient',
      quantity: item.quantity || 1,
      checked: Boolean(item.checked)
    };
  });

  const handleCopyShoppingList = () => {
    sounds.playChime();
    const text = normalizedItems
      .map(i => `- [${i.checked ? 'x' : ' '}] ${i.name} (Qty: ${i.quantity})`)
      .join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Spoon & Beyond Shopping List:\n\n${text}`);
    }
    alert('Shopping list copied to clipboard!');
  };

  return (
    <div className="cart-backdrop">
      <div className="cart-drawer glass-panel-electric">
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="cart-icon-pink" />
            <div>
              <h3>Your Shopping List</h3>
              <p>{items.length} {items.length === 1 ? 'ingredient' : 'ingredients'} saved</p>
            </div>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <p>Your shopping list is empty.</p>
              <span>Tick missing ingredients or add from the board to save them here!</span>
            </div>
          ) : (
            <div className="cart-items-list">
              {normalizedItems.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className={`cart-item-row ${item.checked ? 'item-checked' : ''}`}>
                  <button 
                    className={`cart-check-box ${item.checked ? 'checked' : ''}`}
                    onClick={() => {
                      sounds.playPop(500);
                      if (onToggleItemChecked) onToggleItemChecked(idx);
                    }}
                    title={item.checked ? 'Mark unpurchased' : 'Mark purchased'}
                  >
                    {item.checked ? <Check size={12} strokeWidth={3} /> : null}
                  </button>

                  <div className="cart-item-name">
                    <span className={item.checked ? 'strike-through' : ''}>{item.name}</span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="cart-qty-stepper">
                    <button 
                      className="cart-qty-btn"
                      onClick={() => {
                        sounds.playPop(380);
                        if (onUpdateQuantity) {
                          onUpdateQuantity(idx, Math.max(1, item.quantity - 1));
                        }
                      }}
                      title="Decrease quantity"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="cart-qty-num">{item.quantity}</span>
                    <button 
                      className="cart-qty-btn"
                      onClick={() => {
                        sounds.playPop(480);
                        if (onUpdateQuantity) {
                          onUpdateQuantity(idx, item.quantity + 1);
                        }
                      }}
                      title="Increase quantity"
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  <button 
                    className="cart-item-remove"
                    onClick={() => { sounds.playPop(300); onRemoveItem(idx); }}
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-footer-btn-row">
              <button className="cart-clear-btn" onClick={onClearCart}>
                Clear List
              </button>
              <button className="cart-copy-btn" onClick={handleCopyShoppingList} title="Copy list to clipboard">
                <Copy size={13} />
                <span>Copy List</span>
              </button>
            </div>

            <button 
              className="cart-checkout-btn"
              onClick={() => {
                sounds.playChime();
                confetti({ particleCount: 70, spread: 70 });
                alert(`Order sent! All ${items.length} ingredients ready for grocery delivery.`);
              }}
            >
              <span>Export to Instacart</span>
              <Sparkles size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
