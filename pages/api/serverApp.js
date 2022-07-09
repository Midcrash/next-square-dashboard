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

const storeOrders = async (js) => {
  console.log("store orders");
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
};

const storeMenu = async (itemData) => {
  console.log("store menu");
  const docRef = db.collection("SquareMenu").doc();
  await docRef.set({
    name: itemData.name,
    price: itemData.item_variation_data.price_money.amount,
  });
};

export { db, storeOrders, storeMenu };
