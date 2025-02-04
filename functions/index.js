/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const next = require('next');
const path = require('path');

// Initialize Firebase Admin with the default credentials
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const app = next({
  dev: false,
  conf: { distDir: '.next' }
});
const handle = app.getRequestHandler();

let initialized = false;

exports.nextjs = onRequest(async (req, res) => {
  // Add CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  // Handle static files from public directory
  if (req.path.startsWith('/') && !req.path.startsWith('/_next')) {
    const publicFile = path.join(process.cwd(), 'public', req.path);
    try {
      if (require('fs').existsSync(publicFile)) {
        const stream = require('fs').createReadStream(publicFile);
        stream.pipe(res);
        return;
      }
    } catch (error) {
      console.error('Error serving static file:', error);
    }
  }

  if (!initialized) {
    try {
      await app.prepare();
      initialized = true;
    } catch (error) {
      console.error('Error initializing Next.js:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
  }
  
  try {
    await handle(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});
