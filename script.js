window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
});

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const calendarTable = document.getElementById("calendar");

function generateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    document.getElementById("month").textContent = monthNames[currentMonth];
    document.getElementById("year").textContent = currentYear;

    const tbody = calendarTable.querySelector("tbody");
    tbody.innerHTML = "";

    let date = 1;
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    for (let week = 0; week < 6; week++) {
        const row = tbody.insertRow();
        let highlightRow = false;

        for (let day = 0; day < 7; day++) {
            const cell = row.insertCell();

            if (week === 0 && day < firstDay) {
                cell.textContent = "";
                continue;
            }

            if (date > daysInMonth) {
                cell.textContent = "";
                continue;
            }

            const cellDate = new Date(currentYear, currentMonth, date);
            const cellDateStr = cellDate.toISOString().split("T")[0];

            cell.textContent = date;
            cell.setAttribute("data-date", cellDateStr);

            // Optional: mark the exact cell for today
            if (
                cellDateStr === todayStr &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear()
            ) {
                highlightRow = true;
                cell.classList.add("current-day");
            }

            date++;
        }

        if (highlightRow) {
            row.classList.add("highlight-week");
        }

        if (date > daysInMonth) break;
    }
}

// Controls
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

// Clicking the month label resets to current date
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

// Auto-refresh calendar every minute
function updateCalendar() {
    generateCalendar();
}
const updateInterval = setInterval(updateCalendar, 60 * 1000);

generateCalendar();
