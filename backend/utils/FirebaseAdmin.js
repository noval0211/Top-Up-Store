import admin from "firebase-admin";
import 'dotenv/config';

admin.initializeApp({
  credential: admin.credential.cert(({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL,
  }))
});

export default admin