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
  
  
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let currentDate = date.getDate(); // Get the current day
    
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const monthYearSpan = document.getElementById("month-year");
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
    
      for (let i = 0; i < 7; i++) {
        if (i < firstDay) {
          row.insertCell();
          continue;
        }
    
        const cell = row.insertCell();
        cell.textContent = date;
  
         // Highlight the current day
      if (
          date === currentDate &&
          currentMonth === new Date().getMonth() &&
          currentYear === new Date().getFullYear()
        ) {
          cell.classList.add("current-day");
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
  
          if (
              date === currentDate &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
            ) {
              cell.classList.add("current-day");
            }     
  
          date++;
        }
        row = calendarTable.querySelector("tbody").insertRow();
      }
    }
    
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
        console.log("Returning to the current month.");
        const today = new Date();
        currentMonth = today.getMonth();
        currentYear = today.getFullYear();
        generateCalendar();
      }
