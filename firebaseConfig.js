// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, get, child,push,query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "key",
    authDomain: "domain",
    projectId: "id",
    storageBucket: "storage",
    messagingSenderId: "xxxxxxxx",
    appId: "app id",
    measurementId: "X-XXXX999X9X"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  export { database, ref, set, get, child, push,query, orderByChild, equalTo };
  