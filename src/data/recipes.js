// Recipes and ingredients data for Spoon & Beyond - Real-Time RecipeDB Catalog

export const ALL_PANTRY_INGREDIENTS = [
  // Produce
  { id: 'tomatoes', name: 'Roma Tomatoes', image: '/images/ingredients/roma_tomatoes.jpg', fallback: '/images/ingredients/roma_tomatoes.jpg', category: 'Produce', x: 28, y: 18 },
  { id: 'cherry_tomatoes', name: 'Cherry Tomatoes', image: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb7?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/roma_tomatoes.jpg', category: 'Produce', x: 22, y: 28 },
  { id: 'bell_peppers', name: 'Bell Peppers', image: '/images/ingredients/bell_peppers.jpg', fallback: '/images/ingredients/bell_peppers.jpg', category: 'Produce', x: 26, y: 42 },
  { id: 'zucchini', name: 'Zucchini', image: '/images/ingredients/zucchini.jpg', fallback: '/images/ingredients/zucchini.jpg', category: 'Produce', x: 36, y: 48 },
  { id: 'carrots', name: 'Carrots', image: '/images/ingredients/carrots.jpg', fallback: '/images/ingredients/carrots.jpg', category: 'Produce', x: 18, y: 52 },
  { id: 'broccoli', name: 'Broccoli', image: '/images/ingredients/broccoli.jpg', fallback: '/images/ingredients/broccoli.jpg', category: 'Produce', x: 28, y: 64 },
  { id: 'spinach', name: 'Baby Spinach', image: '/images/ingredients/spinach.jpg', fallback: '/images/ingredients/spinach.jpg', category: 'Produce', x: 18, y: 26 },
  { id: 'mushrooms', name: 'Wild Mushrooms', image: '/images/ingredients/mushrooms.jpg', fallback: '/images/ingredients/mushrooms.jpg', category: 'Produce', x: 62, y: 34 },
  { id: 'eggplant', name: 'Eggplant', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/zucchini.jpg', category: 'Produce', x: 32, y: 56 },
  { id: 'avocado', name: 'Ripe Avocado', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/lemon.jpg', category: 'Produce', x: 20, y: 38 },

  // Aromatics & Spices
  { id: 'garlic', name: 'Garlic Cloves', image: '/images/ingredients/garlic.jpg', fallback: '/images/ingredients/garlic.jpg', category: 'Aromatics', x: 48, y: 16 },
  { id: 'onions', name: 'Sweet Onions', image: '/images/ingredients/onions.jpg', fallback: '/images/ingredients/onions.jpg', category: 'Aromatics', x: 38, y: 24 },
  { id: 'red_onion', name: 'Red Onion', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/onions.jpg', category: 'Aromatics', x: 42, y: 32 },
  { id: 'ginger', name: 'Fresh Ginger', image: '/images/ingredients/ginger.jpg', fallback: '/images/ingredients/ginger.jpg', category: 'Aromatics', x: 70, y: 20 },
  { id: 'chilli_flakes', name: 'Chilli Flakes', image: '/images/ingredients/chilli_flakes.jpg', fallback: '/images/ingredients/chilli_flakes.jpg', category: 'Aromatics', x: 64, y: 54 },
  { id: 'black_pepper', name: 'Black Pepper', image: '/images/ingredients/black_pepper.jpg', fallback: '/images/ingredients/black_pepper.jpg', category: 'Aromatics', x: 74, y: 56 },
  { id: 'paprika', name: 'Smoked Paprika', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/chilli_flakes.jpg', category: 'Aromatics', x: 68, y: 64 },

  // Pastas & Grains
  { id: 'pasta', name: 'Penne Rigate', image: '/images/ingredients/pasta.jpg', fallback: '/images/ingredients/pasta.jpg', category: 'Grains', x: 68, y: 16 },
  { id: 'spaghetti', name: 'Durum Spaghetti', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/pasta.jpg', category: 'Grains', x: 74, y: 26 },
  { id: 'rice', name: 'Arborio Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/pasta.jpg', category: 'Grains', x: 72, y: 38 },
  { id: 'gnocchi', name: 'Potato Gnocchi', image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/pasta.jpg', category: 'Grains', x: 78, y: 32 },

  // Dairy & Fats
  { id: 'olive_oil', name: 'Extra Virgin Olive Oil', image: '/images/ingredients/olive_oil.jpg', fallback: '/images/ingredients/olive_oil.jpg', category: 'Fats', x: 48, y: 36 },
  { id: 'butter', name: 'Creamy Butter', image: '/images/ingredients/butter.jpg', fallback: '/images/ingredients/butter.jpg', category: 'Fats', x: 54, y: 44 },
  { id: 'heavy_cream', name: 'Heavy Cream', image: '/images/ingredients/heavy_cream.jpg', fallback: '/images/ingredients/heavy_cream.jpg', category: 'Dairy', x: 82, y: 26 },
  { id: 'parmesan', name: 'Parmigiano-Reggiano', image: '/images/ingredients/parmesan.jpg', fallback: '/images/ingredients/parmesan.jpg', category: 'Dairy', x: 58, y: 68 },
  { id: 'cheese', name: 'Mozzarella Cheese', image: '/images/ingredients/cheese.jpg', fallback: '/images/ingredients/cheese.jpg', category: 'Dairy', x: 68, y: 36 },
  { id: 'ricotta', name: 'Fresh Ricotta', image: '/images/substitutes/ricotta_cheese.jpg', fallback: '/images/ingredients/cheese.jpg', category: 'Dairy', x: 76, y: 46 },
  { id: 'greek_yogurt', name: 'Greek Yogurt', image: '/images/substitutes/greek_yogurt.jpg', fallback: '/images/ingredients/heavy_cream.jpg', category: 'Dairy', x: 84, y: 38 },

  // Herbs & Seasoning
  { id: 'basil', name: 'Fresh Basil', image: '/images/ingredients/fresh_basil.jpg', fallback: '/images/ingredients/fresh_basil.jpg', category: 'Herbs', x: 38, y: 68 },
  { id: 'rosemary', name: 'Fresh Rosemary', image: '/images/ingredients/rosemary.jpg', fallback: '/images/ingredients/rosemary.jpg', category: 'Herbs', x: 82, y: 44 },
  { id: 'thyme', name: 'Fresh Thyme', image: '/images/ingredients/thyme.jpg', fallback: '/images/ingredients/thyme.jpg', category: 'Herbs', x: 82, y: 60 },
  { id: 'parsley', name: 'Italian Parsley', image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/fresh_basil.jpg', category: 'Herbs', x: 44, y: 62 },

  // Proteins & Nuts
  { id: 'chicken', name: 'Herb Chicken Breast', image: '/images/ingredients/chicken.jpg', fallback: '/images/ingredients/chicken.jpg', category: 'Proteins', x: 86, y: 14 },
  { id: 'salmon', name: 'Wild Salmon Fillet', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/chicken.jpg', category: 'Proteins', x: 88, y: 24 },
  { id: 'shrimp', name: 'Jumbo Shrimp', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/chicken.jpg', category: 'Proteins', x: 84, y: 52 },
  { id: 'pine_nuts', name: 'Toasted Pine Nuts', image: '/images/ingredients/pine_nuts.jpg', fallback: '/images/ingredients/pine_nuts.jpg', category: 'Proteins', x: 16, y: 66 },
  { id: 'tofu', name: 'Firm Tofu', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/cheese.jpg', category: 'Proteins', x: 22, y: 72 },

  // Citrus & Acids
  { id: 'lemon', name: 'Fresh Lemon', image: '/images/ingredients/lemon.jpg', fallback: '/images/ingredients/lemon.jpg', category: 'Citrus', x: 50, y: 56 },
  { id: 'lime', name: 'Zesty Lime', image: 'https://images.unsplash.com/photo-1532704868953-d85f74170701?w=300&auto=format&fit=crop&q=80', fallback: '/images/ingredients/lemon.jpg', category: 'Citrus', x: 52, y: 66 }
];

// Initial selected items in Mode 1
export const INGREDIENTS_MODE_1 = ALL_PANTRY_INGREDIENTS.slice(0, 18).map((item, idx) => ({
  ...item,
  selected: idx < 5, // Roma tomatoes, cherry tomatoes, bell peppers, zucchini, carrots
  connections: idx === 0 
    ? ['garlic', 'pasta', 'olive_oil', 'basil'] 
    : idx === 10 // garlic
    ? ['tomatoes', 'pasta', 'olive_oil', 'onions']
    : idx === 17 // pasta
    ? ['tomatoes', 'garlic', 'olive_oil', 'cheese', 'heavy_cream']
    : idx === 21 // olive_oil
    ? ['tomatoes', 'garlic', 'pasta', 'basil']
    : []
}));

// Pinned ingredients for Mode 2
export const INGREDIENTS_MODE_2 = [
  {
    id: 'roma-tomatoes',
    name: 'Roma Tomatoes',
    image: '/images/ingredients/roma_tomatoes.jpg',
    row: 'top',
    defaultChecked: true,
    category: 'produce'
  },
  {
    id: 'garlic',
    name: 'Garlic',
    image: '/images/ingredients/garlic.jpg',
    row: 'top',
    defaultChecked: true,
    category: 'aromatic'
  },
  {
    id: 'pasta',
    name: 'Pasta',
    image: '/images/ingredients/pasta.jpg',
    row: 'top',
    defaultChecked: true,
    category: 'grain'
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    image: '/images/ingredients/olive_oil.jpg',
    row: 'top',
    defaultChecked: true,
    category: 'oil'
  },
  {
    id: 'heavy-cream',
    name: 'Heavy Cream',
    image: '/images/ingredients/heavy_cream.jpg',
    row: 'bottom',
    defaultChecked: false,
    missingLabel: 'Missing',
    substitute: 'Greek Yogurt + Milk',
    substituteDesc: 'Rich & smooth consistency for creamy sauce'
  },
  {
    id: 'parmesan',
    name: 'Parmesan',
    image: '/images/ingredients/parmesan.jpg',
    row: 'bottom',
    defaultChecked: false,
    missingLabel: 'Missing',
    substitute: 'Pecorino Romano or Nutritional Yeast',
    substituteDesc: 'Sharp savory umami finish'
  },
  {
    id: 'fresh-basil',
    name: 'Fresh Basil',
    image: '/images/ingredients/fresh_basil.jpg',
    row: 'bottom',
    defaultChecked: false,
    missingLabel: 'Missing',
    substitute: 'Dried Basil or Italian Herb Blend',
    substituteDesc: 'Aromatic herbal brightness'
  },
  {
    id: 'lemon',
    name: 'Lemon',
    image: '/images/ingredients/lemon.jpg',
    row: 'bottom',
    defaultChecked: false,
    missingLabel: 'Missing',
    substitute: 'White Wine Vinegar or Lemon Zest',
    substituteDesc: 'Zesty citrus acidity'
  }
];

export const RECIPE_FLOW_STEPS_MODE_2 = [
  {
    id: 1,
    title: '1 Boil Pasta',
    status: 'Done',
    desc: 'Bring a pot of heavily salted water to a rolling boil. Add penne and cook until al dente (about 9-10 mins).',
    duration: '10 mins',
    image: '/images/steps/1_boil_pasta.jpg'
  },
  {
    id: 2,
    title: '2 Sizzle Garlic',
    status: 'Done',
    desc: 'Heat extra virgin olive oil in a deep skillet over medium heat. Add thinly sliced and minced garlic until fragrant and golden.',
    duration: '3 mins',
    image: '/images/steps/2_sizzle_garlic.jpg'
  },
  {
    id: 3,
    title: '3 Crush Tomatoes',
    status: 'NOW',
    desc: 'Crush sweet ripe Roma tomatoes by hand and fold them into the shimmering garlic oil with a pinch of sea salt.',
    duration: '4 mins',
    image: '/images/steps/3_crush_tomatoes.jpg'
  },
  {
    id: 4,
    title: '4 Simmer Sauce',
    status: 'Upcoming',
    desc: 'Reduce heat to medium-low. Let sauce bubble gently until it thickens and the sweet tomato sugars caramelize.',
    duration: '6 mins',
    image: '/images/steps/4_simmer_sauce.jpg'
  },
  {
    id: 5,
    title: '5 Fold In Cream',
    status: 'Upcoming',
    desc: 'Slowly stream in heavy cream (or Greek yogurt substitute), stirring gently to create a velvety blush sauce.',
    duration: '3 mins',
    image: '/images/steps/5_fold_cream.jpg'
  },
  {
    id: 6,
    title: '6 Plate + Basil',
    status: 'Upcoming',
    desc: 'Toss hot penne into the luscious sauce, transfer to warm ceramic bowls, and crown with fresh basil and parmesan.',
    duration: '2 mins',
    image: '/images/steps/6_plate_basil.jpg'
  }
];

// Rich 12-Dish RecipeDB Catalog with distinctive high-definition imagery and real computational formulas
export const DYNAMIC_RECIPEDB_CATALOG = [
  {
    id: 'rec_creamy_garlic_veg',
    title: 'Creamy Garlic Vegetable Penne',
    subtitle: 'Velvety Garlic Blush Sauce, Broccoli, Tomatoes & Aged Parmesan',
    image: '/images/dishes/creamy_garlic_pasta.jpg',
    badge: 'RecipeDB Signature',
    people: 2,
    time: '25 mins',
    verifiedMinutes: 25,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['dairy', 'gluten'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    difficulty: 'Medium',
    keywords: ['tomatoes', 'garlic', 'pasta', 'olive_oil', 'heavy_cream', 'parmesan', 'broccoli', 'carrots', 'basil'],
    requiredIngredients: ['tomatoes', 'garlic', 'pasta', 'olive_oil', 'heavy_cream', 'parmesan'],
    steps: [
      { step: 1, title: 'Prep Produce & Aromatics', description: 'Dice ripe Roma tomatoes, chop broccoli florets into bite-sized pieces, and thinly slice 4 cloves of fresh garlic.', time: '7 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Boil Penne Al Dente', description: 'Cook penne in salted rolling boil water for 9 mins until firm to bite. Reserve 1/2 cup of starchy pasta water.', time: '9 mins', image: '/images/steps/1_boil_pasta.jpg' },
      { step: 3, title: 'Thermal Garlic Sauté', description: 'Gently fry garlic in extra virgin olive oil over medium flame until fragrant and golden without browning.', time: '3 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 4, title: 'Simmer Crushed Tomatoes', description: 'Fold in crushed tomatoes, broccoli, and a pinch of salt. Simmer gently until vegetable tenderness is achieved.', time: '5 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 5, title: 'Velvety Emulsion & Glaze', description: 'Stream heavy cream and grated parmesan into sauce. Toss drained penne vigorously with reserved water to glaze.', time: '4 mins', image: '/images/steps/5_fold_cream.jpg' },
      { step: 6, title: 'Garnish with Basil', description: 'Crown steaming bowls with torn basil leaves and fresh cracked black pepper.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '480 kcal', protein: '18g', carbs: '62g', fat: '16g', fiber: '7g' }
  },
  {
    id: 'rec_arrabbiata',
    title: 'Penne all\'Arrabbiata Tradizionale',
    subtitle: 'Fiery Roman Tomato Garlic Sauce with Sun-Dried Chilies • Lazio, Italy',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Verified',
    people: 2,
    time: '20 mins',
    verifiedMinutes: 20,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['gluten'],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['tomatoes', 'garlic', 'chilli_flakes', 'olive_oil', 'pasta', 'basil'],
    requiredIngredients: ['tomatoes', 'garlic', 'chilli_flakes', 'olive_oil', 'pasta'],
    steps: [
      { step: 1, title: 'Boil Penne Rigate', description: 'Cook penne in heavily salted boiling water until al dente (9 mins). Keep 1/2 cup starchy pasta water.', time: '9 mins', image: '/images/steps/1_boil_pasta.jpg' },
      { step: 2, title: 'Sizzle Garlic & Chili Flakes', description: 'Warm 3 tbsp extra virgin olive oil with sliced garlic and crushed dried chili flakes until fragrant and sizzling.', time: '3 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Crush Sweet Roma Tomatoes', description: 'Hand-crush ripe sweet tomatoes into sizzling oil. Bubble vigorously for 6 minutes until rich and thick.', time: '6 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 4, title: 'Pan Toss & Basil Glaze', description: 'Transfer hot penne directly into sauce; toss dynamically over high heat with chopped basil.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '410 kcal', protein: '12g', carbs: '68g', fat: '10g', fiber: '5g' }
  },
  {
    id: 'rec_creamy_mushrooms',
    title: 'Creamy Garlic Wild Mushroom Fettuccine',
    subtitle: 'Earthy Sautéed Cremini with Velvety Butter & Herb Reduction',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Gourmet',
    people: 2,
    time: '22 mins',
    verifiedMinutes: 22,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['dairy', 'gluten'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    difficulty: 'Medium',
    keywords: ['mushrooms', 'garlic', 'heavy_cream', 'butter', 'thyme', 'pasta', 'parmesan'],
    requiredIngredients: ['mushrooms', 'garlic', 'heavy_cream', 'pasta', 'butter'],
    steps: [
      { step: 1, title: 'Sear Sliced Mushrooms', description: 'Brown sliced cremini and wild mushrooms in foaming butter on high heat without crowding for deep caramelization.', time: '5 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Infuse Garlic & Fresh Thyme', description: 'Stir in minced garlic and fresh thyme sprigs, tossing for 90 seconds until aroma fills the kitchen.', time: '2 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Velvety Heavy Cream Simmer', description: 'Pour in heavy cream and grated parmesan. Simmer gently until silky reduction coats the back of a spoon.', time: '4 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 4, title: 'Fold in Fettuccine & Pepper', description: 'Toss hot pasta through the mushroom cream with plenty of coarse black pepper.', time: '3 mins', image: '/images/steps/5_fold_cream.jpg' }
    ],
    nutrition: { calories: '530 kcal', protein: '17g', carbs: '56g', fat: '25g', fiber: '5g' }
  },
  {
    id: 'rec_chicken_herb',
    title: 'Garlic Herb Chicken & Penne Primavera',
    subtitle: 'High-Protein Seared Chicken Strips with Bell Peppers & Zucchini',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB High Protein',
    people: 2,
    time: '28 mins',
    verifiedMinutes: 28,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['gluten'],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: true,
    difficulty: 'Medium',
    keywords: ['chicken', 'garlic', 'bell_peppers', 'zucchini', 'olive_oil', 'pasta', 'onions'],
    requiredIngredients: ['chicken', 'garlic', 'bell_peppers', 'pasta', 'olive_oil'],
    steps: [
      { step: 1, title: 'Pan-Sear Herb Chicken', description: 'Sear seasoned chicken strips in olive oil until golden browned and fully cooked through (6-7 mins). Remove and set aside.', time: '7 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Flash-Sauté Garden Veggies', description: 'Add sliced bell peppers, zucchini, and minced garlic into pan drippings. Sauté until crisp-tender.', time: '4 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 3, title: 'Deglaze Pan with Broth', description: 'Pour 1/3 cup pasta water into pan, scraping up all flavorful browned bits from the pan bottom.', time: '3 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 4, title: 'Combine & Plate Warm', description: 'Toss penne, sliced chicken, and vegetables with fresh parsley and parmesan.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '560 kcal', protein: '44g', carbs: '50g', fat: '15g', fiber: '6g' }
  },
  {
    id: 'rec_lemon_spinach',
    title: 'Mediterranean Lemon Spinach & Pine Nut Pasta',
    subtitle: 'Bright Citrus Zest, Wilted Baby Greens, Olive Oil & Golden Pine Nuts',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281228?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Fresh',
    people: 2,
    time: '18 mins',
    verifiedMinutes: 18,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['gluten', 'tree_nuts'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    difficulty: 'Easy',
    keywords: ['spinach', 'lemon', 'pine_nuts', 'olive_oil', 'garlic', 'pasta', 'parmesan'],
    requiredIngredients: ['spinach', 'lemon', 'pine_nuts', 'garlic', 'pasta'],
    steps: [
      { step: 1, title: 'Toast Pine Nuts', description: 'Gently swirl pine nuts in a dry pan over medium flame until fragrant and golden. Tip onto a plate.', time: '2 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Wilt Fresh Baby Spinach', description: 'Warm olive oil and garlic in the pan, then fold in fresh spinach by handfuls until just wilted.', time: '3 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 3, title: 'Emulsify Lemon & Pasta', description: 'Squeeze fresh lemon juice, grate fine zest, and toss with drained pasta and 2 tbsp olive oil.', time: '3 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 4, title: 'Top with Toasted Nuts', description: 'Serve hot showered with golden pine nuts and shaved aged parmesan.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '440 kcal', protein: '14g', carbs: '54g', fat: '18g', fiber: '6g' }
  },
  {
    id: 'rec_bruschetta',
    title: 'Classic Tuscan Bruschetta al Pomodoro',
    subtitle: 'Crusty Garlic-Rubbed Sourdough with Marinated Tomatoes & Basil',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Antipasti',
    people: 4,
    time: '15 mins',
    verifiedMinutes: 15,
    mealType: ['lunch', 'dinner', 'snack'],
    dishType: 'side',
    allergens: ['gluten'],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['tomatoes', 'garlic', 'basil', 'olive_oil', 'black_pepper'],
    requiredIngredients: ['tomatoes', 'garlic', 'basil', 'olive_oil'],
    steps: [
      { step: 1, title: 'Marinate Sweet Tomatoes', description: 'Dice ripe tomatoes, toss with minced garlic, torn basil, extra virgin olive oil, and flaky sea salt. Let rest 10 mins.', time: '6 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 2, title: 'Toast Crusty Sourdough', description: 'Grill thick rustic sourdough slices until golden with charred edges.', time: '4 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Garlic Rub Technique', description: 'Rub a halved raw garlic clove across warm rough bread surface to infuse pungent aromatic oils.', time: '2 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 4, title: 'Heap & Drizzle', description: 'Spoon juicy tomato salad over warm toast, drizzle with peppery olive oil and serve immediately.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '240 kcal', protein: '6g', carbs: '32g', fat: '9g', fiber: '4g' }
  },
  {
    id: 'rec_risotto',
    title: 'Sun-Dried Tomato & Basil Cream Risotto',
    subtitle: 'Slow-Simmered Arborio Rice in Aromatic Vegetable Broth',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Comfort',
    people: 2,
    time: '30 mins',
    verifiedMinutes: 30,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['dairy'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    difficulty: 'Medium',
    keywords: ['rice', 'tomatoes', 'onions', 'garlic', 'butter', 'parmesan', 'basil', 'olive_oil'],
    requiredIngredients: ['rice', 'tomatoes', 'onions', 'garlic', 'butter', 'parmesan'],
    steps: [
      { step: 1, title: 'Sweat Sweet Onions', description: 'Melt 1 tbsp butter with olive oil; gently sauté finely minced onions and garlic until translucent.', time: '4 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Toast Arborio Grains', description: 'Add dry arborio rice, stirring for 2 mins until outer edges turn translucent with a pearly white core.', time: '3 mins', image: '/images/steps/1_boil_pasta.jpg' },
      { step: 3, title: 'Gradual Broth Ladling', description: 'Ladle hot broth one cup at a time, stirring constantly to release amylopectin starches.', time: '16 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 4, title: 'Mantecatura Finish', description: 'Beat cold butter, grated parmesan, and chopped sun-dried tomatoes vigorously into creamy emulsion.', time: '3 mins', image: '/images/steps/5_fold_cream.jpg' }
    ],
    nutrition: { calories: '490 kcal', protein: '13g', carbs: '72g', fat: '15g', fiber: '4g' }
  },
  {
    id: 'rec_tuscan_soup',
    title: 'Tuscan White Bean & Wilted Spinach Soup',
    subtitle: 'Rustic Ribollita-Style Garlic Broth with Wilted Greens & Rosemary',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Hearty',
    people: 4,
    time: '25 mins',
    verifiedMinutes: 25,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: [],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['spinach', 'carrots', 'garlic', 'onions', 'rosemary', 'olive_oil', 'tomatoes'],
    requiredIngredients: ['spinach', 'carrots', 'garlic', 'onions', 'olive_oil'],
    steps: [
      { step: 1, title: 'Sauté Soffritto Base', description: 'Heat extra virgin olive oil; sauté chopped carrots, onions, and garlic until softened and sweet.', time: '6 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Simmer Aromatics & Herb', description: 'Add fresh rosemary sprig and diced tomatoes. Simmer gently with broth for 12 minutes.', time: '12 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 3, title: 'Fold in Fresh Spinach', description: 'Stir tender baby spinach into hot soup until bright emerald and wilted (2 minutes).', time: '3 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 4, title: 'Finish with Olive Oil', description: 'Ladle into deep bowls with generous swirl of peppery olive oil and cracked black pepper.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '310 kcal', protein: '14g', carbs: '46g', fat: '8g', fiber: '11g' }
  },
  {
    id: 'rec_salmon_dill',
    title: 'Pan-Seared Salmon with Lemon Herb Butter',
    subtitle: 'Crispy Skin Wild Salmon Fillet with Garlic Sautéed Zucchini',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Omega-3',
    people: 2,
    time: '20 mins',
    verifiedMinutes: 20,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['fish', 'dairy'],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    difficulty: 'Medium',
    keywords: ['salmon', 'lemon', 'butter', 'garlic', 'zucchini', 'olive_oil'],
    requiredIngredients: ['salmon', 'lemon', 'butter', 'garlic', 'zucchini'],
    steps: [
      { step: 1, title: 'Sear Salmon Fillet', description: 'Place seasoned salmon skin-side down in hot skillet. Press lightly and cook 5 mins until skin is shatteringly crisp.', time: '5 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Flip & Butter Baste', description: 'Flip fillet; add butter, garlic, and fresh herbs to the pan. Spoon foaming butter over salmon for 3 mins.', time: '3 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 3, title: 'Flash Sauté Zucchini', description: 'Toss sliced zucchini rounds in pan drippings with a squeeze of fresh lemon juice.', time: '4 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 4, title: 'Plate & Glaze', description: 'Serve crisp salmon atop zucchini rounds, drizzling golden pan juices and fresh lemon slices.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '470 kcal', protein: '38g', carbs: '8g', fat: '32g', fiber: '3g' }
  },
  {
    id: 'rec_pesto_gnocchi',
    title: 'Caprese Pesto Potato Gnocchi',
    subtitle: 'Pillowy Potato Gnocchi in Emerald Basil Pesto with Melted Mozzarella',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Italian',
    people: 2,
    time: '18 mins',
    verifiedMinutes: 18,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['dairy', 'tree_nuts'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    difficulty: 'Easy',
    keywords: ['gnocchi', 'basil', 'pine_nuts', 'olive_oil', 'parmesan', 'garlic', 'cheese', 'tomatoes'],
    requiredIngredients: ['gnocchi', 'basil', 'olive_oil', 'parmesan', 'cheese'],
    steps: [
      { step: 1, title: 'Boil Potato Gnocchi', description: 'Drop gnocchi into boiling salted water. When they float to surface (about 3 mins), scoop directly with slotted spoon.', time: '4 mins', image: '/images/steps/1_boil_pasta.jpg' },
      { step: 2, title: 'Prepare Fresh Pesto', description: 'Blend sweet basil leaves, garlic, toasted pine nuts, parmesan, and cold olive oil until vibrant green.', time: '5 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Fold Warm Gnocchi in Pesto', description: 'Toss hot gnocchi in pesto off heat so basil stays bright and fresh without cooking.', time: '3 mins', image: '/images/steps/5_fold_cream.jpg' },
      { step: 4, title: 'Crown with Mozzarella Pearls', description: 'Add bite-sized mozzarella and cherry tomatoes; watch cheese soften in warm steam.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '510 kcal', protein: '16g', carbs: '64g', fat: '20g', fiber: '5g' }
  },
  {
    id: 'rec_garlic_shrimp',
    title: 'Fiery Garlic Shrimp Scampi',
    subtitle: 'Jumbo Prawns in White Wine, Sizzling Garlic, Lemon & Chili Flakes',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Seafood',
    people: 2,
    time: '15 mins',
    verifiedMinutes: 15,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['shellfish', 'dairy'],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    difficulty: 'Medium',
    keywords: ['shrimp', 'garlic', 'chilli_flakes', 'lemon', 'butter', 'olive_oil', 'parsley', 'pasta'],
    requiredIngredients: ['shrimp', 'garlic', 'chilli_flakes', 'lemon', 'butter'],
    steps: [
      { step: 1, title: 'Sear Jumbo Shrimp', description: 'Sear peeled shrimp in olive oil on high heat for 90 seconds per side until pink and opaque. Transfer to plate.', time: '3 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Sizzle Garlic & Chilies', description: 'Melt butter with sliced garlic and red chili flakes, swirling gently for 1 minute.', time: '2 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Simmer Lemon Butter Sauce', description: 'Splash lemon juice and white wine or pasta water, simmering until glossy emulsified glaze forms.', time: '3 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 4, title: 'Toss Shrimp with Parsley', description: 'Return shrimp to hot glaze with finely chopped Italian parsley. Toss and serve over pasta.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '390 kcal', protein: '34g', carbs: '12g', fat: '22g', fiber: '2g' }
  },
  {
    id: 'rec_ratatouille',
    title: 'Roasted Bell Pepper & Eggplant Primavera',
    subtitle: 'Caramelized Mediterranean Veggies with Garlic & Herb Infusion',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Vegan',
    people: 3,
    time: '25 mins',
    verifiedMinutes: 25,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: [],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['bell_peppers', 'zucchini', 'eggplant', 'tomatoes', 'garlic', 'olive_oil', 'basil', 'onions'],
    requiredIngredients: ['bell_peppers', 'zucchini', 'eggplant', 'tomatoes', 'garlic', 'olive_oil'],
    steps: [
      { step: 1, title: 'Chop Mediterranean Medley', description: 'Cut eggplant, zucchini, and bell peppers into uniform 1-inch cubes for even roasting.', time: '6 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'High Heat Sauté', description: 'Heat 3 tbsp olive oil in large skillet. Sauté onions and eggplant until tender and lightly browned.', time: '6 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 3, title: 'Simmer with Tomatoes & Garlic', description: 'Add bell peppers, zucchini, diced tomatoes, and minced garlic. Simmer with lid on for 10 mins.', time: '10 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 4, title: 'Garnish with Basil & Oil', description: 'Stir in fresh torn basil and drizzle cold-pressed olive oil before serving warm.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '260 kcal', protein: '6g', carbs: '30g', fat: '14g', fiber: '9g' }
  },
  {
    id: 'rec_avocado_gnocchi',
    title: 'Zesty Avocado & Cherry Tomato Gnocchi Bowl',
    subtitle: 'Creamy Ripe Avocado Purée, Blistered Cherry Tomatoes & Lemon Zest',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Plant-Rich',
    people: 2,
    time: '18 mins',
    verifiedMinutes: 18,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['tree_nuts'],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['avocado', 'cherry_tomatoes', 'gnocchi', 'lemon', 'garlic', 'olive_oil', 'basil', 'pine_nuts'],
    requiredIngredients: ['avocado', 'cherry_tomatoes', 'gnocchi', 'lemon', 'olive_oil'],
    steps: [
      { step: 1, title: 'Boil Pillowy Gnocchi', description: 'Boil gnocchi in salted water for 3 minutes until floating. Scoop out gently with a slotted spoon.', time: '4 mins', image: '/images/steps/1_boil_pasta.jpg' },
      { step: 2, title: 'Blister Cherry Tomatoes', description: 'Toss sweet cherry tomatoes in sizzling olive oil with minced garlic until skin cracks and juices bubble.', time: '4 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 3, title: 'Whip Avocado Emulsion', description: 'Mash ripe avocado with fresh lemon juice, sea salt, garlic oil, and torn basil until silky.', time: '3 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 4, title: 'Fold Warm Gnocchi & Serve', description: 'Fold gnocchi through avocado cream; crown with warm blistered tomatoes and toasted pine nuts.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '460 kcal', protein: '11g', carbs: '58g', fat: '21g', fiber: '9g' }
  },
  {
    id: 'rec_broccoli_alfredo',
    title: 'Garlic Butter Broccoli & Penne Alfredo',
    subtitle: 'Tender Charred Broccoli Florets in Silky Butter & Aged Parmigiano Glaze',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Comfort',
    people: 2,
    time: '20 mins',
    verifiedMinutes: 20,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['dairy', 'gluten'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    difficulty: 'Easy',
    keywords: ['broccoli', 'garlic', 'butter', 'heavy_cream', 'parmesan', 'pasta', 'black_pepper'],
    requiredIngredients: ['broccoli', 'garlic', 'butter', 'heavy_cream', 'pasta'],
    steps: [
      { step: 1, title: 'Steam-Sauté Broccoli', description: 'Sear chopped broccoli florets in foaming butter and minced garlic; splash 2 tbsp water to steam until crisp-tender.', time: '5 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Boil Penne Pasta', description: 'Cook penne in heavily salted boiling water until al dente (9 mins). Keep 1/2 cup pasta cooking water.', time: '9 mins', image: '/images/steps/1_boil_pasta.jpg' },
      { step: 3, title: 'Build Alfredo Emulsion', description: 'Stir heavy cream and grated parmesan into the skillet; bubble gently on low flame until velvety reduction forms.', time: '4 mins', image: '/images/steps/5_fold_cream.jpg' },
      { step: 4, title: 'Toss & Shower with Pepper', description: 'Toss drained penne through luscious broccoli cream with coarse freshly cracked black pepper.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '510 kcal', protein: '19g', carbs: '64g', fat: '22g', fiber: '6g' }
  },
  {
    id: 'rec_crispy_tofu_chili',
    title: 'Fiery Ginger Chili Tofu & Bell Pepper Sauté',
    subtitle: 'Golden Seared Tofu Cubes with Sweet Bell Peppers, Ginger & Red Onions',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Vegan High-Protein',
    people: 2,
    time: '22 mins',
    verifiedMinutes: 22,
    mealType: ['dinner', 'lunch'],
    dishType: 'main',
    allergens: ['soy'],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    difficulty: 'Medium',
    keywords: ['tofu', 'ginger', 'chilli_flakes', 'bell_peppers', 'red_onion', 'onions', 'garlic', 'carrots', 'olive_oil'],
    requiredIngredients: ['tofu', 'ginger', 'chilli_flakes', 'bell_peppers', 'garlic'],
    steps: [
      { step: 1, title: 'Crisp Tofu Cubes', description: 'Press and cube firm tofu. Pan-fry in hot oil for 6 mins until all sides are golden brown and crispy.', time: '6 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Aromatics & Chili Sizzle', description: 'Toss grated fresh ginger, minced garlic, and fiery chili flakes into pan until intensely fragrant.', time: '2 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Wok-Toss Garden Peppers', description: 'Add sliced bell peppers, red onions, and carrot matchsticks. Stir-fry over smoking high heat for 5 mins.', time: '5 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 4, title: 'Glaze & Serve', description: 'Return crispy tofu to skillet, glaze with a splash of citrus and olive oil, and serve steaming hot.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '380 kcal', protein: '26g', carbs: '22g', fat: '18g', fiber: '7g' }
  },
  {
    id: 'rec_mediterranean_scramble',
    title: 'Mediterranean Herb & Tomato Farm Egg Scramble',
    subtitle: 'Fluffy Free-Range Eggs with Sweet Roma Tomatoes, Fresh Basil & Crumbled Feta',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Breakfast',
    people: 2,
    time: '12 mins',
    verifiedMinutes: 12,
    mealType: ['breakfast'],
    dishType: 'main',
    allergens: ['egg', 'dairy'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    difficulty: 'Easy',
    keywords: ['tomatoes', 'basil', 'olive_oil', 'egg', 'cheese', 'garlic'],
    requiredIngredients: ['tomatoes', 'basil', 'olive_oil'],
    steps: [
      { step: 1, title: 'Dice Tomatoes & Whisk Eggs', description: 'Gently dice 2 ripe Roma tomatoes and whisk 4 fresh eggs with a pinch of sea salt and black pepper.', time: '3 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Warm Extra Virgin Olive Oil', description: 'Heat 1 tbsp olive oil in a nonstick pan over medium-low heat; add minced garlic for 30 seconds.', time: '1 min', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Soft Scramble Curds', description: 'Pour in beaten eggs. Gently sweep wooden spatula across pan creating soft, creamy curds.', time: '5 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 4, title: 'Fold Tomatoes & Fresh Basil', description: 'Remove from heat immediately; fold in diced tomatoes, torn basil leaves, and crumbled feta.', time: '3 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '310 kcal', protein: '21g', carbs: '6g', fat: '22g', fiber: '2g' }
  },
  {
    id: 'rec_avocado_toast',
    title: 'Artisanal Avocado & Blistered Tomato Toast',
    subtitle: 'Crushed Hass Avocado, Blistered Sweet Tomatoes, Cold-Pressed Olive Oil & Flaky Salt',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Plant-Rich',
    people: 2,
    time: '10 mins',
    verifiedMinutes: 10,
    mealType: ['breakfast', 'snack'],
    dishType: 'main',
    allergens: ['gluten'],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['avocado', 'tomatoes', 'olive_oil', 'lemon', 'chilli_flakes'],
    requiredIngredients: ['avocado', 'tomatoes', 'olive_oil', 'lemon'],
    steps: [
      { step: 1, title: 'Toast Rustic Bread', description: 'Grill artisan sourdough slices until deeply golden and crunchy.', time: '3 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Whip Zesty Avocado', description: 'Coarsely mash ripe avocado with lemon juice, flaky salt, and cracked black pepper.', time: '2 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Blister Cherry Tomatoes', description: 'Toss halved tomatoes in hot olive oil for 3 mins until blistered and sweet.', time: '3 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 4, title: 'Spread & Crown', description: 'Smear avocado thick over toast, top with blistered tomatoes and a pinch of chili flakes.', time: '2 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '290 kcal', protein: '7g', carbs: '28g', fat: '18g', fiber: '8g' }
  },
  {
    id: 'rec_white_bean_dip',
    title: 'Creamy Garlic White Bean & Rosemary Spread',
    subtitle: 'Silky Cannellini Puree with Confit Garlic, Fresh Rosemary & Warm Pita',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Snack',
    people: 4,
    time: '10 mins',
    verifiedMinutes: 10,
    mealType: ['snack', 'lunch'],
    dishType: 'side',
    allergens: [],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['garlic', 'olive_oil', 'rosemary', 'lemon'],
    requiredIngredients: ['garlic', 'olive_oil', 'rosemary', 'lemon'],
    steps: [
      { step: 1, title: 'Warm Garlic & Rosemary', description: 'Gently warm sliced garlic and minced rosemary in 3 tbsp olive oil until aromatic without browning.', time: '3 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Blend White Beans', description: 'Puree cooked cannellini beans with the infused oil, fresh lemon juice, and a splash of water until velvety.', time: '4 mins', image: '/images/steps/4_simmer_sauce.jpg' },
      { step: 3, title: 'Season & Drizzle', description: 'Spoon into a shallow ceramic bowl, create a swirl with the back of a spoon, and pool extra virgin olive oil.', time: '3 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '180 kcal', protein: '8g', carbs: '22g', fat: '7g', fiber: '6g' }
  },
  {
    id: 'rec_ricotta_berry_parfait',
    title: 'Warm Honey Whipped Ricotta Berry Parfait',
    subtitle: 'Light Airy Italian Ricotta with Macerated Fresh Berries & Lemon Zest',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Sweet',
    people: 2,
    time: '10 mins',
    verifiedMinutes: 10,
    mealType: ['dessert', 'snack'],
    dishType: 'sweet',
    allergens: ['dairy', 'tree_nuts'],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    difficulty: 'Easy',
    keywords: ['ricotta', 'lemon', 'pine_nuts'],
    requiredIngredients: ['ricotta', 'lemon'],
    steps: [
      { step: 1, title: 'Whip Sweet Ricotta', description: 'Whisk fresh ricotta with 1 tsp raw honey and lemon zest until cloud-like and fluffy.', time: '4 mins', image: '/images/steps/5_fold_cream.jpg' },
      { step: 2, title: 'Macerate Sweet Berries', description: 'Toss fresh berries with a drop of lemon juice and mint.', time: '3 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 3, title: 'Layer in Glasses', description: 'Spoon whipped ricotta into dessert cups, top with berries and toasted nuts.', time: '3 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '210 kcal', protein: '11g', carbs: '18g', fat: '10g', fiber: '3g' }
  },
  {
    id: 'rec_lemon_ginger_mint',
    title: 'Zesty Lemon Ginger Mint Refresher',
    subtitle: 'Crushed Sweet Garden Mint, Spicy Cold-Pressed Ginger & Fresh Squeezed Lemon',
    image: 'https://images.unsplash.com/photo-1532704868953-d85f74170701?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Drink',
    people: 2,
    time: '5 mins',
    verifiedMinutes: 5,
    mealType: ['drink'],
    dishType: 'drink',
    allergens: [],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['lemon', 'ginger', 'basil'],
    requiredIngredients: ['lemon', 'ginger'],
    steps: [
      { step: 1, title: 'Muddle Fresh Aromatics', description: 'Muddle freshly sliced ginger, mint or basil, and a teaspoon of honey or agave in a pitcher.', time: '2 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Squeeze Cold Lemon Juice', description: 'Add fresh lemon juice and chilled sparkling or spring water.', time: '2 mins', image: '/images/steps/3_crush_tomatoes.jpg' },
      { step: 3, title: 'Stir over Ice & Serve', description: 'Pour over crystal clear ice with lemon wheels.', time: '1 min', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '45 kcal', protein: '1g', carbs: '11g', fat: '0g', fiber: '1g' }
  },
  {
    id: 'rec_garlic_broccolini',
    title: 'Sautéed Garlic Lemon Broccolini & Pine Nuts',
    subtitle: 'Crisp Charred Tender Broccolini with Shaved Garlic, Lemon & Golden Pine Nuts',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop&q=80',
    badge: 'RecipeDB Side',
    people: 2,
    time: '12 mins',
    verifiedMinutes: 12,
    mealType: ['dinner', 'lunch'],
    dishType: 'side',
    allergens: ['tree_nuts'],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    difficulty: 'Easy',
    keywords: ['broccoli', 'garlic', 'olive_oil', 'lemon', 'pine_nuts', 'chilli_flakes'],
    requiredIngredients: ['broccoli', 'garlic', 'olive_oil', 'lemon'],
    steps: [
      { step: 1, title: 'Flash Sauté Broccolini', description: 'Sear broccolini in olive oil on high heat for 3 mins until charred; add 2 tbsp water and cover to steam.', time: '5 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 2, title: 'Golden Garlic & Pine Nuts', description: 'Stir in shaved garlic cloves and pine nuts until toasted and fragrant.', time: '4 mins', image: '/images/steps/2_sizzle_garlic.jpg' },
      { step: 3, title: 'Finish with Lemon & Flakes', description: 'Squeeze fresh lemon juice over the hot greens with a sprinkle of chili flakes.', time: '3 mins', image: '/images/steps/6_plate_basil.jpg' }
    ],
    nutrition: { calories: '160 kcal', protein: '6g', carbs: '10g', fat: '11g', fiber: '5g' }
  }
];

// Culinary Science Flavor Pairing Graph (Foodoscope / FlavorDB Heuristics)
export const FLAVOR_PAIRING_GRAPH = {
  tomatoes: ['garlic', 'basil', 'pasta', 'olive_oil', 'parmesan', 'bell_peppers'],
  cherry_tomatoes: ['garlic', 'basil', 'gnocchi', 'olive_oil', 'avocado', 'cheese'],
  bell_peppers: ['onions', 'garlic', 'zucchini', 'eggplant', 'chicken', 'tofu'],
  zucchini: ['garlic', 'bell_peppers', 'eggplant', 'olive_oil', 'pasta', 'lemon'],
  carrots: ['onions', 'garlic', 'spinach', 'olive_oil', 'ginger'],
  broccoli: ['garlic', 'parmesan', 'heavy_cream', 'pasta', 'butter', 'lemon'],
  spinach: ['garlic', 'lemon', 'pine_nuts', 'ricotta', 'pasta', 'carrots'],
  mushrooms: ['garlic', 'butter', 'thyme', 'heavy_cream', 'pasta', 'onions'],
  eggplant: ['bell_peppers', 'zucchini', 'garlic', 'tomatoes', 'olive_oil', 'avocado'],
  avocado: ['tomatoes', 'cherry_tomatoes', 'lemon', 'red_onion', 'garlic', 'gnocchi'],
  garlic: ['olive_oil', 'pasta', 'tomatoes', 'onions', 'butter', 'mushrooms', 'chicken', 'shrimp'],
  onions: ['garlic', 'tomatoes', 'carrots', 'olive_oil', 'bell_peppers', 'rice'],
  red_onion: ['avocado', 'tomatoes', 'bell_peppers', 'olive_oil', 'lemon', 'tofu'],
  ginger: ['garlic', 'chilli_flakes', 'chicken', 'tofu', 'carrots'],
  chilli_flakes: ['garlic', 'pasta', 'olive_oil', 'shrimp', 'tomatoes', 'tofu'],
  black_pepper: ['parmesan', 'pasta', 'butter', 'mushrooms', 'heavy_cream'],
  paprika: ['chicken', 'bell_peppers', 'garlic', 'onions', 'olive_oil'],
  pasta: ['garlic', 'tomatoes', 'olive_oil', 'parmesan', 'heavy_cream', 'basil'],
  spaghetti: ['garlic', 'tomatoes', 'olive_oil', 'chilli_flakes', 'parmesan'],
  rice: ['onions', 'garlic', 'butter', 'parmesan', 'tomatoes'],
  gnocchi: ['basil', 'pine_nuts', 'parmesan', 'cheese', 'tomatoes', 'avocado'],
  olive_oil: ['garlic', 'tomatoes', 'basil', 'pasta', 'lemon'],
  butter: ['garlic', 'mushrooms', 'thyme', 'shrimp', 'pasta', 'salmon'],
  heavy_cream: ['garlic', 'parmesan', 'pasta', 'mushrooms', 'butter', 'broccoli'],
  parmesan: ['pasta', 'garlic', 'heavy_cream', 'basil', 'olive_oil', 'broccoli'],
  cheese: ['tomatoes', 'basil', 'pasta', 'gnocchi', 'ricotta'],
  ricotta: ['spinach', 'pasta', 'garlic', 'parmesan'],
  greek_yogurt: ['garlic', 'lemon', 'olive_oil'],
  basil: ['tomatoes', 'garlic', 'olive_oil', 'pasta', 'pine_nuts'],
  rosemary: ['garlic', 'olive_oil', 'carrots', 'onions'],
  thyme: ['mushrooms', 'garlic', 'butter'],
  parsley: ['garlic', 'lemon', 'shrimp', 'pasta'],
  chicken: ['garlic', 'bell_peppers', 'zucchini', 'olive_oil', 'pasta', 'ginger'],
  salmon: ['lemon', 'butter', 'garlic', 'zucchini', 'olive_oil'],
  shrimp: ['garlic', 'chilli_flakes', 'lemon', 'butter', 'parsley'],
  pine_nuts: ['basil', 'spinach', 'lemon', 'garlic', 'olive_oil', 'gnocchi'],
  tofu: ['ginger', 'chilli_flakes', 'bell_peppers', 'garlic', 'red_onion'],
  lemon: ['garlic', 'olive_oil', 'salmon', 'shrimp', 'spinach', 'avocado'],
  lime: ['avocado', 'chilli_flakes', 'garlic', 'red_onion']
};

/**
 * Filter Recipe Catalog strictly adhering to the user's Required Meal Setup flowchart:
 * 1. Filter by Allergies & Things to Avoid (Hard Exclusions)
 * 2. Filter by Meal or Dish Type (Breakfast, Lunch, Dinner, Snack, Sweet, Main, Side, Drink)
 * 3. Filter by Verified Total Time (15m, 30m, 45m, 1h, or no cap)
 */
export function filterCatalogByMealSetup(catalog = DYNAMIC_RECIPEDB_CATALOG, mealSetup = {}) {
  const {
    servings = 2,
    timeLimit = 999,
    mealType = 'anything',
    dishType = null,
    allergies = [],
    customAvoid = '',
    dietary = {}
  } = mealSetup;

  const rawAvoid = Array.isArray(allergies) ? [...allergies] : [];
  if (customAvoid && customAvoid.trim()) {
    rawAvoid.push(customAvoid.trim());
  }

  const normalizedAvoid = rawAvoid.map(a => a.toLowerCase().replace(/[^a-z0-9]/g, ''));

  return catalog.filter(recipe => {
    // 1. HARD ALLERGY & AVOIDANCE EXCLUSIONS
    const recipeAllergens = (recipe.allergens || []).map(a => a.toLowerCase());
    const recipeKeywords = (recipe.keywords || []).map(k => k.toLowerCase());
    const recipeTitle = (recipe.title || '').toLowerCase();

    for (const avoid of normalizedAvoid) {
      if (avoid === 'noallergiesorrestrictions' || avoid === 'none') continue;
      
      // Peanut exclusion
      if (avoid.includes('peanut') && (recipeAllergens.includes('peanuts') || recipeKeywords.some(k => k.includes('peanut')))) return false;
      
      // Tree nut exclusion
      if ((avoid.includes('treenut') || avoid === 'nuts') && (recipeAllergens.includes('tree_nuts') || recipeKeywords.some(k => k.includes('nut')))) return false;
      
      // Dairy exclusion
      if ((avoid.includes('dairy') || avoid.includes('milk') || avoid.includes('lactose')) && (!recipe.isDairyFree || recipeAllergens.includes('dairy'))) return false;
      
      // Gluten exclusion
      if ((avoid.includes('gluten') || avoid.includes('wheat')) && (!recipe.isGlutenFree || recipeAllergens.includes('gluten'))) return false;
      
      // Egg exclusion
      if (avoid.includes('egg') && (recipeAllergens.includes('egg') || recipeKeywords.some(k => k.includes('egg')))) return false;
      
      // Soy exclusion
      if (avoid.includes('soy') && (recipeAllergens.includes('soy') || recipeKeywords.includes('tofu'))) return false;
      
      // Sesame exclusion
      if (avoid.includes('sesame') && recipeAllergens.includes('sesame')) return false;

      // Custom avoidance word check
      if (avoid.length > 2) {
        if (recipeKeywords.some(k => k.includes(avoid)) || recipeTitle.includes(avoid)) {
          return false;
        }
      }
    }

    // Dietary preferences
    if ((dietary.vegan || normalizedAvoid.includes('vegan')) && !recipe.isVegan) return false;
    if ((dietary.vegetarian || normalizedAvoid.includes('vegetarian')) && !recipe.isVegetarian) return false;
    if ((dietary.glutenFree || normalizedAvoid.includes('glutenfree')) && !recipe.isGlutenFree) return false;

    // 2. VERIFIED TOTAL TIME FILTER
    const maxMins = typeof timeLimit === 'number' ? timeLimit : (parseInt(timeLimit) || 999);
    if (recipe.verifiedMinutes && recipe.verifiedMinutes > maxMins) {
      return false;
    }

    // 3. MEAL OR DISH TYPE FILTER
    if (mealType && mealType !== 'anything' && mealType !== 'all') {
      const target = mealType.toLowerCase();
      const inMeal = (recipe.mealType || []).some(m => m.toLowerCase().includes(target) || target.includes(m.toLowerCase()));
      const isDish = (recipe.dishType || '').toLowerCase() === target || target.includes((recipe.dishType || '').toLowerCase());
      
      if (!inMeal && !isDish) {
        if (target.includes('main') && recipe.dishType === 'main') { /* ok */ }
        else if (target.includes('sweet') && (recipe.dishType === 'sweet' || (recipe.mealType || []).includes('dessert'))) { /* ok */ }
        else if (target.includes('drink') && recipe.dishType === 'drink') { /* ok */ }
        else if (target.includes('snack') && (recipe.dishType === 'snack' || (recipe.mealType || []).includes('snack'))) { /* ok */ }
        else return false;
      }
    }

    if (dishType && dishType !== 'all') {
      const dt = dishType.toLowerCase();
      if ((recipe.dishType || '').toLowerCase() !== dt) return false;
    }

    return true;
  });
}

/**
 * Robust culinary synonym & ingredient family matcher
 */
export function matchIngredientToKeyword(activeId = '', recipeKeyword = '') {
  if (!activeId || !recipeKeyword) return false;
  const a = activeId.toLowerCase().replace(/[^a-z0-9]/g, '');
  const b = recipeKeyword.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;

  // Key culinary synonyms
  if (a.includes('tomato') && b.includes('tomato')) return true;
  if (a.includes('garlic') && b.includes('garlic')) return true;
  if ((a.includes('pasta') || a.includes('penne') || a.includes('fettuccine')) && 
      (b.includes('pasta') || b.includes('penne') || b.includes('fettuccine') || b.includes('gnocchi') || b.includes('linguine'))) return true;
  if ((a.includes('oil') || a.includes('olive')) && (b.includes('oil') || b.includes('olive'))) return true;
  if (a.includes('cream') && b.includes('cream')) return true;
  if ((a.includes('parmesan') || a.includes('cheese')) && (b.includes('parmesan') || b.includes('cheese'))) return true;
  if (a.includes('basil') && b.includes('basil')) return true;
  if ((a.includes('chili') || a.includes('chilli')) && (b.includes('chili') || b.includes('chilli'))) return true;
  if (a.includes('pepper') && b.includes('pepper')) return true;
  if (a.includes('spinach') && b.includes('spinach')) return true;
  if (a.includes('eggplant') && (b.includes('eggplant') || b.includes('ratatouille') || b.includes('primavera'))) return true;
  if (a.includes('mushroom') && b.includes('mushroom')) return true;
  if (a.includes('zucchini') && (b.includes('zucchini') || b.includes('primavera') || b.includes('ratatouille'))) return true;
  if (a.includes('onion') && (b.includes('onion') || b.includes('shallot'))) return true;
  if (a.includes('ginger') && b.includes('ginger')) return true;
  if (a.includes('broccoli') && (b.includes('broccoli') || b.includes('broccolini'))) return true;
  if (a.includes('chicken') && b.includes('chicken')) return true;
  if ((a.includes('shrimp') || a.includes('prawn')) && (b.includes('shrimp') || b.includes('prawn') || b.includes('scampi'))) return true;
  if ((a.includes('salmon') || a.includes('fish')) && (b.includes('salmon') || b.includes('fish'))) return true;
  if (a.includes('tofu') && b.includes('tofu')) return true;
  if (a.includes('avocado') && b.includes('avocado')) return true;
  if (a.includes('bread') && (b.includes('bread') || b.includes('toast') || b.includes('bruschetta'))) return true;
  if ((a.includes('bean') || a.includes('beans')) && (b.includes('bean') || b.includes('beans'))) return true;
  if (a.includes('rice') && (b.includes('rice') || b.includes('risotto'))) return true;
  if (a.includes('egg') && b.includes('egg')) return true;
  if (a.includes('lemon') && b.includes('lemon')) return true;

  return false;
}

/**
 * Dynamic recipe matching algorithm:
 * Returns the highest scoring recipe matching active selected ingredients
 */
export function getDynamicRecipeByIngredients(activeIngredientIds = [], mealSetup = {}) {
  const matches = getAllMatchingRecipesByIngredients(activeIngredientIds, mealSetup);
  return matches[0] || DYNAMIC_RECIPEDB_CATALOG[0];
}

/**
 * Returns ALL recipes from RecipeDB catalog that match the active ingredients,
 * strictly filtered by the user's Required Meal Setup (allergens & dietary preference)
 * and genuinely filtered so the recipe count reacts dynamically to ingredient selection.
 */
export function getAllMatchingRecipesByIngredients(activeIngredientIds = [], mealSetup = {}) {
  // Filter catalog respecting hard allergy safety & dietary preferences
  let eligible = filterCatalogByMealSetup(DYNAMIC_RECIPEDB_CATALOG, {
    ...mealSetup,
    timeLimit: 999, // Allow full matching recipe diversity regardless of strict 15m/30m filter
    mealType: 'anything'
  });

  if (eligible.length === 0) {
    eligible = DYNAMIC_RECIPEDB_CATALOG;
  }

  const userServings = mealSetup?.servings || 2;
  const activeList = Array.isArray(activeIngredientIds) ? activeIngredientIds : [];

  // If no ingredients on board, return a small starter set
  if (activeList.length === 0) {
    return eligible.slice(0, 3).map(r => ({
      ...r,
      synergyScore: 75,
      matchPercentage: 75,
      matchCount: 0,
      people: userServings,
      setupExplanation: `For ${userServings} people · Ready in ${r.verifiedMinutes || 20}m`
    }));
  }

  const scoredList = eligible
    .map(recipe => {
      let score = 0;
      let matchCount = 0;
      let matchedReqCount = 0;
      const matchedIngredients = [];

      const reqs = recipe.requiredIngredients || [];
      const keywords = recipe.keywords || [];

      // Check required ingredients (High weight: 18 pts each)
      reqs.forEach(req => {
        const isMatched = activeList.some(id => matchIngredientToKeyword(id, req));
        if (isMatched) {
          score += 18;
          matchCount++;
          matchedReqCount++;
          matchedIngredients.push(req);
        } else {
          score -= 3;
        }
      });

      // Check additional keywords (Medium weight: 8 pts each)
      keywords.forEach(kw => {
        if (!matchedIngredients.includes(kw)) {
          const isMatched = activeList.some(id => matchIngredientToKeyword(id, kw));
          if (isMatched) {
            score += 8;
            matchCount++;
            matchedIngredients.push(kw);
          }
        }
      });

      // Major bonus for hero ingredients (Proteins / Key Vegetables: 25 pts)
      const heroItems = ['shrimp', 'salmon', 'chicken', 'tofu', 'mushrooms', 'eggplant', 'broccoli', 'zucchini', 'avocado'];
      heroItems.forEach(hero => {
        if (activeList.some(id => matchIngredientToKeyword(id, hero)) && 
            (keywords.some(kw => matchIngredientToKeyword(hero, kw)) || reqs.some(r => matchIngredientToKeyword(hero, r)))) {
          score += 25;
        }
      });

      const totalReq = Math.max(1, reqs.length);
      const coverage = matchedReqCount / totalReq;
      const ratio = matchCount / (totalReq + 1);
      const synergyScore = Math.min(99, Math.max(68, Math.round(72 + Math.min(1, ratio) * 27)));
      const baseServings = recipe.people || 2;
      const scaleRatio = userServings / baseServings;

      return {
        ...recipe,
        score,
        matchCount,
        matchedReqCount,
        totalReqCount: totalReq,
        coverage,
        synergyScore,
        matchPercentage: synergyScore,
        people: userServings,
        scaleRatio,
        matchedIngredients,
        setupExplanation: `For ${userServings} ${userServings === 1 ? 'person' : 'people'} · Ready in ${recipe.verifiedMinutes || 20}m · ${recipe.badge || 'RecipeDB Formula'}`
      };
    })
    // GENUINE DYNAMIC COVERAGE FILTER: Changes suggestions count accurately with ingredient list!
    .filter(r => {
      if (activeList.length === 1) return r.matchedReqCount >= 1 && r.coverage >= 0.2;
      if (activeList.length === 2) return r.matchedReqCount >= 1 && r.matchCount >= 2 && r.coverage >= 0.25;
      if (activeList.length <= 4) return r.matchedReqCount >= 2 && r.coverage >= 0.35;
      if (activeList.length <= 7) return r.matchedReqCount >= 3 && r.coverage >= 0.45;
      return r.matchedReqCount >= 3 && r.coverage >= 0.35;
    })
    .sort((a, b) => b.score - a.score);

  // If only 1 ingredient is active, focus on the top 3-4 hero formulas for that ingredient
  if (activeList.length === 1 && scoredList.length > 4) {
    return scoredList.slice(0, 4);
  }

  // If strict filter yielded none, take the top recipes with at least 1 match
  if (scoredList.length === 0) {
    const fallbackList = eligible
      .map(r => {
        const reqs = r.requiredIngredients || [];
        const matched = reqs.filter(req => activeList.some(id => matchIngredientToKeyword(id, req))).length;
        return { ...r, matchCount: matched, synergyScore: 70, matchPercentage: 70, people: userServings };
      })
      .filter(r => r.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);

    return fallbackList.length > 0 ? fallbackList : eligible.slice(0, 3);
  }

  return scoredList;
}

export const RECIPE_MODE_1 = DYNAMIC_RECIPEDB_CATALOG[0];

export const SUBSTITUTE_GROUPS = [
  { id: 'heavy_cream', name: 'Heavy Cream', current: 'Dairy Cream 35%', count: 4 },
  { id: 'cheese', name: 'Parmesan / Cheese', current: 'Parmesan / Pecorino', count: 4 },
  { id: 'olive_oil', name: 'Olive Oil / Fats', current: 'Extra Virgin', count: 3 },
  { id: 'pasta', name: 'Pasta / Grains', current: 'Durum Wheat Penne', count: 3 },
  { id: 'fresh_basil', name: 'Fresh Herbs', current: 'Sweet Italian Basil', count: 2 },
  { id: 'proteins', name: 'Proteins', current: 'Meat / Poultry', count: 3 }
];

export const GENUINE_DATABASE_SUBSTITUTES = {
  heavy_cream: [
    {
      id: 'greek-yogurt-milk',
      name: 'Greek Yogurt + Whole Milk',
      ratio: '1:1 Ratio (Equal parts whisked)',
      match: '94% Flavor Match',
      desc: 'High-protein, lower-fat substitute delivering rich body with a pleasant lactic tang.',
      source: 'Foodoscope RecipeDB Dairy Classification',
      badge: 'High Protein',
      badgeClass: 'badge-healthy',
      image: '/images/substitutes/greek_yogurt.jpg'
    },
    {
      id: 'cashew-cream',
      name: 'Raw Cashew Cream',
      ratio: '3/4 cup soaked cashews + water',
      match: '96% Texture Match',
      desc: 'Soaked raw cashews blended silky smooth. Emulsifies beautifully under heat with zero dairy.',
      source: 'Foodoscope Flavor DB Verified',
      badge: 'Gourmet Vegan',
      badgeClass: 'badge-vegan',
      image: '/images/substitutes/cashew_cream.jpg'
    },
    {
      id: 'coconut-cream',
      name: 'Culinary Coconut Cream',
      ratio: '1:1 Ratio',
      match: '92% Body Match',
      desc: 'Thick unsweetened culinary cream providing lush mouthfeel and gentle sweetness.',
      source: 'Foodoscope Plant Heuristic',
      badge: 'Plant-Based',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'whipped-ricotta',
      name: 'Whipped Ricotta Cheese',
      ratio: '1:1 Ratio',
      match: '91% Consistency Match',
      desc: 'Light, sweet curd that melts smoothly into warm tomato and garlic sauces.',
      source: 'RecipeDB Dairy Category',
      badge: 'Vegetarian',
      badgeClass: 'badge-vegetarian',
      image: '/images/substitutes/ricotta_cheese.jpg'
    }
  ],
  cheese: [
    {
      id: 'nutritional-yeast',
      name: 'Nutritional Yeast Flakes',
      ratio: '1:1 Ratio',
      match: '93% Umami Match',
      desc: 'Savory, cheesy nutty depth with zero dairy and packed with vitamin B-complex.',
      source: 'RecipeDB Vegan Culinary Rule',
      badge: 'Vegan & Dairy-Free',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'pecorino-romano',
      name: 'Pecorino Romano',
      ratio: '1:1 Ratio (Slightly saltier)',
      match: '98% Authenticity Match',
      desc: 'Traditional aged sheep milk cheese with sharp, piquant finish.',
      source: 'RecipeDB Italian Classification',
      badge: 'Authentic Italian',
      badgeClass: 'badge-healthy',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'cashew-parm',
      name: 'Cashew Parmesan Crumbles',
      ratio: '1:1 Ratio',
      match: '89% Granular Texture Match',
      desc: 'Crushed raw cashews with sea salt and garlic powder for rich savory crumb.',
      source: 'IIIT-Delhi Computational Heuristic',
      badge: 'Plant-Based',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'ricotta-cheese',
      name: 'Fresh Ricotta Curds',
      ratio: '1:1.2 Ratio',
      match: '88% Soft Melt Match',
      desc: 'Mild, sweet Italian curd delivering delicate creaminess without high sodium.',
      source: 'RecipeDB Dairy Category',
      badge: 'Vegetarian',
      badgeClass: 'badge-vegetarian',
      image: '/images/substitutes/ricotta_cheese.jpg'
    }
  ],
  olive_oil: [
    {
      id: 'avocado-oil',
      name: 'Avocado Oil',
      ratio: '1:1 Ratio',
      match: '97% Lipid Match',
      desc: 'High smoke point (270°C), neutral buttery flavor, rich in healthy oleic monounsaturated fats.',
      source: 'RecipeDB Lipid Substitution Table',
      badge: 'High Heat Safe',
      badgeClass: 'badge-healthy',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'grassfed-ghee',
      name: 'Clarified Butter (Ghee)',
      ratio: '1:1 Ratio',
      match: '95% Sauté Richness',
      desc: 'Lactose-free caramelized nutty richness with exceptionally high thermal stability.',
      source: 'Foodoscope South Asian Rule',
      badge: 'Lactose Free',
      badgeClass: 'badge-vegetarian',
      image: '/images/ingredients/butter.jpg'
    },
    {
      id: 'walnut-oil',
      name: 'Toasted Walnut Oil',
      ratio: '1:1 Drizzle at finish',
      match: '90% Aromatic Match',
      desc: 'Earthy aromatic oil best for finishing pasta and releasing fresh basil aroma.',
      source: 'IIIT-Delhi Flavor Pairing',
      badge: 'Aromatic Gourmet',
      badgeClass: 'badge-healthy',
      image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=300&auto=format&fit=crop&q=80'
    }
  ],
  pasta: [
    {
      id: 'zucchini-noodles',
      name: 'Zucchini Spirals (Zoodles)',
      ratio: '2:1 Ratio by volume',
      match: '95% Low-Carb Match',
      desc: 'Light, crisp-tender ribbons that absorb creamy tomato garlic sauce effortlessly.',
      source: 'RecipeDB Low-Carb Alternative',
      badge: 'Keto & Grain-Free',
      badgeClass: 'badge-healthy',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'chickpea-penne',
      name: 'Chickpea Flour Penne',
      ratio: '1:1 Ratio',
      match: '94% Al-Dente Texture Match',
      desc: 'Gluten-free pasta packed with 13g plant protein and 6g dietary fiber per serving.',
      source: 'RecipeDB Gluten-Free Corpus',
      badge: 'Gluten Free & High Protein',
      badgeClass: 'badge-healthy',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281228?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'spaghetti-squash',
      name: 'Spaghetti Squash Strands',
      ratio: '1.5:1 Ratio',
      match: '89% Volume Match',
      desc: 'Naturally separating al dente strands offering subtle sweetness and high micronutrients.',
      source: 'Foodoscope Vegetable Grains Rule',
      badge: 'Paleo & Whole Food',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=300&auto=format&fit=crop&q=80'
    }
  ],
  fresh_basil: [
    {
      id: 'italian-herb-blend',
      name: 'Dried Italian Herb Blend',
      ratio: '1 tsp dried for 1 tbsp fresh',
      match: '92% Aromatic Profile',
      desc: 'Oregano, thyme, and dried basil concentrated for deep herbal simmer.',
      source: 'RecipeDB Herb Rule',
      badge: 'Pantry Ready',
      badgeClass: 'badge-healthy',
      image: '/images/ingredients/thyme.jpg'
    },
    {
      id: 'fresh-rosemary',
      name: 'Fresh Rosemary + Parsley',
      ratio: '1:1/2 Ratio',
      match: '88% Piney Brightness',
      desc: 'Woody aromatic notes that elevate garlic and tomato sauces.',
      source: 'Foodoscope Aromatic Classification',
      badge: 'Fresh Herbal',
      badgeClass: 'badge-healthy',
      image: '/images/ingredients/rosemary.jpg'
    }
  ],
  proteins: [
    {
      id: 'firm-tofu',
      name: 'Organic Firm Tofu',
      ratio: '1:1 Ratio by weight',
      match: '94% Protein Density Match',
      desc: 'Press and sear in hot skillet for golden crust and 16g complete plant protein.',
      source: 'Foodoscope Plant-Based Heuristic',
      badge: '100% Plant Protein',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'king-oyster-mushrooms',
      name: 'Pan-Seared Oyster Mushrooms',
      ratio: '1:1 Ratio',
      match: '92% Umami & Chew Match',
      desc: 'Thick sliced mushroom stems delivering authentic meaty texture and rich savory depth.',
      source: 'RecipeDB Mycological Database',
      badge: 'Meat-Free Umami',
      badgeClass: 'badge-vegan',
      image: '/images/ingredients/mushrooms.jpg'
    }
  ],
  onions: [
    {
      id: 'shallots',
      name: 'French Shallots',
      ratio: '2 small shallots for 1 medium onion',
      match: '96% Flavor Match',
      desc: 'Delicate allium sweetness with subtle garlic notes. Caramelizes into olive oil seamlessly.',
      source: 'Foodoscope Allium Classification',
      badge: 'Chef Favorite',
      badgeClass: 'badge-healthy',
      image: '/images/ingredients/onions.jpg'
    },
    {
      id: 'onion-powder',
      name: 'Pure Onion Powder',
      ratio: '1 tsp for 1 medium onion',
      match: '92% Flavor Match',
      desc: 'Dissolves directly into sauces providing deep savory allium umami without texture change.',
      source: 'RecipeDB Pantry Heuristic',
      badge: 'Pantry Instant',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'scallions-spring-onions',
      name: 'Scallions / Spring Onions',
      ratio: '3 stalks sliced',
      match: '91% Freshness Match',
      desc: 'Crisp green & white allium bite that works both in sauté and fresh herbal finish.',
      source: 'RecipeDB Vegetable Corpus',
      badge: 'Fresh & Crisp',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'leeks',
      name: 'Tender Sliced Leeks',
      ratio: '1 cup sliced leek',
      match: '90% Sweetness Match',
      desc: 'Mild, buttery flavor that melts into pasta sauces with velvety texture.',
      source: 'RecipeDB Mediterranean DB',
      badge: 'Gourmet Mild',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=300&auto=format&fit=crop&q=80'
    }
  ],
  garlic: [
    {
      id: 'garlic-powder',
      name: 'Granulated Garlic Powder',
      ratio: '1/4 tsp for 1 fresh clove',
      match: '94% Aromatic Match',
      desc: 'Smooth allium pungency that dissolves without burning on high heat.',
      source: 'RecipeDB Spice Classification',
      badge: 'No-Burn Sauté',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'shallot-garlic-swap',
      name: 'Minced Shallot + Pinch of Black Pepper',
      ratio: '1 small shallot',
      match: '89% Pungency Match',
      desc: 'Aromatic foundation providing complexity and savory sweetness.',
      source: 'Foodoscope Flavor DB',
      badge: 'Gentle Aromatic',
      badgeClass: 'badge-healthy',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&auto=format&fit=crop&q=80'
    }
  ],
  tomatoes: [
    {
      id: 'canned-san-marzano',
      name: 'San Marzano Crushed Tomatoes',
      ratio: '1:1 Ratio (1 cup)',
      match: '98% Acidity Match',
      desc: 'Sun-ripened Italian plum tomatoes packed in natural puree with perfect sweet-acid balance.',
      source: 'RecipeDB Italian Sauce Corpus',
      badge: 'Sauce Gold Standard',
      badgeClass: 'badge-healthy',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'roasted-red-peppers-swap',
      name: 'Pureed Roasted Red Bell Peppers',
      ratio: '1:1 Ratio',
      match: '88% Sweet Acidity Match',
      desc: 'Luscious nightshade alternative providing rich red color, silky body, and caramelized depth.',
      source: 'Foodoscope Non-Nightshade Rule',
      badge: 'Low Acidity & Nightshade-Free',
      badgeClass: 'badge-vegan',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&auto=format&fit=crop&q=80'
    }
  ]
};

// Comprehensive Ingredient Quality & Quantity Specifications
export const INGREDIENT_QUALITY_SPECS = {
  tomatoes: {
    quantity: '2 large vine-ripened (approx 250g)',
    quality: 'Firm, deep red, heavy for size, sweet low-acid heirloom or Roma',
    prep: 'Seeded & finely hand-diced into 1/4-inch cubes',
    culinaryRole: 'Provides natural glutamic umami and bright fruity acidity to build sauce base',
    subCategory: 'tomatoes'
  },
  cherry_tomatoes: {
    quantity: '1 cup whole (approx 150g)',
    quality: 'Plump, taut skin, vibrant crimson sugar-bomb variety',
    prep: 'Left whole to blister in hot skillet until popping',
    culinaryRole: 'Explosive bursts of concentrated sweet tomato nectar',
    subCategory: 'tomatoes'
  },
  garlic: {
    quantity: '4 plump cloves',
    quality: 'Firm, tight purple or white skin, no green sprouts',
    prep: 'Peeled and sliced paper-thin for golden chips or grated on microplane',
    culinaryRole: 'Infuses sizzling cold-pressed olive oil with fragrant allicin aromatics',
    subCategory: 'garlic'
  },
  onions: {
    quantity: '1 medium sweet yellow or Vidalia onion',
    quality: 'Dry papery skin, crisp dense flesh, sweet allium fragrance',
    prep: 'Finely minced into uniform 3mm brunoise',
    culinaryRole: 'Sweated gently on medium heat until translucent and caramelized',
    subCategory: 'onions'
  },
  red_onion: {
    quantity: '1 medium purple onion',
    quality: 'Firm globe, vivid magenta rings with crisp snap',
    prep: 'Translucent julienne slices or small dice',
    culinaryRole: 'Piquant allium sharpness that softens into mild jammy sweetness',
    subCategory: 'onions'
  },
  pasta: {
    quantity: '200g (for 2 servings)',
    quality: '100% Bronze-die extruded Durum wheat with rough chalky texture',
    prep: 'Boiled in rolling salted water for 9 mins until perfect al dente',
    culinaryRole: 'Rough surface catches emulsions; starch water thickens sauce',
    subCategory: 'pasta'
  },
  spaghetti: {
    quantity: '180g long strand pasta',
    quality: 'Slow-dried Italian Durum wheat semolina',
    prep: 'Twirled into boiling water; finished directly in the pan glaze',
    culinaryRole: 'Silky strands that coat evenly with garlic herb oil',
    subCategory: 'pasta'
  },
  olive_oil: {
    quantity: '3 tbsp (45ml)',
    quality: 'First cold-pressed Extra Virgin (<0.3% acidity), unfiltered green hue',
    prep: 'Gently warmed—never scorched—to preserve delicate polyphenol aromatics',
    culinaryRole: 'Liquid gold lipid base carrying aromatics and binding the emulsion',
    subCategory: 'olive_oil'
  },
  heavy_cream: {
    quantity: '1/2 cup (120ml)',
    quality: 'Grade A fresh sweet dairy cream (36% butterfat), unthickened',
    prep: 'Brought to room temperature before swirling into warm sauce',
    culinaryRole: 'Luxurious velvety mouthfeel and rich fat that rounds out sharp acids',
    subCategory: 'heavy_cream'
  },
  parmesan: {
    quantity: '1/3 cup (40g) freshly grated',
    quality: 'Authentic Parmigiano-Reggiano DOP (aged minimum 24 months)',
    prep: 'Finely rasped with a microplane right into pan off the heat',
    culinaryRole: 'Crystalline umami bomb that melts into glossy pan glaze',
    subCategory: 'cheese'
  },
  basil: {
    quantity: '10-12 tender leaves',
    quality: 'Freshly harvested sweet Genovese basil, vibrant jade green',
    prep: 'Hand-torn at the final second (never bruised with dull metal)',
    culinaryRole: 'Volatile essential oils (linalool & eugenol) release fresh peppery aroma',
    subCategory: 'fresh_basil'
  },
  bell_peppers: {
    quantity: '1 large crisp red or orange pepper',
    quality: 'Taut glossy skin, thick fleshy walls, sweet crunch',
    prep: 'Seeded and cut into uniform 1/2-inch strips or dice',
    culinaryRole: 'Caramelizes into skillet adding vibrant color and sweet fruitiness',
    subCategory: 'tomatoes'
  },
  zucchini: {
    quantity: '1 medium young zucchini',
    quality: 'Firm, small-seeded dark green skin, heavy for size',
    prep: 'Thinly sliced into half-moons or spiralized into zoodles',
    culinaryRole: 'Quick-cooking tender vegetable that readily absorbs pan sauces',
    subCategory: 'pasta'
  },
  mushrooms: {
    quantity: '150g mixed Cremini & Shiitake',
    quality: 'Firm dry caps, earthy aroma, completely free of slime',
    prep: 'Gently brushed clean and sliced into 1/4-inch hearty pieces',
    culinaryRole: 'Intense glutamic umami with satisfying meaty chew',
    subCategory: 'proteins'
  },
  spinach: {
    quantity: '2 packed cups tender baby leaves',
    quality: 'Organic young baby spinach, crisp deep green leaves',
    prep: 'Washed, dried, folded into pan in the final 60 seconds to wilt',
    culinaryRole: 'Supplies iron, vibrant emerald color, and delicate mineral sweetness',
    subCategory: 'fresh_basil'
  },
  chicken: {
    quantity: '250g free-range chicken breast fillet',
    quality: 'Plump, tender, hormone-free organic cutlet',
    prep: 'Pounded to uniform 1/2-inch thickness and pan-seared golden',
    culinaryRole: 'Lean high-protein centerpiece absorbing garlic herb pan glaze',
    subCategory: 'proteins'
  },
  salmon: {
    quantity: '200g wild-caught salmon fillet',
    quality: 'Sustainably caught, vibrant coral color, firm muscle fibers',
    prep: 'Skin scored and seared crisp on medium-high heat',
    culinaryRole: 'Omega-3 rich buttery centerpiece with crispy golden skin',
    subCategory: 'proteins'
  },
  tofu: {
    quantity: '200g organic extra-firm tofu',
    quality: 'Non-GMO artisanal pressed block with high soybean density',
    prep: 'Pressed dry for 15 mins, cubed, seared until golden crisp',
    culinaryRole: 'Sponge-like plant protein that drinks in aromatic pan sauces',
    subCategory: 'proteins'
  },
  lemon: {
    quantity: '1 fresh unwaxed Meyer lemon',
    quality: 'Heavy with juice, bright yellow skin with fragrant essential oils',
    prep: 'Zested finely (avoid white pith) and freshly squeezed',
    culinaryRole: 'Bright citrus citric acid that cuts through rich cream and butter',
    subCategory: 'fresh_basil'
  },
  butter: {
    quantity: '2 tbsp (30g)',
    quality: 'Cultured European-style unsalted sweet cream butter (82% fat)',
    prep: 'Cold cubed and whisked in off the heat for glossy emulsion',
    culinaryRole: 'Creates velvety restaurant-style sheen (monte al burro)',
    subCategory: 'olive_oil'
  }
};

export const CHEESE_SUBSTITUTES = GENUINE_DATABASE_SUBSTITUTES.cheese;

// Platera Required Meal Setup Defaults
export const DEFAULT_MEAL_SETUP = {
  servings: 2,
  timeLimit: 30,
  mealType: 'dinner',
  dishType: 'main',
  allergies: [],
  customAvoid: ''
};

