const md5 = require("md5");
import cookie from "js-cookie";

let basePath;
let environment;
if (process.env.NEXT_PUBLIC_SQ_ENVIRONMENT.toLowerCase() === "production") {
  basePath = `https://connect.squareup.com`;
} else if (process.env.NEXT_PUBLIC_SQ_ENVIRONMENT.toLowerCase() === "sandbox") {
  basePath = `https://connect.squareupsandbox.com`;
} else {
  console.warn("Unsupported value for SQ_ENVIRONMENT in .env file.");
  process.exit(1);
}

const scopes = [
  "ITEMS_READ",
  "MERCHANT_PROFILE_READ",
  "PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS",
  "PAYMENTS_WRITE",
  "PAYMENTS_READ",
];

export default function handler(req, res) {
  var state = md5(Date.now());
  var url =
    basePath +
    `/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_SQ_APPLICATION_ID}&` +
    `response_type=code&` +
    `scope=${scopes.join("+")}` +
    `&state=` +
    state;
  res.status(200).json({ url, state });
}
