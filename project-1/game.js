"use strict";
console.log("Load game");
let startStopButton = document.querySelector("#start-stop-button");
let clock = document.querySelector("#clock-display");
let gameBoard = document.querySelector("#game-board");
let playAgainButton = document.querySelector("#play-again-button");
let modalYouWin = document.querySelector("#you-win");
let gameOn = false;
let interval = 1000;
let intervalFlag;
let time = 0;
let steps = 0;
const ORIGINAL_BLOCKS = [
    {
        text: "1",
        classes: "bg-green-100 text-green-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "2",
        classes: "bg-red-100 text-red-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "3",
        classes: "bg-blue-100 text-blue-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "4",
        classes: "bg-purple-100 text-purple-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "5",
        classes: "bg-pink-100 text-pink-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "6",
        classes: "bg-yellow-100 text-yellow-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "7",
        classes: "bg-indigo-100 text-indigo-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "8",
        classes: "bg-gray-100 text-gray-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "9",
        classes: "bg-emarald-100 text-emarald-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "10",
        classes: "bg-amber-100 text-amber-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "11",
        classes: "bg-lime-100 text-lime-500 rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    },
    {
        text: "",
        classes: "black-block bg-black text-black rounded-md shadow-md flex justify-center items-center w-32 h-32 font-bold"
    }
];
let blocks = [...ORIGINAL_BLOCKS];
function renderGame() {
    if (gameBoard) {
        gameBoard.innerHTML = "";
    }
    blocks.forEach(block => {
        let div = document.createElement("div");
        div.textContent = block.text;
        div.classList.add(...block.classes.split(" "));
        gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.appendChild(div);
    });
}
;
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
function move(direction) {
    const currentIndex = blocks.findIndex((block) => {
        return block.classes.includes("black-block");
    });
    let targetIndex = -1;
    switch (direction) {
        case Direction.Up:
            targetIndex = currentIndex - 4;
            break;
        case Direction.Down:
            targetIndex = currentIndex + 4;
            break;
        case Direction.Left:
            if (currentIndex !== 4 && currentIndex !== 8) {
                targetIndex = currentIndex - 1;
            }
            break;
        case Direction.Right:
            if (currentIndex !== 3 && currentIndex !== 7) {
                targetIndex = currentIndex + 1;
            }
            break;
    }
    if (targetIndex >= 0 && targetIndex < blocks.length) {
        [blocks[currentIndex], blocks[targetIndex]] = [blocks[targetIndex], blocks[currentIndex]];
        steps++;
        renderGame();
        checkYouWin();
    }
}
function shuffle() {
    for (let i = 1; i <= 100; i++) {
        const randomIndex = Math.floor(Math.random() * 12);
        let swap = -1;
        if (randomIndex === 0) {
            swap = 1;
        }
        [blocks[randomIndex], blocks[randomIndex + swap]] = [blocks[randomIndex + swap], blocks[randomIndex]];
    }
    renderGame();
    // Move the black block to the end of the game board
    move(Direction.Down);
    move(Direction.Down);
    move(Direction.Right);
    move(Direction.Right);
    move(Direction.Right);
}
function checkYouWin() {
    if (JSON.stringify(blocks) === JSON.stringify(ORIGINAL_BLOCKS)) {
        clearInterval(intervalFlag);
        // Wait for the last render
        setTimeout(() => {
            if (modalYouWin) {
                // Add steps display to modal
                const stepsDisplay = document.createElement('p');
                stepsDisplay.textContent = `Steps: ${steps}`;
                stepsDisplay.className = 'text-xl font-semibold';
                modalYouWin.insertBefore(stepsDisplay, playAgainButton);
                // Add to history
                addToHistory(steps, time);
                modalYouWin.classList.remove("hidden");
            }
        }, 100);
    }
}
function addToHistory(steps, time) {
    const historyTable = document.querySelector('#history-table tbody');
    if (historyTable) {
        const row = document.createElement('tr');
        const gameNumberCell = document.createElement('td');
        gameNumberCell.className = 'border border-gray-300 text-left p-1';
        gameNumberCell.textContent = String(historyTable.children.length + 1);
        const stepsCell = document.createElement('td');
        stepsCell.className = 'border border-gray-300 text-left p-1';
        stepsCell.textContent = String(steps);
        const timeCell = document.createElement('td');
        timeCell.className = 'border border-gray-300 text-left p-1';
        timeCell.textContent = formatTime(time);
        row.appendChild(gameNumberCell);
        row.appendChild(stepsCell);
        row.appendChild(timeCell);
        historyTable.appendChild(row);
    }
}
function initMoving() {
    document.addEventListener("keydown", function (event) {
        // event.preventDefault();
        if (!gameOn) {
            return;
        }
        switch (event.key) {
            case "w":
            case "ArrowUp":
                move(Direction.Up);
                break;
            case "s":
            case "ArrowDown":
                move(Direction.Down);
                break;
            case "a":
            case "ArrowLeft":
                move(Direction.Left);
                break;
            case "d":
            case "ArrowRight":
                move(Direction.Right);
                break;
        }
    });
}
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}
function setClock(time) {
    if (clock) {
        clock.textContent = formatTime(time);
    }
}
function resetClock() {
    setClock(0);
    time = 0;
}
function gameStart() {
    console.log("Bắt đầu");
    steps = 0;
    // Change the button
    if (startStopButton) {
        // Style the button
        startStopButton === null || startStopButton === void 0 ? void 0 : startStopButton.classList.remove("bg-green-600");
        startStopButton === null || startStopButton === void 0 ? void 0 : startStopButton.classList.add("bg-red-600");
        // Change text
        startStopButton.textContent = "Kết thúc";
    }
    // Time display
    resetClock();
    intervalFlag = setInterval(() => {
        time += 1;
        setClock(time);
    }, interval);
    gameOn = true;
}
;
function gameStop() {
    console.log("Kết thúc");
    // Change the button
    if (startStopButton) {
        // Style the button
        startStopButton === null || startStopButton === void 0 ? void 0 : startStopButton.classList.remove("bg-red-600");
        startStopButton === null || startStopButton === void 0 ? void 0 : startStopButton.classList.add("bg-green-600");
        // Change text
        startStopButton.textContent = "Bắt đầu";
    }
    // Reset time
    clearInterval(intervalFlag);
    resetClock();
    shuffle();
    gameOn = false;
}
function gameInit() {
    initMoving();
    shuffle();
}
startStopButton === null || startStopButton === void 0 ? void 0 : startStopButton.addEventListener("click", function () {
    if (!gameOn) {
        gameStart();
    }
    else {
        gameStop();
    }
});
playAgainButton === null || playAgainButton === void 0 ? void 0 : playAgainButton.addEventListener("click", function () {
    modalYouWin === null || modalYouWin === void 0 ? void 0 : modalYouWin.classList.add("hidden");
    shuffle();
    gameStart();
});
gameInit();
