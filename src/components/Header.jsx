import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChefHat, 
  Flame, 
  Clock, 
  Sparkles, 
  UtensilsCrossed, 
  Bookmark, 
  User, 
  ChevronDown, 
  Layers, 
  GitFork,
  ShoppingBag,
  Sun,
  Moon,
  Compass,
  Check,
  MessageSquareHeart
} from 'lucide-react';
import SpoonInfinityLogo from './SpoonInfinityLogo';
import { sounds } from '../utils/audio';

export function Header({ 
  onOpenCookAlong,
  cartCount = 0,
  onOpenCart,
  onSearch,
  searchQuery,
  setSearchQuery,
  currentTheme = 'ocean-breeze',
  onToggleTheme,
  activeRole = 'Everyday Home Cook',
  onRoleChange,
  activeTimeFilter = '30 min',
  onTimeFilterChange,
  onOpenSaved,
  onSurpriseMe,
  onOpenMealSetup,
  onOpenFeedback,
  mealSetup,
  activeNav = 'discover',
  onNavClick
}) {
  const [notificationsCount, setNotificationsCount] = useState(0);

  return (
    <header className="app-header">
      <div className="header-left">
        <SpoonInfinityLogo 
          size="md" 
          taglineText="There's More to Cook Than You Think"
        />

        <nav className="header-nav">
          <button 
            type="button" 
            className={`nav-link-btn ${activeNav === 'discover' ? 'active' : ''}`}
            onClick={() => { sounds.playPop(480); if (onNavClick) onNavClick('discover'); }}
          >
            <span className="search-pill-nav">
              <Search size={14} />
              <span>Discover Recipes</span>
            </span>
          </button>

          <button 
            type="button" 
            className={`nav-link-btn ${activeNav === 'kitchen' ? 'active' : ''}`}
            onClick={() => { sounds.playPop(520); if (onNavClick) onNavClick('kitchen'); }}
          >
            <UtensilsCrossed size={14} className="nav-icon" />
            <span>My Kitchen</span>
          </button>

          <button 
            type="button" 
            className={`nav-link-btn ${activeNav === 'cooking' ? 'active' : ''}`}
            onClick={() => { sounds.playPop(550); if (onNavClick) onNavClick('cooking'); }}
          >
            <ChefHat size={14} className="nav-icon" />
            <span>Cooking Assistant</span>
          </button>
        </nav>
      </div>

      <div className="header-center">
        {/* Surprise Me Quick CTA */}
        {onSurpriseMe && (
          <button 
            type="button" 
            className="header-surprise-btn"
            onClick={() => { sounds.playSubstituteSwap(); onSurpriseMe(); }}
            title="Surprise Me with a verified RecipeDB dish!"
          >
            <Sparkles size={14} />
            <span>Surprise Me!</span>
          </button>
        )}
      </div>

      <div className="header-right">
        {/* Culinary Feedback Button */}
        <button
          type="button"
          className="header-feedback-btn glow-feedback-cta"
          onClick={() => {
            sounds.playFeedbackOpen();
            if (onOpenFeedback) onOpenFeedback();
          }}
          title="Share feedback on your cooking or seasoning to adapt future recipes"
        >
          <MessageSquareHeart size={14} className="sparkle-gold" />
          <span>Feedback</span>
        </button>

        {/* Ocean Breeze / Electric Plum Theme Toggle */}
        <button
          type="button"
          className="theme-switch-btn"
          onClick={onToggleTheme}
          title={currentTheme === 'ocean-breeze' ? 'Switch to Electric Plum Theme' : 'Switch to Ocean Breeze Theme'}
        >
          {currentTheme === 'ocean-breeze' ? (
            <>
              <span className="theme-icon-symbol">🌊</span>
              <span className="theme-label-text">Ocean Breeze</span>
            </>
          ) : (
            <>
              <span className="theme-icon-symbol">🔮</span>
              <span className="theme-label-text">Electric Plum</span>
            </>
          )}
        </button>

        {/* Shopping Bag quick access */}
        <button 
          type="button" 
          className="icon-btn cart-btn" 
          onClick={onOpenCart} 
          title="Shopping Cart"
        >
          <ShoppingBag size={18} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        {/* Notifications and Profile */}
        <button 
          type="button" 
          className="icon-btn" 
          onClick={() => { sounds.playPop(400); setNotificationsCount(0); }}
          title="Notifications"
        >
          <Bell size={18} />
          {notificationsCount > 0 && <span className="notification-dot"></span>}
        </button>

        <div className="user-profile-badge" title="Chef Profile">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
            alt="Chef Profile" 
            className="user-avatar"
          />
          <span className="online-indicator"></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
