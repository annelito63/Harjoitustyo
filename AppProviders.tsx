import { initializeApp } from 'firebase/app';
import { initializeUI } from '@firebase-oss/ui-core';
import { FirebaseUIProvider } from '@firebase-oss/ui-react';
import { app } from './firebaseConfig';



const ui = initializeUI({
  app,
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <FirebaseUIProvider ui={ui}>{children}</FirebaseUIProvider>;
}