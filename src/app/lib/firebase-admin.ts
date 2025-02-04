// src/app/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = process.env.FIREBASE_ADMIN_SDK;
    
    if (!serviceAccount) {
      throw new Error('FIREBASE_ADMIN_SDK environment variable is not set');
    }

    let parsedServiceAccount;
    try {
      parsedServiceAccount = JSON.parse(serviceAccount);
    } catch (parseError) {
      console.error('Failed to parse service account JSON:', parseError);
      throw new Error('Invalid service account configuration');
    }

    admin.initializeApp({
      credential: admin.credential.cert(parsedServiceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
    
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error; // Re-throw the error to prevent silent failures
  }
}

export default admin;
