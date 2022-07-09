// The crypto module provides cryptographic functionality.
const crypto = require("crypto");
const http = require("http");
const { buffer, text, json } = require("micro");
// import { storePayments, db } from "../../firebase/clientApp";

// Initalize server side firebase
const { initializeApp, cert } = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
var serviceAccount = {
  type: process.env.NEXT_PUBLIC_TYPE,
  project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY,
  client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL,
};

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://next-dashboard.firebaseio.com",
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
      // Store payments if event auth is returns true
      console.log(js);
      if (js.type === "order.created") {
        const docRef = db.collection("SquareOrders").doc();
        await docRef.set({
          merchant_id: js.merchant_id,
          created_at: js.created_at,
          event_id: js.event_id,
          data_id: js.data.id,
          location_id: js.data.object.order_created.location_id,
          order_id: js.data.object.order_created.order_id,
        });
      }
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
