import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// configuration fairbase 
const firebaseConfig = {
  apiKey: "AIzaSyBTwisT1F1xDlXBjjp2hVj_JnZCqIJd_iM",
  authDomain: "massive-woods-396316.firebaseapp.com",
  projectId: "massive-woods-396316",
  storageBucket: "massive-woods-396316.appspot.com",
  messagingSenderId: "24638185706",
  appId: "1:24638185706:web:cf77b11efb28b9f7cfb793",
  measurementId: "G-6T55ZNWRVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const messaging = getMessaging(app);
