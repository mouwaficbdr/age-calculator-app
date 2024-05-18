const dayInput = document.getElementById("day-el");
const monthInput = document.getElementById("month-el");
const yearInput = document.getElementById("year-el");
const dayDisplay = document.getElementById("day-display");
const monthDisplay = document.getElementById('month-display');
const yearDisplay = document.getElementById('year-display');
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementById("form");

const date = new Date();
const currentDay = date.getDate();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear();
let yearAge;
let monthAge;
let dayAge;
let isInvalidError = false;
let isEmptyError = false;


form.addEventListener("submit", (e) => e.preventDefault())

submitBtn.addEventListener("click", () => {
  errorEmptyInput(dayInput);
  errorEmptyInput(monthInput);
  errorEmptyInput(yearInput);
  errorInvalidInput();
  calculateAge();
})


const calculateAge = () => {
  if (!isEmptyError && !isInvalidError) {
    yearAge = currentYear - Number(yearInput.value) - 1;
    monthAge = currentMonth + (12 - Number(monthInput.value));
    // dayAge = currentDay;
    if (currentDay > Number(dayInput.value)) {
      monthAge--;
      dayAge = 31 - (currentDay - Number(dayInput));
    } else if (currentDay <= Number(dayInput.value)) {
      dayAge = Number(dayInput.value) - currentDay;
    }

    if (dayAge > 31) {
      monthAge++;
      dayAge = dayAge - 31;
    }

    if (monthAge >= 12) {
      yearAge++;
      monthAge = monthAge - 12;
    }

    dayDisplay.textContent = dayAge;
    monthDisplay.textContent = monthAge;
    yearDisplay.textContent = yearAge;
  }
} 

/* CHECKS IF THE INPUTS ARE VALID */
const errorInvalidInput = () => {
  if (Number(dayInput.value) > 31 || Number(dayInput.value) <= 0) {
    isInvalidError = true;
    document.getElementById("day-el-label").style.color = '#FF0000';
    dayInput.style.borderColor = '#FF0000';
    document.getElementById("day-el-error").textContent = 'Must be a valid day';
  }
  if (Number(monthInput.value) > 12 || Number(monthInput.value) <= 0) {
    isInvalidError = true;
    document.getElementById("month-el-label").style.color = '#FF0000';
    monthInput.style.borderColor = '#FF0000';
    document.getElementById('month-el-error').textContent =
      'Must be a valid month';
  }
  if (Number(yearInput.value) > currentYear) {
    isInvalidError = true;
    document.getElementById("year-el-label").style.color = '#FF0000';
    yearInput.style.borderColor = '#FF0000';
    document.getElementById('year-el-error').textContent = 'Must be in the past';
  }
}

/* VISUAL ERROR FOR EMPTY INPUT SUBMITTED */
const errorEmptyInput = (input) => {
  const labelId = `${input.id}-label`;
  const errorId = `${input.id}-error`;
  if (input.value === "") {
    isEmptyError = true;
    document.getElementById(labelId).style.color = '#FF0000';
    input.style.borderColor = '#FF0000';
    document.getElementById(errorId).textContent = "This field is required";
  }
}
