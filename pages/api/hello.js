// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let basePath;
let environment;
if (process.env.NEXT_PUBLIC_SQ_ENVIRONMENT.toLowerCase() === "production") {
  basePath = `https://connect.squareup.com`;
} else if (process.env.NEXT_PUBLIC_SQ_ENVIRONMENT.toLowerCase() === "sandbox") {
  basePath = `https://connect.squareup.com`;
} else {
  console.warn("Unsupported value for SQ_ENVIRONMENT in .env file.");
  process.exit(1);
}

if (
  !process.env.NEXT_PUBLIC_SQ_APPLICATION_ID ||
  !process.env.NEXT_PUBLIC_SQ_APPLICATION_SECRET
) {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "Missing secrets! Configure set values for SQ_APPLICATION_ID and SQ_APPLICATION_SECRET in a .env file."
  );
  process.exit(1);
}

const port = "3000";

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
