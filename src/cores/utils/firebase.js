import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "sarah-test-2f539.firebaseapp.com",
    databaseURL: "https://sarah-test-2f539-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sarah-test-2f539",
    storageBucket: "sarah-test-2f539.appspot.com",
    messagingSenderId: "449948329852",
    appId: "1:449948329852:web:c6e55ebd62c5bec1bce6f9",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const firebaseDB = getDatabase();