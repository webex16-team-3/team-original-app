// 必要な関数を import
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfVm963UtQhAqOtlYSO9UrXaaj1VJjQzY",
  authDomain: "team-original-app-72914.firebaseapp.com",
  projectId: "team-original-app-72914",
  storageBucket: "team-original-app-72914.appspot.com",
  messagingSenderId: "1027978208428",
  appId: "1:1027978208428:web:fb2aaab54d4ad0d652eb09",
  measurementId: "G-C6SX9J0MHL",
};

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig);
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app);
