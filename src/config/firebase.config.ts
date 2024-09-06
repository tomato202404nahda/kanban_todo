// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(
        "sw.ts",
        {
          type: "module",
        }
        // import.meta.env.MODE === "production" ? "/sw.tss" : "/dev-sw.js?dev-sw",
        // { type: import.meta.env.MODE === "production" ? "classic" : "module" }
      )
      .then((registration) => {
        getToken(messaging, {
          vapidKey:
            "BM1BLaEpXPqvpxNZCiH2ugjed1lwdECBY8Ce4lbjL5AQXC_0JFxZ0_qB9bXTpv8o7AUs1ffC2JD5DVzhXu5Zg2o",
          serviceWorkerRegistration: registration,
        }).then((currentToken) => {
          return currentToken;
        });
      });
  }
  return;
  // const token = await getToken(messaging, {
  //   vapidKey:
  //     ,
  //   serviceWorkerRegistration: "",
  // });
  // console.log(token);
  // return token;
};
