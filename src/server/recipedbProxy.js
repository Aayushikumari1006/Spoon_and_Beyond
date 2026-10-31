import https from 'node:https';
import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const RECIPEDB_BASE_URL = process.env.RECIPEDB_BASE_URL || 'https://www.foodoscope.com';

/**
 * Dynamically resolves the RecipeDB API Key from process.env or .env file
 */
export function getApiKey() {
  const envKey = process.env.RECIPEDB_API_KEY;
  if (envKey && envKey.trim() !== '' && !envKey.includes('your_')) {
    return envKey.trim();
  }

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^RECIPEDB_API_KEY=(.*)$/m);
      if (match && match[1]) {
        const parsedKey = match[1].trim();
        if (parsedKey && !parsedKey.includes('your_')) {
          process.env.RECIPEDB_API_KEY = parsedKey;
          return parsedKey;
        }
      }
    }
  } catch (err) {
    // ignore read error
  }

  return '';
}

/**
 * Proxy helper function to execute external requests securely with server-side API Key
 */
export function forwardRecipeDBRequest(apiPath, queryParams, res) {
  const apiKey = getApiKey();

  if (!apiKey) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Missing API Key',
      message: 'RECIPEDB_API_KEY is not configured in server .env. Please set your key in .env without Bearer prefix.',
      isMissingKey: true
    }));
    return;
  }

  // Construct query string
  const cleanParams = new URLSearchParams();
  for (const [key, val] of Object.entries(queryParams)) {
    if (val !== undefined && val !== null && val !== '') {
      cleanParams.append(key, String(val));
    }
  }

  const queryString = cleanParams.toString();
  const targetPath = queryString ? `${apiPath}?${queryString}` : apiPath;
  const targetUrl = new URL(targetPath, RECIPEDB_BASE_URL);

  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || 443,
    path: targetUrl.pathname + targetUrl.search,
    method: 'GET',
    headers: {
      'Authorization': apiKey.startsWith('Bearer ') ? apiKey : `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'User-Agent': 'SpoonAndBeyond/1.0'
    },
    timeout: 25000
  };

  const clientReq = https.request(options, (upstreamRes) => {
    if (!res.headersSent) {
      res.statusCode = upstreamRes.statusCode || 500;
      res.setHeader('Content-Type', 'application/json');
    }

    let body = '';
    upstreamRes.on('data', chunk => body += chunk);
    upstreamRes.on('end', () => {
      if (res.writableEnded) return;
      try {
        const parsed = JSON.parse(body);
        res.end(JSON.stringify(parsed));
      } catch (err) {
        res.end(body || JSON.stringify({ error: 'Invalid response from upstream server' }));
      }
    });

    upstreamRes.on('error', (err) => {
      if (res.headersSent) {
        try { res.destroy(); } catch (e) {}
        return;
      }
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Upstream Stream Error', message: err.message }));
    });
  });

  clientReq.on('timeout', () => {
    clientReq.destroy();
    if (res.headersSent || res.writableEnded) return;
    res.statusCode = 504;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Gateway Timeout',
      message: 'Foodoscope RecipeDB request timed out after 25 seconds.'
    }));
  });

  clientReq.on('error', (err) => {
    if (res.headersSent || res.writableEnded) return;
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Bad Gateway',
      message: err.message || 'Unable to connect to www.foodoscope.com'
    }));
  });

  clientReq.end();
}

/**
 * Custom Vite plugin that attaches server-side RecipeDB proxy middleware
 */
export function recipeDbProxyPlugin() {
  return {
    name: 'recipedb-proxy-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        // Endpoint 1: Search by Ingredients, Categories & Title
        // GET /api/recipedb/by-ingredients
        if (pathname === '/api/recipedb/by-ingredients') {
          forwardRecipeDBRequest(
            '/recipe2-api/recipebyingredient/by-ingredients-categories-title',
            parsedUrl.query,
            res
          );
          return;
        }

        // Endpoint 2: Recipe Information / Listing / Details
        // GET /api/recipedb/recipes-info
        if (pathname === '/api/recipedb/recipes-info') {
          forwardRecipeDBRequest(
            '/recipe2-api/recipe/recipesinfo',
            parsedUrl.query,
            res
          );
          return;
        }

        // Endpoint 3: Recipe Title Search
        // GET /api/recipedb/by-title
        if (pathname === '/api/recipedb/by-title') {
          forwardRecipeDBRequest(
            '/recipe2-api/recipebyingredient/by-ingredients-categories-title',
            parsedUrl.query,
            res
          );
          return;
        }

        // Endpoint 4: Region and Diet Filtered Recipes
        // GET /api/recipedb/region-diet
        if (pathname === '/api/recipedb/region-diet') {
          forwardRecipeDBRequest(
            '/recipe2-api/recipe/region-diet',
            parsedUrl.query,
            res
          );
          return;
        }

        // Endpoint 5: Recipe Ingredients & Categories Details
        // GET /api/recipedb/ingredients-categories
        if (pathname === '/api/recipedb/ingredients-categories') {
          forwardRecipeDBRequest(
            '/recipe2-api/recipe/ingredients-categories',
            parsedUrl.query,
            res
          );
          return;
        }

        // Endpoint 6: Status check / Key presence probe (never reveals key)
        if (pathname === '/api/recipedb/status') {
          const hasKey = Boolean(getApiKey());
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            configured: hasKey,
            baseUrl: RECIPEDB_BASE_URL,
            supportedEndpoints: [
              '/api/recipedb/by-ingredients',
              '/api/recipedb/recipes-info',
              '/api/recipedb/by-title',
              '/api/recipedb/region-diet',
              '/api/recipedb/ingredients-categories'
            ]
          }));
          return;
        }

        next();
      });
    }
  };
}
