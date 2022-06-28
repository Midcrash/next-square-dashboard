// The crypto module provides cryptographic functionality.
const crypto = require("crypto");
const http = require("http");

// The URL where event notifications are sent.
const NOTIFICATION_URL = "https://next-square-dashboard.vercel.app/api/webhook";

// The event notification subscription signature key (sigKey) defined in dev portal for app.
const SIG_KEY = process.env.NEXT_PUBLIC_SIGNATURE_KEY;

// Function to generate signature from url and body and compare to square signature.
function isFromSquare(sigKey, notificationUrl, squareSignature, rawBody) {
  // create hmac signature
  const hmac = crypto.createHmac("sha1", sigKey);
  hmac.update(notificationUrl + rawBody);
  const hash = hmac.digest("base64");

  console.log(hash);
  console.log(squareSignature);
  // compare to square signature
  return hash === squareSignature;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    let rawBody = "";
    req.setEncoding("utf8");
    req.on("data", function (chunk) {
      rawBody += chunk;
    });
    const squareSignature = req.headers["x-square-signature"];
    const eventIsFromSquare = isFromSquare(
      SIG_KEY,
      NOTIFICATION_URL,
      squareSignature,
      rawBody
    );
    if (eventIsFromSquare) {
      res.writeHead(200);
      res.write("Signature is valid. \n");
    } else {
      res.writeHead(400);
      res.write("Signature is not valid \n");
    }
    res.end();
  }
}
