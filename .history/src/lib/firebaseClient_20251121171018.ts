// src/lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// Build config from Astro public env vars
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  // measurementId is optional
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Avoid re-initialising in hot reload / multiple imports
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Helper: ensure we have at least an anonymous user
export async function ensureAnonAuth(): Promise<string> {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  }

  // Wait for any existing auth state first
  const existingUser = await new Promise<firebase.User | null>((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });

  if (existingUser) {
    return existingUser.uid;
  }

  // If no user, sign in anonymously
  const cred = await signInAnonymously(auth);
  return cred.user.uid;
}
