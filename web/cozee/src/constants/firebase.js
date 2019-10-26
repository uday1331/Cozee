import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import  FirebaseModule from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCCFA6nUREghV-dn4Sh21qzQRdjj6Ded9E",
    authDomain: "furnitureapp-292c6.firebaseapp.com",
    databaseURL: "https://furnitureapp-292c6.firebaseio.com",
    projectId: "furnitureapp-292c6",
    storageBucket: "furnitureapp-292c6.appspot.com",
    messagingSenderId: "277608926422",
    appId: "1:277608926422:web:a9595fb03ecd331c844d77",
    measurementId: "G-39KT68MK9Y"
};

let firebaseInitialized;
FirebaseModule.initializeApp(firebaseConfig);
firebaseInitialized=true;

let db;
let storage;

if (firebaseInitialized) {
    // Initialize Cloud Firestore through Firebase
    db = FirebaseModule.firestore();
    // Initialize Storage through Firebase
    storage = FirebaseModule.storage();
}

export const Firebase = firebaseInitialized ? FirebaseModule : null;
export const FirebaseDB = firebaseInitialized ? db : null;
export const FirebaseStorage = firebaseInitialized ? storage : null;


