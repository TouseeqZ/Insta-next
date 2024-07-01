// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-ca23e.firebaseapp.com",
  projectId: "insta-next-ca23e",
  storageBucket: "insta-next-ca23e.appspot.com",
  messagingSenderId: "854531094589",
  appId: "1:854531094589:web:df52706156e6db0e599254"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/*
service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read;
        allow write: if
        request.resource.size < 2 * 1024 * 1024 &&
        request.resource.contentType.matches('image/.*')
      }
    }
  } 
  */