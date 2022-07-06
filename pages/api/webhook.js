// The crypto module provides cryptographic functionality.
const crypto = require("crypto");
const http = require("http");
const { buffer, text, json } = require("micro");
// import { storePayments, db } from "../../firebase/clientApp";

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore();

// The URL where event notifications are sent.
const NOTIFICATION_URL = "https://next-square-dashboard.vercel.app/api/webhook";

// The event notification subscription signature key (sigKey) defined in dev portal for app.
const SIG_KEY = process.env.NEXT_PUBLIC_SIGNATURE_KEY;

// Function to generate signature from url and body and compare to square signature.
function isFromSquare(sigKey, notificationUrl, squareSignature, buf) {
  // create hmac signature
  const hmac = crypto.createHmac("sha1", sigKey);
  hmac.update(notificationUrl + buf);
  const hash = hmac.digest("base64");
  // compare to square signature
  return hash === squareSignature;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    // This creates the rawBody equivalent
    const buf = await buffer(req);
    console.log(buf);

    req.on("data", function (chunk) {
      buf += chunk;
    });
    const squareSignature = req.headers["x-square-signature"];
    const eventIsFromSquare = isFromSquare(
      SIG_KEY,
      NOTIFICATION_URL,
      squareSignature,
      buf
    );
    if (eventIsFromSquare) {
      res.writeHead(200);
      res.write("Signature is valid. \n");
      const js = await json(req);
      console.log(js);
      // Store payments if event auth is returns true
      const docRef = db.collection("SquarePayments");

      await docRef.set({
        merchant_id: js.merchant_id,
        created_at: js.created_at,
        event_id: js.event_id,
        data_id: js.data.id,
        payment_id: js.data.object.payment.id,
        data_payment_amount: js.data.object.payment.amount_money.amount,
      });
      // storePayments(
      //   js.merchant_id,
      //   js.created_at,
      //   js.event_id,
      //   js.data.id,
      //   js.data.object.payment.id,
      //   js.data.object.payment.amount_money.amount
      // );
    } else {
      res.writeHead(400);
      res.write("Signature is not valid \n");
    }
    res.end();
  }
}

// Need this for raw-body
export const config = {
  api: {
    bodyParser: false,
  },
};
