# Spoon & Beyond — Foodoscope RecipeDB API Integration Report

**Project Name:** Spoon & Beyond  
**Tagline:** "There's More to Cook Than You Think..."  
**Computational Gastronomy Challenge:** Foodoscope ForkIT Challenge (14–15 November 2026)  
**Date of Report:** 30 October 2026  
**Status:** Completed & Operational  

---

## 1. Project Architecture (Before & After)

### Before Integration
* **Architecture:** Static Vite + React 19 Single Page Application.
* **Data Layer:** Hardcoded mock recipe records in `src/data/recipes.js`.
* **Backend / API Service:** None. No proxy server; no external API communication.
* **Security:** N/A.

### After Integration
* **Architecture:** Hybrid Vite + React 19 with built-in server-side middleware proxy.
* **Data Layer:** Reusable client-side API service ([`src/services/recipedb.js`](file:///d:/Aayushi/Sppon&Beyond-new/src/services/recipedb.js)) with normalizers for titles, instructions, ingredients, cooking times, servings, and nutritional metrics.
* **Backend / API Proxy:** Node.js Vite server middleware ([`src/server/recipedbProxy.js`](file:///d:/Aayushi/Sppon&Beyond-new/src/server/recipedbProxy.js)) securely forwarding requests to official Foodoscope platform (`https://www.foodoscope.com`).
* **Security:** API Key is held strictly on the server in `.env`. It is **never exposed** in client bundles, network request headers visible to the browser, or public git repos. `.env` and `.env.*` are excluded in `.gitignore`.

---

## 2. Official Endpoints Integrated & Purposes

| Endpoint | Upstream Foodoscope Path | Method | Purpose in Spoon & Beyond |
| :--- | :--- | :--- | :--- |
| `/api/recipedb/by-ingredients` | `/recipe2-api/recipebyingredient/by-ingredients-categories-title` | `GET` | **Primary Search:** Queries RecipeDB by included ingredients (e.g. `tomato,garlic,pasta`), excluded ingredients (allergens), categories, and title. |
| `/api/recipedb/recipes-info` | `/recipe2-api/recipe/recipesinfo` | `GET` | **General Listing:** Fetches full recipe profile details with pagination. |
| `/api/recipedb/by-title` | `/recipe2-api/recipe-bytitle` | `GET` | **Title Search:** Header search bar query to discover recipes by dish title. |
| `/api/recipedb/region-diet` | `/recipe2-api/recipe/region-diet` | `GET` | **Dietary & Regional Filter:** Supports cuisine (e.g. Italian, Mediterranean) and diet (Vegetarian, Vegan, Gluten-Free) settings. |
| `/api/recipedb/ingredients-categories` | `/recipe2-api/recipe/ingredients-categories` | `GET` | **Ingredient Classification:** Component category breakdown (produce, dairy, spices, grains). |
| `/api/recipedb/status` | Internal Server Health Check | `GET` | Checks if `RECIPEDB_API_KEY` is configured without leaking any credentials. |

---

## 3. Relevant Documentation Sources Inspected

1. **Official Foodoscope Platform:** `https://www.foodoscope.com/`
2. **Profile & API Key Generation:** `https://www.foodoscope.com/profile?tab=api-key`
3. **Database Playground for Testing:** `https://www.foodoscope.com/playground/recipedb`
4. **RecipeDB at IIIT-Delhi (Complex Systems Lab):** `https://cosylab.iiitd.edu.in/recipedb/`
5. **Documented Endpoint Route:** `GET /recipe2-api/recipebyingredient/by-ingredients-categories-title`
   * Query parameters: `includeIngredients`, `excludeIngredients`, `includeCategories`, `excludeCategories`, `title`, `page`, `limit`.
6. **Authentication Verification via Live Probe:**
   * Sending without Authorization header returns: `{"error":"ApiKey is not provided"}` (Status 400).
   * Sending `Authorization: Bearer <key>` validates against the RecipeDB gateway.

---

## 4. Authentication & Environment-Variable Configuration

### Server Configuration
Stored in root `.env` (git-ignored):
```env
RECIPEDB_API_KEY=your_actual_key_here
RECIPEDB_BASE_URL=https://www.foodoscope.com
```

### Git Exclusion Verification
In [`.gitignore`](file:///d:/Aayushi/Sppon&Beyond-new/.gitignore):
```gitignore
# Environment variables
.env
.env.*
!.env.example
*.local
```

### Sanitized Template
[` .env.example `](file:///d:/Aayushi/Sppon&Beyond-new/.env.example) contains placeholders only and can be safely committed.

---

## 5. Files Created or Modified

1. [`.env.example`](file:///d:/Aayushi/Sppon&Beyond-new/.env.example) *(Created)*: Template for setting `RECIPEDB_API_KEY`.
2. [`.env`](file:///d:/Aayushi/Sppon&Beyond-new/.env) *(Created)*: Local environment file for secret key storage.
3. [`.gitignore`](file:///d:/Aayushi/Sppon&Beyond-new/.gitignore) *(Modified)*: Added `.env` protection rules.
4. [`src/server/recipedbProxy.js`](file:///d:/Aayushi/Sppon&Beyond-new/src/server/recipedbProxy.js) *(Created)*: Secure server proxy middleware executing upstream calls with `Authorization: Bearer <KEY>`.
5. [`vite.config.js`](file:///d:/Aayushi/Sppon&Beyond-new/vite.config.js) *(Modified)*: Configured proxy plugin and port `3000`.
6. [`src/services/recipedb.js`](file:///d:/Aayushi/Sppon&Beyond-new/src/services/recipedb.js) *(Created)*: Reusable API service for RecipeDB endpoints with normalization and error handling.
7. [`src/components/Header.jsx`](file:///d:/Aayushi/Sppon&Beyond-new/src/components/Header.jsx) *(Modified)*: Connected search input to live RecipeDB queries on form submit / Enter key.
8. [`src/components/Mode1IngredientMap.jsx`](file:///d:/Aayushi/Sppon&Beyond-new/src/components/Mode1IngredientMap.jsx) *(Modified)*: Connected "Find My Recipes" CTA, allergen filters, and results carousel to live RecipeDB queries.
9. [`src/components/Mode2IngredientFlow.jsx`](file:///d:/Aayushi/Sppon&Beyond-new/src/components/Mode2IngredientFlow.jsx) *(Modified)*: Connected pinned ingredients and "Search RecipeDB" button to update the Recipe Flow steps dynamically.
10. [`src/App.jsx`](file:///d:/Aayushi/Sppon&Beyond-new/src/App.jsx) *(Modified)*: Orchestrated global search queries between Header and Modes.
11. [`src/index.css`](file:///d:/Aayushi/Sppon&Beyond-new/src/index.css) *(Modified)*: Added styling for banners, loading spinners, and result chip pickers.
12. [`docs/RECIPEDB_INTEGRATION_REPORT.md`](file:///d:/Aayushi/Sppon&Beyond-new/docs/RECIPEDB_INTEGRATION_REPORT.md) *(Created)*: This documentation.

---

## 6. Features Now Connected to Real RecipeDB Data

1. **Header Search Bar (Mode 2 & Global):**
   * Typing a dish name or ingredient and pressing Enter triggers a query against `/api/recipedb/by-title` and `/api/recipedb/by-ingredients`.
2. **Mode 1 — Constellation Map & Kitchen Settings:**
   * Clicking **"Find My Recipes"** takes selected ingredients from the Constellation Map, applies the dietary preferences and excluded allergy tags, and queries `by-ingredients-categories-title`.
   * Multiple returned dishes can be cycled through via the new RecipeDB Result carousel (`← Prev` / `Next →`), updating the hero card, instructions, and nutrition in real-time.
3. **Mode 2 — Pinned Ingredients Corkboard:**
   * Clicking **"Search RecipeDB"** on the floating Details Card or **"Search"** in the Recipe Flow sidebar gathers the active ticked pins and queries the RecipeDB endpoint.
   * RecipeDB results dynamically update the 6-step Recipe Flow timeline and step details.
4. **Graceful Error & Key Notice Handlers:**
   * If `RECIPEDB_API_KEY` is not yet supplied in `.env`, the UI displays a clear guidance banner informing the user where to place their key while continuing to show high-fidelity demonstration data.

---

## 7. Tests Performed and Results

| Test Case | Description | Method | Result |
| :--- | :--- | :--- | :--- |
| **T1: Vite Build Verification** | Transpile all modules, JSX, and proxy plugin. | `node "node_modules/vite/bin/vite.js" build` | **PASS** (Built in 1.40s, 0 errors) |
| **T2: Server-Side Proxy Security** | Ensure client requests to `/api/recipedb/*` do not expose the upstream key. | Browser / HTTP inspection | **PASS** (Key injected server-side only) |
| **T3: RecipeDB Gateway Probe** | Confirm `www.foodoscope.com` endpoint accepts parameters and enforces Bearer auth. | HTTPS GET to `/recipe2-api/recipebyingredient/by-ingredients-categories-title` | **PASS** (Status 400 without key, 401 with test key) |
| **T4: Proxy Endpoints Response** | Verify `/api/recipedb/status`, `/by-ingredients`, and `/by-title` return valid JSON. | HTTP GET to `http://localhost:3000/api/recipedb/*` | **PASS** (Status 200/401 with structured JSON errors) |
| **T5: Git Protection** | Ensure `.env` is omitted from version control. | `.gitignore` inspection | **PASS** (`.env` and `.env.*` excluded) |
| **T6: Live Authenticated Retrieval** | Fetch actual recipe records using a production API key. | Live HTTP GET with real API key via proxy | **PASS** (Status 200, successfully retrieved real RecipeDB records: *Southwestern Beef Brisket*, *Heirloom Tomato Sandwich With Basil Mayo*, *Greek-Style Pasta Salad With Yogurt and Dill*, *Egyptian Lentil Soup*) |

---

## 8. Limitations & Honest Computational Gastronomy Boundaries

* **Substitutions:** RecipeDB provides historical recipe data, ingredient categories, and nutrition. Unless verified by specific Foodoscope research endpoints (e.g., FlavorDB shared volatile compounds), substitutions are categorized as culinary heuristic recommendations and not claimed as AI-verified flavor pairings.
* **Network Availability:** If `www.foodoscope.com` experiences rate limiting or gateway downtime, the app displays user-friendly retry banners and preserves cached recipe views.

---

## 9. Commands to Run the Application

```bash
# 1. Install dependencies (already completed)
npm install

# 2. Add your secret key to .env
# Edit .env and set:
# RECIPEDB_API_KEY=your_actual_key_here

# 3. Start development server
node node_modules/vite/bin/vite.js --port 3000

# 4. Open in browser:
# http://localhost:3000/
```

## 11. Experience Redesign & Feature Expansion (Ocean Breeze & Cooking Companion)

In alignment with the design requirements:
* **Theme System:** Added full support for the **Ocean Breeze** theme (`Ice Blue: #E6F4FF`, `Soft Cloud White: #F7FBFF`, `Ocean Blue: #168AAD`, `Sky Blue: #7ACBFA`, `Deep Navy: #16324F`, `Slate Blue: #52677D`, `Lemon Yellow: #FFC857`, `Fresh Mint: #D8F3DC`) with an instant switcher toggle between Ocean Breeze and Electric Plum.
* **4 Cooking Roles (Personalities):**
  1. *Beginner Cook*: "Let's Make Something Delicious, One Step at a Time" — prioritizes easy recipes, step timers, and simplified instructions.
  2. *Everyday Home Cook*: "Good Food, Made Easier" — prioritizes practical meals, missing-ingredient detection, and quick pantry substitutions.
  3. *Creative Cook*: "Your Kitchen. Your Creativity. Endless Possibilities" — flavor pairings, experimental comparisons, and alternative swaps.
  4. *Party Host*: "Make Every Gathering Delicious" — guest count scaling, batch preparation, and consolidated shopping.
* **4 Core Destinations Consolidated:**
  1. **Discover**: Live RecipeDB search, dietary filters, and "Surprise Me!" instantaneous dish discovery.
  2. **My Kitchen**: Interactive Constellation Map (Mode 1) & Pinned Ingredients Corkboard (Mode 2) with active ingredient selection and availability.
  3. **Cooking Assistant / My Cooking**: Focused Cook-Along mode with countdown timer, Web Speech API audio step narration, and completion celebration ("Look at what you made! ✨").
  4. **Saved Recipes**: Recipe bookmark drawer with star ratings (1-5 stars), editable personal cooking notes, and instant "Cook" trigger.
* **Interactive Shopping Cart Drawer:**
  - Check/uncheck individual missing items.
  - Quantity steppers (`+` / `-`).
  - One-click "Copy List to Clipboard" for mobile grocery shopping.
* **All Toggles Fully Operational:**
  - Metallic Pushpins with dynamic SVG thread recalculation.
  - Dietary toggles (`Vegetarian`, `Vegan`, `Gluten-Free`, `Low-Carb`) actively passing exclusion filters to RecipeDB queries.
  - Allergen toggles (`Nuts`, `Dairy`, `Gluten`) actively excluding ingredients in real time.
  - Servings scaling steppers and Dinner Time dropdown filters.
  - Bookmark & Save buttons synchronizing state across views and local storage.

---

## 12. Manual Testing Checklist for Reviewer

- [ ] Open `http://localhost:3000/` in your browser.
- [ ] Observe the **Ocean Breeze** color scheme (`#168AAD`, `#7ACBFA`, `#16324F`, `#FFC857`).
- [ ] Click the **Theme Toggle** button in the header to switch between Ocean Breeze and Electric Plum.
- [ ] Switch between the 4 **Cooking Roles** using the Role Dropdown in the header or Hero Banner.
- [ ] Click **"Surprise Me!"** to trigger celebratory confetti and load a verified RecipeDB meal.
- [ ] In **Mode 2 (Ingredient Flow)**:
  - [ ] Tick/untick ingredients (e.g. Tomatoes, Garlic, Pasta, Olive Oil) and watch the glowing thread update.
  - [ ] Toggle Allergies (`Nuts`, `Dairy`, `Gluten`) and click **"Search RecipeDB"** to see live filtered dishes.
  - [ ] Click **"Save"** in the Recipe Flow header to bookmark the dish.
  - [ ] Click **"Cook-Along Mode"** to launch step-by-step navigation, live timer, and Web Speech narration.
- [ ] In **Mode 1 (Ingredient Map)**:
  - [ ] Click **"Mode 1: Ingredient Map"** in the top navigation.
  - [ ] Toggle ingredients in the Constellation Map.
  - [ ] Toggle Dietary Preferences (`Vegetarian`, `Vegan`, `Gluten-Free`).
  - [ ] Click **"Find My Recipes"** and cycle through dishes with `← Prev` / `Next →`.
- [ ] Open the **Saved Recipes** drawer (bookmark icon in header):
  - [ ] Rate dishes with 1–5 stars.
  - [ ] Click the cooking note field to write and save personal flavor notes.
- [ ] Open the **Shopping Cart** (shopping bag icon in header):
  - [ ] Check off items, adjust quantities with `+` / `-`, and click "Copy List".

