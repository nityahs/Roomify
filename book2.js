// book1.js

import { database, ref, set, get, child, push, query, orderByChild, equalTo } from "./firebaseConfig.js";

// Base price of the room
let basePrice = 15000;

// Update the total price based on selected checkboxes
window.updatePrice = function() {
    let totalPrice = basePrice;

    if (document.getElementById('breakfast').checked) {
        totalPrice += 2500;
    }
    if (document.getElementById('lunch').checked) {
        totalPrice += 4000;
    }
    if (document.getElementById('dinner').checked) {
        totalPrice += 4500;
    }

    document.getElementById('total-price').textContent = totalPrice;
};

// Function to check for conflicting bookings
async function checkAvailability(startDate, endDate) {
    const bookingsRef = ref(database, 'booking');
    const snapshot = await get(bookingsRef);

    if (snapshot.exists()) {
        const bookings = snapshot.val();

        // Check each booking for date conflicts
        for (const bookingId in bookings) {
            const booking = bookings[bookingId];

            const existingStartDate = new Date(booking.start_date);
            const existingEndDate = new Date(booking.end_date);
            const newStartDate = new Date(startDate);
            const newEndDate = new Date(endDate);

            // Check if new booking dates overlap with existing booking dates
            if (
                (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
                (newEndDate >= existingStartDate && newEndDate <= existingEndDate) ||
                (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
            ) {
                return false;  // Conflict found
            }
        }
    }
    return true;  // No conflict
}

// Complete the booking and show a confirmation alert
window.completeBooking = async function() {
    const breakfast = document.getElementById('breakfast').checked;
    const lunch = document.getElementById('lunch').checked;
    const dinner = document.getElementById('dinner').checked;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const totalPrice = parseInt(document.getElementById('total-price').textContent);

    if (!startDate || !endDate) {
        alert("Please select start and end dates.");
        return;
    }

    // Check for availability before booking
    const isAvailable = await checkAvailability(startDate, endDate);

    if (!isAvailable) {
        alert("The room is already booked for the selected dates. Please choose different dates.");
        return;
    }

    // If available, proceed to book
    const bookingRef = push(ref(database, 'booking'));

    set(bookingRef, {
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        start_date: startDate,
        end_date: endDate,
        price: totalPrice
    })
    .then(() => {
        alert(`Thank you for your booking! Your total price is ₹${totalPrice}.`);
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error("Error saving booking data:", error);
        alert("There was an error processing your booking. Please try again.");
    });
};
