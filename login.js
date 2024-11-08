import { database, ref, get, child } from './firebaseConfig.js';

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log("Login form submitted"); // Add this for debugging

  // Get users data from Firebase
  const dbRef = ref(database);
  get(child(dbRef, 'users')).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();

      let loggedIn = false;
      // Iterate through users to check for match
      Object.keys(users).forEach((key) => {
        const user = users[key];
        if (user.email === email && user.password == password) {
          loggedIn = true;
          alert('Login successful');
          console.log("Login successful, redirecting..."); // Add this for debugging
          window.location.href = '/home.html';; // Redirect on successful login
        }
      });

      if (!loggedIn) {
        alert('Invalid email or password');
        console.log("Invalid email or password"); // Add this for debugging
      }
    } else {
      alert('No user data available');
      console.log("No user data available"); // Add this for debugging
    }
  }).catch((error) => {
    console.error(error);
  });
});
