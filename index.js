/*** Dark Mode ***/
const themeButton = document.getElementById('theme-button');
const body = document.body;

themeButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
});

/*** RSVP and Form Validation ***/
const rsvpButton = document.getElementById('rsvp-button');
const participantsList = document.querySelector('.rsvp-participants .participants');
const firstNameInput = document.getElementById('fName');
const lastNameInput = document.getElementById('lName');
const attendanceCountElement = document.getElementById('attendance-count');
const rsvpForm = document.getElementById('rsvp-form'); 

const addParticipant = (person) => {
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `🎟️ ${person.firstName} ${person.lastName} will attend.`;
    participantsList.appendChild(newParticipant);

    let currentCount = parseInt(attendanceCountElement.textContent);
    attendanceCountElement.textContent = currentCount + 1;
};

const validateForm = (event) => {
    event.preventDefault();
    let containsErrors = false;
    const rsvpInputs = rsvpForm.elements;

    for (const input of rsvpInputs) {
        if (input.type === "text") {
            if (input.value.trim().length < 2) {
                containsErrors = true;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        }
    }

    if (!containsErrors) {
        const person = {
            firstName: rsvpInputs["fName"].value.trim(),
            lastName: rsvpInputs["lName"].value.trim(),
            email: rsvpInputs["email"].value.trim()
        };
        addParticipant(person);
        rsvpForm.reset();
    }
};

rsvpButton.addEventListener('click', validateForm);

const toggleModal = (person) => {
    let modal = 0; // TODO
};

// TODO: animation variables and animateImage() function


/* START: FINAL CLOCK, DATE, & COUNTDOWN SCRIPT */

// 1. Set up variables
const clockContainer = document.getElementById('digital-clock-container');
const setDateBtn = document.getElementById('set-date-btn');
const countdownBtn = document.getElementById('countdown-btn');
const dateSelector = document.getElementById('date-selector-container');
const monthSelect = document.getElementById('month-select');
const daySelect = document.getElementById('day-select');
const yearSelect = document.getElementById('year-select');
const enterDateButton = document.getElementById('date-enter-button');

let activeIntervalId = null; 
let datePurpose = 'setDate'; 

// 2. Clock & Countdown Functions
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    clockContainer.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    clockContainer.style.fontSize = "3rem";
}

function startClock() {
    clearInterval(activeIntervalId);
    updateClock();
    activeIntervalId = setInterval(updateClock, 1000);
    setDateBtn.textContent = "Set the date of the event";
    countdownBtn.textContent = "Change it to countdown";
}

function startCountdown(targetDate) {
    clearInterval(activeIntervalId);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(activeIntervalId);
            clockContainer.textContent = "EVENT HAS BEGUN!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        clockContainer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        clockContainer.style.fontSize = "2.5rem";
    }

    updateCountdown();
    activeIntervalId = setInterval(updateCountdown, 1000);
}

// 3. Date Selector Population
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
});
const currentYear = new Date().getFullYear();
for (let i = 0; i <= 10; i++) {
    const option = document.createElement('option');
    option.value = currentYear + i;
    option.textContent = currentYear + i;
    yearSelect.appendChild(option);
}
function populateDays() {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    daySelect.innerHTML = ''; 
    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
}
monthSelect.addEventListener('change', populateDays);
yearSelect.addEventListener('change', populateDays);

// 4. Main Event Listeners
setDateBtn.addEventListener('click', () => {
    if (setDateBtn.textContent.includes("Bring back")) {
        startClock();
    } else {
        datePurpose = 'setDate';
        dateSelector.classList.remove('hidden');
    }
});

countdownBtn.addEventListener('click', () => {
    if (countdownBtn.textContent.includes("Bring back")) {
        startClock();
    } else {
        datePurpose = 'setCountdown';
        dateSelector.classList.remove('hidden');
    }
});

enterDateButton.addEventListener('click', () => {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(monthSelect.value);
    const selectedDay = parseInt(daySelect.value);
    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
    const todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);

    if (selectedDate < todaysDate) {
        alert("You cannot select a date in the past. Please choose a future date.");
        return;
    }

    clearInterval(activeIntervalId);
    
    if (datePurpose === 'setDate') {
        const selectedMonthName = months[selectedMonth];
        clockContainer.textContent = `${selectedMonthName} ${selectedDay}, ${selectedYear}`;
        clockContainer.style.fontSize = "3rem";
        setDateBtn.textContent = "Bring back the clock";
    } else if (datePurpose === 'setCountdown') {
        startCountdown(selectedDate.getTime());
        countdownBtn.textContent = "Bring back the clock";
    }
    
    dateSelector.classList.add('hidden');
});

// 5. Initial Setup
populateDays();
startClock();

/* END: FINAL CLOCK, DATE, & COUNTDOWN SCRIPT */