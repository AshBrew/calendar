window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
});

function updateCalendar() {
    generateCalendar();
}

const updateInterval = setInterval(updateCalendar, 60 * 1000); // Update every minute

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDate = date.getDate();

const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const calendarTable = document.getElementById("calendar");

function generateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Sunday becomes Saturday, and other days shift by 1
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    document.getElementById("month").textContent = monthNames[currentMonth];
    document.getElementById("year").textContent = currentYear;

    // Clear previous rows
    calendarTable.querySelector("tbody").innerHTML = "";

    let date = 1;
    let row = calendarTable.querySelector("tbody").insertRow();

    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // Get the start and end of the current week
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Start of the week is Monday

    const lastDayOfWeek = new Date(today);
    lastDayOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Saturday of the same week

    for (let i = 0; i < 7; i++) {
        if (i < adjustedFirstDay) {
            row.insertCell();
            continue;
        }

        const cell = row.insertCell();
        cell.textContent = date;

        let cellDate = new Date(currentYear, currentMonth, date);

        // Highlight the entire week if the date falls within the current week
        if (cellDate >= firstDayOfWeek && cellDate <= lastDayOfWeek && currentMonth === todayMonth && currentYear === todayYear) {
            row.classList.add("highlight-week"); // Apply highlight to the entire row
        }

        date++;

        if (i === 6) {
            row = calendarTable.querySelector("tbody").insertRow();
        }
    }

    // Fill remaining days
    while (date <= daysInMonth) {
        for (let i = 0; i < 7; i++) {
            const cell = row.insertCell();
            if (date > daysInMonth) {
                break;
            }
            cell.textContent = date;

            let cellDate = new Date(currentYear, currentMonth, date);

            // Highlight the entire week
            if (cellDate >= firstDayOfWeek && cellDate <= lastDayOfWeek && currentMonth === todayMonth && currentYear === todayYear) {
                row.classList.add("highlight-week"); // Apply highlight to the entire row
            }

            date++;
        }
        row = calendarTable.querySelector("tbody").insertRow();
    }
}

// Button controls for previous and next month
prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

generateCalendar();

const monthElement = document.getElementById('month');
if (monthElement) {
    monthElement.addEventListener('click', returnToCurrentMonth);
}

function returnToCurrentMonth() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    generateCalendar();
}
