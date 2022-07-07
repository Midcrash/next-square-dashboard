import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  getFirestore,
  doc,
  getDoc,
  where,
  query,
  getDocs,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert("Incorrect Username or Password");
    console.error(err);
  }
};

const logOut = () => {
  signOut(auth);
};

const fetchUserName = async (user) => {
  try {
    console.log(user);
    const q = query(collection(db, "users"), where("uid", "==", user));
    const docSnap = await getDocs(q);
    const data = docSnap.docs[0].data();

    if (docSnap.docs.length === 0) {
      console.log("I'm empty");
    } else {
      console.log(data.name);
      return data.name;
    }
  } catch (err) {
    return err;
    alert(err);
  }
};

const storeSquareInfo = async (
  accessToken,
  expiresAt,
  merchantId,
  refreshToken,
  user
) => {
  console.log(user);
  // Create Ref to SquareInfo
  const squareRef = collection(db, "SquareInfo");
  // Create query against collection
  const q = query(
    squareRef,
    where("merchantId", "==", merchantId),
    where("uid", "==", user)
  );
  const docSnap = await getDocs(q);

  // If there is no matching merchant id add new document
  if (docSnap.docs.length === 0) {
    try {
      await addDoc(collection(db, "SquareInfo"), {
        uid: user,
        accessToken: accessToken,
        expiresAt: expiresAt,
        merchantId: merchantId,
        refreshToken: refreshToken,
      });
    } catch (err) {
      console.warn(err.message);
    }
    // If the same Merchant ID replace the document with updated information
  } else if (docSnap.docs.length >= 1) {
    let id;
    docSnap.forEach((snap) => {
      id = snap.id;
    });
    try {
      await setDoc(doc(db, "SquareInfo", id), {
        uid: user,
        accessToken: accessToken,
        expiresAt: expiresAt,
        merchantId: merchantId,
        refreshToken: refreshToken,
      });
    } catch (err) {
      console.warn(err);
    }
  } else {
    console.log("idk wat happened");
  }
};

// Storing payments from Square webhook
const storePayments = async (
  merchant_id,
  created_at,
  event_id,
  data_id,
  payment_id,
  data_payment_amount
) => {
  try {
    console.log(
      merchant_id,
      created_at,
      event_id,
      data_id,
      payment_id,
      data_payment_amount
    );
    const collectionRef = collection(db, "SquarePayments");
    const payload = {
      merchant_id,
      created_at,
      event_id,
      data_id,
      payment_id,
      data_payment_amount,
    };
    const docRef = await addDoc(collectionRef, payload);
    console.log(docRef);
  } catch (err) {
    console.log(err);
    console.warn(err);
  }
};

// Fetch square information from Firebase
const fetchSquareInfo = async (uid) => {
  const q = query(collection(db, "SquareInfo"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  // Store multiple merchant ID
  const merchantIdArray = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.get("merchantId"));
    merchantIdArray.push(doc.get("merchantId"));
  });
  return merchantIdArray;
};

// Fetch Payments
const fetchPayments = async (uid) => {
  const merchantIdArray = fetchSquareInfo(uid);
  const paymentRef = collection(db, "SquarePayments");

  // Fetch payments using for loop because user might have multiple square accs connected
  (await merchantIdArray).forEach(async (merchantId) => {
    const q = query(paymentRef, where("merchant_id", "==", merchantId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log(doc.get("event_id"));
      });
    }
  });

  try {
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const payments = [];
    //   querySnapshot.forEach((doc) => {
    //     payments.push(doc.data().name);
    //   });
    //   console.log("Current payments in CA: ", payments.join(", "));
    // });
  } catch (err) {
    console.warn(err);
  }
};

export {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  auth,
  logOut,
  fetchUserName,
  storeSquareInfo,
  storePayments,
  db,
  fetchPayments,
};
