import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDYjlNBskL-rDWd02bmGL_On5R1LlBrrwo",
    authDomain: "jereer-task.firebaseapp.com",
    projectId: "jereer-task",
    storageBucket: "jereer-task.appspot.com",
    messagingSenderId: "479565843480",
    appId: "1:479565843480:web:e2c34af5721852e4a6476d",
    measurementId: "G-X4Z1ZZ08DB"
  };

  const app = initializeApp(firebaseConfig)
  export const auth = getAuth(app);