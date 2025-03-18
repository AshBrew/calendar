document.addEventListener("DOMContentLoaded", function () {
    let calendarDiv = document.getElementById("calendar");
    let today = new Date();
    
    calendarDiv.innerHTML = `<h3>${today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>`;
    
    for (let day = 1; day <= 31; day++) {
        let dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.style.display = "inline-block";
        dayElement.style.margin = "5px";
        dayElement.style.padding = "10px";
        dayElement.style.border = "1px solid #000";
        dayElement.style.borderRadius = "5px";
        
        calendarDiv.appendChild(dayElement);
    }
});
