document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('cabinForm');
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    const confirmation = document.getElementById('confirmationMessage');

    // ---------------------------
    // FAKE AVAILABILITY DATA
    // ---------------------------

    const unavailableDates = [
        "2026-04-20",
        "2026-04-21",
        "2026-04-27",
        "2026-05-03",
        "2026-05-10"
    ];

    // ---------------------------
    // CHECK-IN CALENDAR
    // ---------------------------

    flatpickr(checkin, {
        minDate: "today",
        disable: unavailableDates,
        dateFormat: "Y-m-d",
        onChange: function(selectedDates) {
            if (selectedDates.length) {
                checkoutPicker.set("minDate", selectedDates[0]);
            }
        }
    });

    // ---------------------------
    // CHECK-OUT CALENDAR
    // ---------------------------

    const checkoutPicker = flatpickr(checkout, {
        minDate: "today",
        disable: unavailableDates,
        dateFormat: "Y-m-d"
    });

    // ---------------------------
    // FORM SUBMISSION (FAKE)
    // ---------------------------

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        const requests = document.getElementById('requests').value;

        if (!email || !checkin.value || !checkout.value || !adults) {
            alert("Please complete required fields.");
            return;
        }

        confirmation.style.display = "block";
        confirmation.textContent = "Sending request...";

        const submitBtn = form.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        setTimeout(() => {
            confirmation.textContent =
                `Thanks ${name || "there"}! Your cabin request from ${checkin.value} to ${checkout.value} for ${adults} adult(s) and ${children} child(ren) has been received.`;

            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Request";

        }, 1200);
    });

});