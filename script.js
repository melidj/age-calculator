// Function to calculate age
function calculateAge(event){

    // Prevent the default form submission behavior
    event.preventDefault();

    var date = parseInt(document.getElementById("date").value);
    var month = parseInt(document.getElementById("month").value);
    var year = parseInt(document.getElementById("year").value);

    // Validate input fields
    if (isNaN(date) || isNaN(month) || isNaN(year)) {
        document.getElementById("age-message").textContent = "Please enter your birthdate";
        // Clear any previous age calculation
        displayResult("-", "-", "-");
        
        // Refresh the page after showing the message
        setTimeout(() => {
            location.reload();
        }, 1500); // Refresh after 3 seconds
        return;
    }

    // Validate birth date, month, and year
    if (date <= 0 || date > 31 || month <= 0 || month > 12 || year <= 0) {
        document.getElementById("age-message").textContent = "Invalid birthdate";
        displayResult("-", "-", "-");
        // Refresh the page after showing the message
        setTimeout(() => {
            location.reload();
        }, 4000); // Refresh after 3 seconds
        return;
    }

    // Get current date
    var today = new Date();
    var currentDate = today.getDate();
    var currentMonth = today.getMonth() + 1;
    var currentYear = today.getFullYear();

    // Check if the birthdate is in the future
    if (year > currentYear || (year === currentYear && month > currentMonth) || (year === currentYear && month === currentMonth && date > currentDate)) {
        document.getElementById("age-message").textContent = "Birthdate cannot be in the future";
        displayResult("-", "-", "-");

        setTimeout(() => {
            location.reload();
        }, 4000);

        return;
    }
    
    // Function to get days in a month
    const getDaysInMonth = (month, year) => {
        const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0 );
        const daysInMonth = [
            31,
            isLeapYear ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ];
        return daysInMonth[month];
    };

    // Adjust current date and month if birth date is greater
    if(date > currentDate){
        currentDate = currentDate + getDaysInMonth(currentMonth, currentYear);
        currentMonth = currentMonth - 1;
    }

    if(month > currentMonth){
        currentMonth = currentMonth + 12;
        currentYear = currentYear - 1;
    }

    // Calculate age
    var days = currentDate - date;
    var months = currentMonth - month;
    var years = currentYear - year;

    // Display the calculated age
    displayResult(days, months, years);
}

// Function to display the calculated age
const displayResult = (bdate, bMonth, bYear) => {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bdate;
}

// Event listener for the calculate button
document.getElementById("calculate-age").addEventListener("click", calculateAge);
