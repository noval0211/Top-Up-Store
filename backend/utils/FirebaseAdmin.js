import admin from "firebase-admin";
import 'dotenv/config';

const {
  PROJECT_ID,
  CLIENT_EMAIL,
  PRIVATE_KEY
} = process.env

if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  throw new Error("Firebase env missing")
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: PROJECT_ID,
      clientEmail: CLIENT_EMAIL,
      privateKey: PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  })
}

export default admin