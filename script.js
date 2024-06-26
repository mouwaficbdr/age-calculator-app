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
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
let yearAge;
let monthAge;
let dayAge;
let isInvalidError;
let isEmptyError;


const calculateAge = () => {
  if (!isEmptyError && !isInvalidError) {
    clearErrors();
    yearAge = currentYear - parseInt(yearInput.value);
    monthAge = currentMonth - (parseInt(monthInput.value) - 1);
    dayAge = currentDay - parseInt(dayInput.value);

    if (monthAge < 0 || (monthAge === 0 && dayAge < 0)) {
      yearAge--;
    }

    if (monthAge < 0) {
      monthAge += 12;
    }

    if (dayAge < 0) {
      const pastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const maxDays = new Date(currentYear, pastMonth + 1, 0).getDate();
      dayAge += maxDays;
      monthAge++;
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
    dayInput.classList.add("error");
    document.getElementById("day-el-label").style.color = '#FF0000';
    document.getElementById("day-el-error").textContent = 'Must be a valid day';
  }
  if (Number(monthInput.value) > 12 || Number(monthInput.value) <= 0) {
    isInvalidError = true;
    monthInput.classList.add("error");
    document.getElementById("month-el-label").style.color = '#FF0000';
    
    document.getElementById('month-el-error').textContent =
      'Must be a valid month';
  }
  if (Number(yearInput.value) > currentYear) {
    isInvalidError = true;
    yearInput.classList.add("error");
    document.getElementById("year-el-label").style.color = '#FF0000';
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
    input.classList.add("error");
    document.getElementById(errorId).textContent = "This field is required";
  }
}

const clearErrors = () => {
  
  document.getElementById('day-el-label').style.color = '';
  document.getElementById('month-el-label').style.color = '';
  document.getElementById('year-el-label').style.color = '';

  
  document.getElementById('day-el-error').textContent = '';
  document.getElementById('month-el-error').textContent = '';
  document.getElementById('year-el-error').textContent = '';

  
  [dayInput, monthInput, yearInput].forEach((input) => input.classList.remove('error'));
}

form.addEventListener('submit', (e) => e.preventDefault());

submitBtn.addEventListener('click', () => {
  isInvalidError = false;
  isEmptyError = false;  
  [dayInput, monthInput, yearInput].forEach((input) => errorEmptyInput(input));
  errorInvalidInput();
  calculateAge();
});