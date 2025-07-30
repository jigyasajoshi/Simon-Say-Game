let gameSeq = [];
let userSeq = [];

let btns = ["yellow","pink","green","blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    }, 800);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    }, 150);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4); // Fixed: 4 instead of 3
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);

    gameSeq.push(ranColor);
    btnFlash(ranBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            console.log("Correct sequence! Advancing to next level...");
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    console.log("User Clicked:", userColor);
    console.log("User Sequence:", userSeq);
    console.log("Game Sequence:", gameSeq);

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}