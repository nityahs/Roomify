import { database, ref, set } from './firebaseConfig.js';

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Generate a new user ID
  const userId = "User" + Math.floor(Math.random() * 10000);

  // Store user data in Firebase Realtime Database
  set(ref(database, 'users/' + userId), {
    email: email,
    name: name,
    password: password
  }).then(() => {
    alert('User registered successfully');
    window.location.href = './index.html'; // Redirect to login page after registration
  }).catch((error) => {
    alert('Error: ' + error.message);
  });
});
