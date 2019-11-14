import * as admin from 'firebase-admin';
import serviceAccount from './firebase-service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://work-commute-fbc8e.firebaseio.com',
});

export const db = admin.database();
