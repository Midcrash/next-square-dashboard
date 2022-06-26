// The crypto module provides cryptographic functionality.
const crypto = require("crypto");

// The URL where event notifications are sent.
const NOTIFICATION_URL = "https://next-square-dashboard.vercel.app/api/webhook";

// The event notification subscription signature key (sigKey) defined in dev portal for app.
const SIG_KEY = process.env.NEXT_PUBLIC_SIGNATURE_KEY;

// Function to generate signature from url and body and compare to square signature.
function isFromSquare(sigKey, notificationUrl, squareSignature, rawBody) {
  // create hmac signature
  console.log("hmac");
  const hmac = crypto.createHmac("sha1", sigKey);
  console.log("after hmac");
  hmac.update(notificationUrl + rawBody);
  console.log("hmac update");
  const hash = hmac.digest("base64");
  console.log("hash return");

  // compare to square signature
  return hash === squareSignature;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("IF");
    let rawBody = "";
    req.setEncoding("utf8");
    console.log("setencoding");
    req.on("data", function (chunk) {
      rawBody += chunk;
    });
    const squareSignature = req.headers["x-square-signature"];
    console.log("square sig");
    const eventIsFromSquare = isFromSquare(
      SIG_KEY,
      NOTIFICATION_URL,
      squareSignature,
      rawBody
    );
    console.log("eventfromsquare");
    if (eventIsFromSquare) {
      console.log("if event from square");
      res.writeHead(200);
      res.write("Signature is valid. \n");
    } else {
      console.log("else event from square");
      res.writeHead(400);
      res.write("Signature is not valid \n");
    }
    res.end();
  }
}
