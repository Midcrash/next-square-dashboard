// The crypto module provides cryptographic functionality.
const crypto = require("crypto");
const http = require("http");
const { buffer, text, json } = require("micro");
import { storePayments, db } from "../../firebase/clientApp";
var firebase = require("firebase");

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
//
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
      // Store payments if event auth is returns true
      db.collection("SquarePayments")
        .add({
          merchant_id: js.merchant_id,
          created_at: js.created_at,
          event_id: js.event_id,
          data_id: js.data.id,
          payment_id: js.data.object.payment.id,
          data_payment_amount: js.data.object.payment.amount_money.amount,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
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
