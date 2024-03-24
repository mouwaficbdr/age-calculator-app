const dayEl = document.getElementById("day-el");
const monthEl = document.getElementById("month-el");
const yearEl = document.getElementById("year-el");
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
  errorEmptyInput(dayEl);
  errorEmptyInput(monthEl);
  errorEmptyInput(yearEl);
  errorInvalidInput();
  calculateAge();
  console.log("Button clicked");
})


const calculateAge = () => {
  if (!isEmptyError && !isInvalidError) {
    yearAge = currentYear - Number(yearEl.value) - 1;
    if (Number(monthEl.value) > currentMonth) {
      
    }
    monthAge = currentMonth;
    dayAge = currentDay;
    dayDisplay.textContent = dayAge;
    monthDisplay.textContent = monthAge;
    yearDisplay.textContent = yearAge;
  }
} 

/* CHECKS IF THE INPUTS ARE VALID */
const errorInvalidInput = () => {
  if (Number(dayEl.value) > 31 || Number(dayEl.value) <= 0) {
    isInvalidError = true;
    document.getElementById("day-el-label").style.color = '#FF0000';
    dayEl.style.borderColor = '#FF0000';
    document.getElementById("day-el-error").textContent = 'Must be a valid day';
  }
  if (Number(monthEl.value) > 12 || Number(monthEl.value) <= 0) {
    isInvalidError = true;
    document.getElementById("month-el-label").style.color = '#FF0000';
    monthEl.style.borderColor = '#FF0000';
    document.getElementById('month-el-error').textContent =
      'Must be a valid month';
  }
  if (Number(yearEl.value) > currentYear) {
    isInvalidError = true;
    document.getElementById("year-el-label").style.color = '#FF0000';
    yearEl.style.borderColor = '#FF0000';
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
