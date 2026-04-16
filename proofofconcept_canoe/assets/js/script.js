document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById('canoeForm');
const dateInput = document.getElementById('date');
const canoeDropdown = document.getElementById('canoe-count');
const totalDisplay = document.getElementById('liveTotal');
const confirmation = document.getElementById('confirmationMessage');

// ---------------------------
// CALENDAR (REAL AVAILABILITY UI)
// ---------------------------

// Dates that are fully booked
const unavailableDates = [
    "2026-04-20",
    "2026-04-21",
    "2026-04-27",
    "2026-05-03",
    "2026-05-10"
];

// Optional: dates with limited availability
const availability = {
    "2026-04-22": 3,
    "2026-04-23": 1,
    "2026-04-24": 5
};

flatpickr(dateInput, {
    minDate: "today",
    dateFormat: "Y-m-d",

    // Disable fully booked dates
    disable: unavailableDates,

    // Customize each day cell
    onDayCreate: function(dObj, dStr, fp, dayElem) {
        const date = dayElem.dateObj.toISOString().split('T')[0];

        // Fully booked
        if (unavailableDates.includes(date)) {
            dayElem.classList.add('unavailable');
            dayElem.title = "Fully Booked";
        } 
        // Limited availability
        else if (availability[date] !== undefined) {
            dayElem.classList.add('available');

            const spots = availability[date];
            const badge = document.createElement('span');
            badge.style.display = "block";
            badge.style.fontSize = "10px";
            badge.style.marginTop = "2px";
            badge.innerText = `${spots} left`;

            dayElem.appendChild(badge);
        } 
        // Fully available
        else {
            dayElem.classList.add('available');
        }
    }
});

// ---------------------------
// PRICING CALCULATOR
// ---------------------------

const priceMap = {
    "1": 67,
    "2": 134,
    "3": 201,
    "4": 268,
    "5": 335,
    "6": 402,
    "7": 455,
    "8": 536,
    "9": 603,
    "10": 670
};

canoeDropdown.addEventListener('change', () => {
    const val = canoeDropdown.value;

    if (priceMap[val]) {
        totalDisplay.textContent = `Total: $${priceMap[val]}.00`;
    } else {
        totalDisplay.textContent = "";
    }
});

// ---------------------------
// FAKE FORM SUBMISSION
// ---------------------------

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = dateInput.value;
    const canoes = canoeDropdown.value;

    // Basic validation
    if (!email || !date || !canoes) {
        alert("Please complete all required fields.");
        return;
    }

    // Fake "sending" state
    confirmation.style.display = "block";
    confirmation.textContent = "Sending request...";
    
    // Disable button while "sending"
    const submitBtn = form.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // Simulate API delay
    setTimeout(() => {

        confirmation.textContent = `Thanks ${name || "there"}! Your request for ${canoes} canoe(s) on ${date} has been received. We'll contact you shortly.`;

        // Reset form
        form.reset();
        totalDisplay.textContent = "";

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Request";

    }, 1200);
});

});