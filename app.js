const GAME_DIMENSION = 4;
const EMPTY_CLASS = "empty";
let stepCounter = 0;

function setupEmptyTable() {
    const board = document.querySelector("#board");

    for (id = 1; id < GAME_DIMENSION * GAME_DIMENSION + 1; id++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", id);
        cell.addEventListener("click", cellClicked);

        const slot = document.createElement("div");
        slot.classList.add("slot");

        cell.appendChild(slot);
        board.append(cell);
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
    const currentNumbers = getRandomArray();
    document.querySelectorAll(".slot").forEach((slot) => {
        const cell = slot.parentNode;
        cell.classList.remove(EMPTY_CLASS);
        const slotValue = currentNumbers.pop();

        if (slotValue) {
            slot.innerText = slotValue;
        } else {
            cell.classList.add(EMPTY_CLASS);
            slot.innerText = "";
        }
    });
}

function cellClicked(event) {
    const clickedCell = event.currentTarget;
    if (clickedCell.classList.contains(EMPTY_CLASS)) {
        return;
    }

    const leftCell = document.getElementById(+clickedCell.id - 1);
    if (
        leftCell &&
        leftCell.classList.contains(EMPTY_CLASS) &&
        leftCell.id % GAME_DIMENSION != 0
    ) {
        switchSlots(clickedCell, leftCell);
        return;
    }

    const rightCell = document.getElementById(+clickedCell.id + 1);
    if (
        rightCell &&
        rightCell.classList.contains(EMPTY_CLASS) &&
        clickedCell.id % GAME_DIMENSION != 0
    ) {
        switchSlots(clickedCell, rightCell);
        return;
    }

    const upCell = document.getElementById(+clickedCell.id - GAME_DIMENSION);
    if (upCell && upCell.classList.contains(EMPTY_CLASS)) {
        switchSlots(clickedCell, upCell);
        return;
    }

    const downCell = document.getElementById(+clickedCell.id + GAME_DIMENSION);
    if (downCell && downCell.classList.contains(EMPTY_CLASS)) {
        switchSlots(clickedCell, downCell);
    }
}

function switchSlots(clickedCell, emptyCell) {
    emptyCell.classList.remove(EMPTY_CLASS);
    clickedCell.classList.add(EMPTY_CLASS);

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
