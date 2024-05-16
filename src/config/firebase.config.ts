// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdza3XUvah5ayWRO9IZj9IoPpugU6KKE0",
  authDomain: "kanban-todo-8cfd0.firebaseapp.com",
  databaseURL:
    "https://kanban-todo-8cfd0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kanban-todo-8cfd0",
  storageBucket: "kanban-todo-8cfd0.appspot.com",
  messagingSenderId: "441055908882",
  appId: "1:441055908882:web:0e640818d49926b22e34cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
