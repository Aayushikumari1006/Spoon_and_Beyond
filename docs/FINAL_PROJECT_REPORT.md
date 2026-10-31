# FINAL PROJECT REPORT: SPOON & BEYOND
**A Computational Gastronomy & Adaptive Recipe Discovery Platform**

---

### Project Information & Metadata
* **Project Title:** Spoon & Beyond
* **Tagline:** *"There's More to Cook Than You Think..."*
* **Author / Developer:** Aayushi Kumari
* **Repository:** https://github.com/Aayushikumari1006/Spoon_and_Beyond
* **Target Domain:** Computational Gastronomy, Human-Computer Interaction (HCI), Culinary AI
* **Tech Stack:** React 19, Vite, Vanilla CSS Design System, Web Audio API, RecipeDB (Foodoscope / IIIT-Delhi)
* **Date:** October 31, 2026
* **Project Status:** Complete, Verified & Deployed to Git Version Control

---

## 1. Executive Summary

**Spoon & Beyond** is a modern computational gastronomy web application engineered to transform how individuals explore, prepare, and adapt culinary recipes based on available household ingredients. Moving beyond static, uninspired recipe catalogs, Spoon & Beyond models cooking as an interactive, multi-sensory graph of ingredient synergies and culinary formulas.

Users place raw ingredients onto an interactive **Dynamic Constellation Board**. The application dynamically computes flavor synergies, calculates ingredient coverage against vast culinary datasets (RecipeDB), and synthesizes authentic recipe formulas in real time. Rather than relying on rigid text instructions, recipes are represented as dynamic visual process flowcharts and interactive cooking guides. Crucially, when an ingredient is missing, the system utilizes culinary food-science pairing rules to deliver **dynamic 1-click substitutions** with exact measurement ratios, ensuring seamless cooking experiences with zero food waste.

---

## 2. Problem Statement & Motivation

Traditional recipe websites and cooking assistants suffer from several systemic limitations:

1. **Rigid Ingredient Requirements:** Users are discouraged when they lack one or two secondary ingredients, often leading to abandoned meals or unnecessary grocery runs.
2. **Static & Monotonous Instruction Formats:** Lengthy walls of text obscure the actual culinary workflow, making it difficult to understand cooking stages (prep, sauté, deglaze, simmer, plate).
3. **Absence of Intelligent Substitutions:** Most platforms either lack substitute recommendations or provide generic, unmeasured suggestions that disrupt the chemical balance (moisture, fat, acidity) of the dish.
4. **Disconnected User Palate Feedback:** Generic rating systems (1–5 stars) fail to capture sensory feedback (e.g., "too salty" or "needs higher acid") and never adapt future recommendations to personal tastes.
5. **Lack of Dynamic Multi-Sensory Engagement:** Web applications rarely engage the auditory and tactile senses of the cook, leading to detached user experiences.

**Spoon & Beyond** resolves these challenges by combining computational gastronomy datasets with an aesthetic, fluid glassmorphic UI, responsive audio synthesis, and intelligent graph-based dish formulations.

---

## 3. System Architecture & Technology Stack

The platform is designed around a modular, reactive architecture prioritizing performance, real-time feedback, and zero unnecessary page refetches.

```
┌─────────────────────────────────────────────────────────────┐
│                   CLIENT APPLICATION (VITE + REACT)         │
│                                                             │
│  ┌─────────────────────────┐     ┌───────────────────────┐  │
│  │ Constellation Board UI  │     │ Recipe Spotlight Bar  │  │
│  │ (Interactive Canvas/SVG)│     │ (Hero, Macros, Note)  │  │
│  └────────────┬────────────┘     └───────────┬───────────┘  │
│               │                              │              │
│               ▼                              ▼              │
│  ┌─────────────────────────┐     ┌───────────────────────┐  │
│  │  Central Synergy Hub    │     │ Ingredients Substitute│  │
│  │  (Clickable Dish Modal) │     │ Modal (Dynamic List)  │  │
│  └────────────┬────────────┘     └───────────┬───────────┘  │
│               │                              │              │
│               ▼                              ▼              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Local Computational Engine (Synonyms & Coverage)     │  │
│  └────────────────────────────┬──────────────────────────┘  │
└───────────────────────────────┼─────────────────────────────┘
                                │
               HTTP Proxy / Fallback Layer
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│       FOODOSCOPE RECIPEDB REVERSE PROXY MIDDLEWARE          │
│   (Node.js Vite Server with Secure .env API Key Shielding)  │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│          UPSTREAM RECIPEDB GATEWAY (IIIT-DELHI)             │
│    (/recipe2-api/recipebyingredient, /recipesinfo, etc.)    │
└───────────────────────────────┴─────────────────────────────┘
```

### Core Technologies:
* **Frontend Framework:** React 19 with Vite for near-instant Hot Module Replacement (HMR).
* **Styling & Design System:** Custom Vanilla CSS leveraging modern CSS variables, glassmorphic backdrop filters, electric neon gradients (`#168aad`, `#7acbfa`, `#ffc857`), and responsive layouts.
* **Sound Engine:** Native Web Audio API synthesizing custom harmonic tones (sine, triangle, exponential frequency ramps) for audible, non-childish tactile feedback.
* **API Middleware:** Secure server-side proxy middleware in `vite.config.js` insulating the Foodoscope `RECIPEDB_API_KEY` from client-side exposure.

---

## 4. Key Functional Modules & Innovations

### 4.1. Interactive Ingredient Constellation & Synergy Hub
* **Dynamic Canvas:** Pantry ingredients are rendered as circular interactive nodes arranged along harmonic orbits. Nodes dynamically connect with glowing SVG bezier arcs based on shared flavor profiles.
* **Clickable Central Synergy Hub:** The inner circle acts as a living formulation nucleus. It displays real-time match counts (`✨ 12 Recipes Matched`) and real dish backdrop previews.
* **Direct Modal Trigger:** Clicking the inner circle directly launches the **Recipe Suggestions Modal**, listing all qualified dishes ranked by coverage percentage and offering one-click access to interactive cooking flowcharts.

### 4.2. Computational Gastronomy Recipe Matching Engine
* **Culinary Synonym Mapping:** Uses a custom culinary dictionary mapping regional and specific ingredient forms (e.g., `roma_tomatoes` ↔ `tomatoes`, `penne_rigate` ↔ `pasta`, `garlic_cloves` ↔ `garlic`).
* **Realistic Coverage Algorithm:** Scored matching evaluates both required core ingredients and pantry coverage thresholds (`coverage >= 0.2` and `matchedReqCount >= 1`), ensuring suggestions accurately expand or contract as ingredients are toggled on the board.

### 4.3. Interactive Recipe Flowchart & Step Navigator
* **Step-by-Step Culinary Pipeline:** Replaces traditional blocks of text with an interactive flowchart visualizer.
* **Dynamic State Navigation:** Features interactive "Previous Step" and "Next Step" controls with real-time percentage completion indicators.
* **Ingredient Highlighting:** Each step automatically flags which required ingredients and culinary techniques (sear, boil, simmer, garnish) are active at that stage.

### 4.4. Intelligent Ingredients & Smart Substitutes Engine
* **Zero-Scroll Sidebar:** The right sidebar is streamlined to eliminate vertical clutter. All detailed ingredient breakdowns and substitute options are consolidated inside the clickable **`INGREDIENTS SUBSTITUTES`** trigger.
* **Dynamic Recipe-Specific Ingredient List:** Displays required items with portion sizes, culinary roles, and real-time pantry status (`✓ On Your Board` vs. `⚠️ Missing from Board`).
* **Food Science Pairing Substitutes:** For each ingredient, the modal provides authentic substitute options complete with product imagery, culinary rationale, and exact substitution ratios (e.g., *Heavy Cream → 1:1 Greek Yogurt + Milk* or *Cashew Cream*).
* **1-Click Swap & Revert:** Users can swap ingredients in real time to update the recipe calculations, or instantly revert to the original ingredient with a single click.

### 4.5. Multi-Sensory Audio Feedback Synthesis
* **Web Audio Synthesis:** Utilizes an in-house audio synthesizer avoiding generic external MP3 files.
* **Context-Specific Frequencies:**
  - *Ingredient Selection:* Melodic pop tones with frequency modulation.
  - *Hub / Dish Exploration:* Resonant chime chord (`E5`, `B5`, `E6`) symbolizing culinary discovery.
  - *Substitute Swaps:* High-fidelity metallic click representing a successful swap.
  - *Substitute Revert:* Gentle descending octave indicating a restoration.
  - *Flowchart Navigation:* Subtle UI whoosh and soft bell tones.

### 4.6. Chef's Memory & Sensory Palate Feedback
* **Palate Memory Storage:** When a user provides feedback on a prepared dish (e.g., *"Salt was slightly more than needed"*), the system logs the note to localized storage.
* **Adaptive Recommendation Pill:** On future visits to that recipe, a prominent **Chef's Memory Note** appears on the spotlight card with adaptive recommendations (e.g., *"Last time you prepared this, salt was strong. Try reducing by 1/2 tsp"*).

---

## 5. Security & Data Protection Architecture

* **Zero Credential Leakage:** All communication with the Foodoscope RecipeDB servers passes through a dedicated local proxy (`/api/recipedb/*`). The `RECIPEDB_API_KEY` is retained strictly in the server environment.
* **Git Safe Guarding:** Root `.env` and `.env.*` patterns are strictly ignored in `.gitignore`, with only a sanitized template (`.env.example`) stored in version control.
* **Client Sanitization:** Production Vite builds eliminate dead code and strip all sensitive environment traces.

---

## 6. Verification, Testing & Quality Assurance

| Test Suite / Area | Verification Method | Result |
| :--- | :--- | :--- |
| **Vite Production Build** | `vite build` compilation check | **PASSED** (0 errors, 2049 modules transformed in 1.72s) |
| **Local Web Server** | HTTP StatusCode query against `http://localhost:3000` | **PASSED** (HTTP 200 OK) |
| **Inner Circle Click** | Verified center circle click opens `DishesPickerModal` | **PASSED** (Direct recipe listing enabled) |
| **Right Sidebar Layout** | Removed alternative recipes strip; verified zero-scroll | **PASSED** (Sidebar height fits viewport cleanly) |
| **Dynamic Substitutes** | Verified `SubstitutesModal` displays recipe-specific items | **PASSED** (Dynamic ingredients & 1-click swap active) |
| **Audio Engine** | Audio context synthesis test across interactions | **PASSED** (Audible, distinct, non-intrusive sound cues) |
| **Git Tracking** | Clean commit and push to remote GitHub repository | **PASSED** (`main` branch up to date at GitHub) |

---

## 7. Future Scope & Roadmap

1. **AI-Powered Flavor Pairing Matrix:** Integrating chemical compound vector databases (FlavorDB) to compute pairwise volatile compound synergies.
2. **Computer Vision Ingredient Scanner:** Adding camera-based image recognition allowing users to snap a photo of their refrigerator to populate the constellation board automatically.
3. **Voice-Guided Hands-Free Cook-Along:** Implementing Web Speech API commands ("Next Step", "What can I substitute for garlic?") for seamless kitchen operation without touching the screen.
4. **Community Palate Profiles:** Allowing users to publish and fork recipe adaptations based on regional spice tolerances and specialized diets.

---

## 8. Conclusion

**Spoon & Beyond** bridges the gap between complex computational gastronomy and everyday domestic cooking. By translating static recipe databases into a dynamic, interactive canvas of ingredient synergies, dynamic visual flowcharts, and genuine scientific substitutions, the project elevates home cooking into an engaging, waste-conscious, and adaptive experience. All application modules are thoroughly integrated, tested, and available in the open GitHub repository.
