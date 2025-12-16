import admin from "firebase-admin";
import 'dotenv/config';

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT is missing");
}

const serviceAccount = JSON.parse(
  Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT,
    "base64"
  ).toString("utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin