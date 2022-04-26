const GAME_DIMENSION = 4;
let stepCounter = 0;

function setupEmptyTable() {
    const board = document.querySelector("#board");
    let slotCounter = 0;

    for (r = 0; r < GAME_DIMENSION; r++) {
        for (c = 0; c < GAME_DIMENSION; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("id", ++slotCounter);
            cell.addEventListener("click", cellClicked);

            const slot = document.createElement("div");
            slot.classList.add("slot");

            cell.appendChild(slot);
            board.append(cell);
        }
    }
}

function getRandomArray() {
    const ORDERED_ARRAY = Array.from(
        Array(GAME_DIMENSION * GAME_DIMENSION - 1).keys(),
        (n) => n + 1
    );
    const NUMBERS = [...ORDERED_ARRAY, ""].sort(() => Math.random() - 0.5);
    return NUMBERS;
}

function fillTable() {
    const slots = document.querySelectorAll(".slot");
    const currentNumbers = getRandomArray();

    for (i = 0; i < slots.length; i++) {
        const cell = slots[i].parentNode;
        cell.classList.remove("empty");
        const slotValue = currentNumbers.pop();

        if (slotValue) {
            slots[i].innerText = slotValue;
        } else {
            cell.classList.add("empty");
            slots[i].innerText = "";
        }
    }
}

function cellClicked(event) {
    const clickedCell = event.currentTarget;

    if (clickedCell.classList.contains("empty")) {
        return;
    }

    const leftCell = document.getElementById(+clickedCell.id - 1);
    if (
        leftCell &&
        leftCell.classList.contains("empty") &&
        leftCell.id % GAME_DIMENSION != 0
    ) {
        switchSlots(clickedCell, leftCell);
        return;
    }

    const rightCell = document.getElementById(+clickedCell.id + 1);
    if (
        rightCell &&
        rightCell.classList.contains("empty") &&
        clickedCell.id % GAME_DIMENSION != 0
    ) {
        switchSlots(clickedCell, rightCell);
        return;
    }

    const upCell = document.getElementById(+clickedCell.id - GAME_DIMENSION);
    if (upCell && upCell.classList.contains("empty")) {
        switchSlots(clickedCell, upCell);
        return;
    }

    const downCell = document.getElementById(+clickedCell.id + GAME_DIMENSION);
    if (downCell && downCell.classList.contains("empty")) {
        switchSlots(clickedCell, downCell);
    }
}

function switchSlots(clickedCell, emptyCell) {
    emptyCell.classList.remove("empty");
    clickedCell.classList.add("empty");

    emptyCell.firstElementChild.innerText =
        clickedCell.firstElementChild.innerText;
    clickedCell.firstElementChild.innerText = "";

    updateStepCounter(++stepCounter);
}

function updateStepCounter(value) {
    let stepCounterValue = document.getElementById("step_counter_value");
    stepCounterValue.innerText = value;
}

function startNewGame() {
    fillTable();
    stepCounter = 0;
    updateStepCounter(stepCounter);
}

setupEmptyTable();
startNewGame();
