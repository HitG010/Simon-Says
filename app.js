let started = false;
let h2 = document.querySelector("h2");
let gameSeq = [];
let userSeq = [];
let btnClass = ["red", "green", "yellow", "purple"];
let btns = document.querySelectorAll(".btn");

document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

let level = 0;
let userLvl = 0;

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    console.log("flash");
    btn.classList.remove("flash");
  }, 150);
}

function btnFlash() {
  let idx = 0;
  setTimeout(function () {
    let id = setInterval(function () {
      let btn = document.querySelector(`.${gameSeq[idx]}`);
      flash(btn);
      idx++;
      if (idx == level) {
        clearInterval(id);
      }
    }, 500);
  }, 1000);
}

function levelUp() {
  level += 1;
  h2.innerText = `Level ${level}`;

  let rdmIdx = Math.floor(Math.random() * 4);
  let rdmClr = btnClass[rdmIdx];
  let btn = document.querySelector(`.${rdmClr}`);
  gameSeq.push(rdmClr);
  console.log(gameSeq);
  btnFlash();
}

function pressCheck() {
  if (userLvl == level) {
    let body = document.querySelector("body");
    body.classList.add("correct");
    setTimeout(function () {
      body.classList.remove("correct");
    }, 250);
    levelUp();
    userLvl = 0;
    userSeq = [];
  }
}
for (let btn of btns) {
  btn.addEventListener("click", btnPress);
}
function btnPress() {
  console.log("button clicked");
  let clr = this.getAttribute("id");
  console.log(this);
  if (clr == gameSeq[userLvl]) {
    userSeq.push(clr);
    this.classList.add("correct");
    setTimeout(() => {
      this.classList.remove("correct");
    }, 250);
    userLvl++;
    pressCheck();
  } else {
    h2.innerHTML = `Game Over <br> Your score was <b>${
      level - 1
    }<br>Press any key to restart`;
    let body = document.querySelector("body");
    body.classList.add("incorrect");
    setTimeout(function () {
      body.classList.remove("incorrect");
    }, 250);

    userSeq = [];
    gameSeq = [];
    level = 0;
    userLvl = 0;
    started = false;
  }
}
