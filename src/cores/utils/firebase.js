import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "sarah-test-2e9da.firebaseapp.com",
    projectId: "sarah-test-2e9da",
    storageBucket: "sarah-test-2e9da.appspot.com",
    messagingSenderId: "675215807256",
    appId: "1:675215807256:web:85a941002c7b3d2cac846d",
    measurementId: "G-GTGTP0P83K",
    databaseURL: "https://sarah-test-2e9da-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const firebaseDB = getDatabase();