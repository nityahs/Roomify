// Import database functions from firebaseConfig.js
import { database, ref, push } from "./firebaseConfig.js";

// Feedback form submission handler
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    // Validate required fields
    if (name && email && rating) {
        // Reference to 'feedback' in Firebase Database
        const feedbackRef = ref(database, 'feedback');
        
        // Push new feedback data
        push(feedbackRef, {
            name: name,
            email: email,
            rating: rating,
            comments: comments
        })
        .then(() => {
            // Show success message
            document.getElementById('statusMessage').textContent = 'Thank you for your feedback!';
            document.getElementById('statusMessage').style.color = 'green';

            // Show a prompt and redirect to index.html if confirmed
            setTimeout(() => {
                if (confirm("Thank you for your feedback! Click OK to return to the homepage.")) {
                    window.location.href = "home.html";
                }
            }, 500); // Adding slight delay for message visibility

            // Reset the form
            document.getElementById('feedbackForm').reset();
        })
        .catch((error) => {
            // Show error message
            document.getElementById('statusMessage').textContent = 'Error: ' + error.message;
            document.getElementById('statusMessage').style.color = 'red';
        });
    } else {
        // Validation error
        document.getElementById('statusMessage').textContent = 'Please fill out all required fields.';
        document.getElementById('statusMessage').style.color = 'red';
    }
});
