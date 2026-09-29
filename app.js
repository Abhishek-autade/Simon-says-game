let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    
    // Random btn
    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randombtn);
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);
    
    // Add to user sequence
    userSeq.push(userColor);
    
    // Check if wrong button pressed
    if (userColor !== gameSeq[userSeq.length - 1]) {
        h2.innerText = `Game Over! Your score was ${level - 1}. Press any key to restart.`;
        resetGame();
        return;
    }
    
    // Check if level completed
    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
        userSeq = [];
    }
}

function resetGame() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}