// src/app/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK only once
if (!admin.apps.length) {
  // Ensure that you have set the FIREBASE_ADMIN_SDK environment variable
  // in your .env.local file. This variable should contain the JSON string
  // of your Firebase service account credentials.
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK || '{}'))
  });
}

export default admin;
