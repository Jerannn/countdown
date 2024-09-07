const dateEl = document.getElementById("date-picker");
const countdownForm = document.getElementById("countdownForm");
const countdownEl = document.getElementById("countdown-title");
const countdown = document.querySelectorAll("span");
const resetBtn = document.getElementById("countdown");
const completeTitleEl = document.querySelector(".complete-title");
const completeEl = document.getElementById("complete");
const completeBtn = document.getElementById("complete-button");

// container
const inputContainer = document.getElementById("input-container");
const countdownContainer = document.getElementById("countdown");

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

let countdownTitle = "";
let countdownValue = "";
let countdownDate = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownActive;

function updateDOM() {
  countdownEl.textContent = countdownTitle;

  countdownActive = setInterval(() => {
    const distance = countdownDate - new Date(Date.now());

    inputContainer.hidden = true;

    if (distance < 0) {
      completeEl.hidden = false;
      countdownContainer.hidden = true;
      completeTitleEl.textContent = `${countdownTitle} is finished on ${countdownDate}!`;
      clearInterval(countdownActive);
    } else {
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);
      const countdownList = [days, hours, minutes, seconds];

      countdownList.map(
        (clock, index) => (countdown[index].textContent = clock)
      );
      countdownContainer.hidden = false;
    }
  }, second);
}

function updateCountdown(e) {
  e.preventDefault();
  console.log(e);
  countdownTitle = e.srcElement[0].value;
  countdownValue = e.srcElement[1].value;
  countdownDate = new Date(countdownValue).getTime();
  !countdownDate ? alert("Please provide a date.") : updateDOM();
}

function resetCountdown() {
  inputContainer.hidden = false;
  countdownContainer.hidden = true;
  completeEl.hidden = true;
  clearInterval(countdownActive);

  countdownTitle = "";
  countdownValue = "";
  dateEl.value = "";
}

countdownForm.addEventListener("submit", updateCountdown);
resetBtn.addEventListener("click", resetCountdown);
completeBtn.addEventListener("click", resetCountdown);
