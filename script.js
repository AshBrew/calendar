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
    firstDayOfWeek.setDate(today.getDate() (1 - today.getDay()); // Monday

    const lastDayOfWeek = new Date(today);
    lastDayOfWeek.setDate(today.getDate() + (0 - today.getDay())); // Sunday

    for (let i = 0; i < 7; i++) {
        if (i < firstDay) {
            row.insertCell();
            continue;
        }

        const cell = row.insertCell();
        cell.textContent = date;

        let cellDate = new Date(currentYear, currentMonth, date);

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

            date++;
        }

        // Check if the current row (week) contains any day in the current week
        const rowCells = row.querySelectorAll("td");
        let highlightRow = false;

        // Check each day in the row to see if it's within the current week
        for (let i = 0; i < rowCells.length; i++) {
            let cellDate = new Date(currentYear, currentMonth, rowCells[i].textContent);
            if (cellDate >= firstDayOfWeek && cellDate <= lastDayOfWeek && currentMonth === todayMonth && currentYear === todayYear) {
                highlightRow = true;
                break;
            }
        }

        // If the row contains a day within the current week, apply rounded corners to Sunday and Saturday
        if (highlightRow) {
            row.classList.add("highlight-week");

            // Apply rounded corners to the first (Sunday) and last (Saturday) cells
            rowCells[1].classList.add("rounded-left");
            rowCells[0].classList.add("rounded-right");
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
