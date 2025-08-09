import { DateTime } from "luxon";

const Calendar = document.querySelector(".calendar");
const calendarInput = document.querySelector("#calendar");
const calendarDates = document.querySelector(".calendar-date");
const currentMonthText = document.querySelector("#current-month");
const nextMonthButton = document.querySelector("#next-month");
const previousMonthButton = document.querySelector("#prev-month");
const toggleIcon = document.querySelector("img");
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar(month, year) {
  calendarDates.innerHTML = ""; // Clear previous calendar days

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Which weekday does the month start on?
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
  // Set header like "August 2025"
  currentMonthText.textContent = `${new Date(year, month).toLocaleString(
    "default",
    {
      month: "long",
    }
  )} ${year}`;
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate(); // Last day of previous month
    const prevMonthDayDiv = document.createElement("div");
    prevMonthDayDiv.textContent = lastDayOfPrevMonth - i;
    prevMonthDayDiv.classList.add("prev-month-date"); // Add special class if you want to style it dimmed
    prevMonthDayDiv.addEventListener("click", () => {
      const formatted = `${year}-${String(month).padStart(2, "0")}-${String(
        lastDayOfPrevMonth - i
      ).padStart(2, "0")}`;
      calendarInput.value = formatted;
      Calendar.classList.remove("show");
      Calendar.classList.add("hidden");
    });
    calendarDates.appendChild(prevMonthDayDiv);
  }

  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.classList.add("date");
    dayDiv.addEventListener("click", () => {
      const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      calendarInput.value = formatted;
      Calendar.classList.remove("show");
      Calendar.classList.add("hidden");
    });
    calendarDates.appendChild(dayDiv);
  }
  // Fill in the remaining days of the week with next month's days
  const totalDays = firstDayOfMonth + daysInMonth;
  const remainingDays = 42 - totalDays; // 42 is the total number of days in a 6-week calendar view
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDayDiv = document.createElement("div");
    nextMonthDayDiv.textContent = i;
    nextMonthDayDiv.classList.add("next-month-date");
    nextMonthDayDiv.addEventListener("click", () => {
      const formatted = `${year}-${String(month + 2).padStart(2, "0")}-${String(
        i
      ).padStart(2, "0")}`;
      calendarInput.value = formatted;
      Calendar.classList.remove("show");
      Calendar.classList.add("hidden");
    });
    calendarDates.appendChild(nextMonthDayDiv);
  }
}

nextMonthButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});
previousMonthButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

toggleIcon.addEventListener("click", () => {
  renderCalendar(currentMonth, currentYear);
  if (Calendar.classList.contains("hidden")) {
    Calendar.classList.remove("hidden");
    Calendar.classList.add("show");
  }
  else{
    Calendar.classList.remove("show");
    Calendar.classList.add("hidden");
  }
});

function calculateAge(){
  const birthDate = new Date(document.querySelector("#calendar").value);
  const today  = DateTime.now();
  const age = today.diff(DateTime.fromJSDate(birthDate), ['years', 'months', 'days']).toObject();
  if (birthDate > today.toJSDate()) {
    document.querySelector("#error").textContent = "Birth date cannot be in the future.";
    return;
  }
  else if (birthDate.toString() === "Invalid Date") {
    document.querySelector("#error").textContent = "Please select or enter a valid date (Required format: YYYY-MM-DD).";
    return;
  }
  else{
    document.querySelector("#age").textContent = `You are ${age.years} years, ${age.months} months, and ${parseInt(age.days)} days old.`;
  }
}
document.querySelector("#calculate").addEventListener("click", calculateAge);