const GAME_DIMENSION = 4;
const EMPTY_CLASS = "empty";
const GREEN_CLASS = "green";
const WIN_CLASS = "win";
const CELL_CLASS = "cell";

let stepCounter = 0;

const getRandomArray = () =>
    ["", ...getOrderedArray()].sort(() => Math.random() - 0.5);

const getOrderedArray = () =>
    Array.from(Array(GAME_DIMENSION * GAME_DIMENSION).keys(), (n) => n + 1)
        .reverse()
        .slice(1);

function setupEmptyTable() {
    const board = document.querySelector("#board");

    for (id = 1; id < GAME_DIMENSION * GAME_DIMENSION + 1; id++) {
        const cell = document.createElement("div");
        cell.classList.add(CELL_CLASS);
        cell.setAttribute("id", id);
        cell.addEventListener("click", cellClicked);

        const slot = document.createElement("div");
        slot.classList.add("slot");

        cell.appendChild(slot);
        board.append(cell);
    }
}

function fillTable() {
    const currentNumbers = getRandomArray();
    document.querySelectorAll(`.${CELL_CLASS}`).forEach((cell) => {
        cell.classList.remove(EMPTY_CLASS);
        cell.classList.remove(WIN_CLASS);

        cell.firstElementChild.innerText = currentNumbers.pop();
        if (!cell.firstElementChild.innerText) cell.classList.add(EMPTY_CLASS);

        makeCellGreen(cell);
    });
}

function cellClicked(event) {
    const clickedCell = event.currentTarget;
    let emptyCell = null;

    if (
        clickedCell.classList.contains(EMPTY_CLASS) ||
        clickedCell.classList.contains(WIN_CLASS)
    ) {
        return;
    }

    const leftCell = document.getElementById(+clickedCell.id - 1);
    const rightCell = document.getElementById(+clickedCell.id + 1);
    const upCell = document.getElementById(+clickedCell.id - GAME_DIMENSION);
    const downCell = document.getElementById(+clickedCell.id + GAME_DIMENSION);

    if (
        leftCell &&
        leftCell.classList.contains(EMPTY_CLASS) &&
        leftCell.id % GAME_DIMENSION != 0
    ) {
        emptyCell = leftCell;
    }

    if (
        rightCell &&
        rightCell.classList.contains(EMPTY_CLASS) &&
        clickedCell.id % GAME_DIMENSION != 0
    ) {
        emptyCell = rightCell;
    }

    if (upCell && upCell.classList.contains(EMPTY_CLASS)) {
        emptyCell = upCell;
    }

    if (downCell && downCell.classList.contains(EMPTY_CLASS)) {
        emptyCell = downCell;
    }

    if (emptyCell) {
        switchSlots(clickedCell, emptyCell);
    }
}

function switchSlots(clickedCell, emptyCell) {
    emptyCell.classList.toggle(EMPTY_CLASS);
    clickedCell.classList.toggle(EMPTY_CLASS);

    emptyCell.firstElementChild.innerText =
        clickedCell.firstElementChild.innerText;
    clickedCell.firstElementChild.innerText = "";

    updateStepCounter(++stepCounter);

    checkFinishGame() ? finishGame() : makeCellGreen(emptyCell);
}

function checkPlacesFromCurrentToFirst(cell) {
    if (cell.id === cell.firstElementChild.innerText) {
        if (cell.id === "1") return true;
        return checkPlacesFromCurrentToFirst(
            document.getElementById(+cell.id - 1)
        );
    }
    return false;
}

function checkFinishGame() {
    const lastCell = document.getElementById(
        GAME_DIMENSION * GAME_DIMENSION - 1
    );
    return checkPlacesFromCurrentToFirst(lastCell);
}

function finishGame() {
    document.querySelectorAll(`.${CELL_CLASS}`).forEach((cell) => {
        cell.classList.add(WIN_CLASS);
        cell.classList.remove(GREEN_CLASS);
    });
}

const makeCellGreen = (cell) =>
    cell.id === cell.firstElementChild.innerText
        ? cell.classList.add(GREEN_CLASS)
        : cell.classList.remove(GREEN_CLASS);

const updateStepCounter = (value) =>
    (document.querySelector("#step_counter_value").innerText = value);

function startNewGame() {
    fillTable();
    stepCounter = 0;
    updateStepCounter(stepCounter);
}

setupEmptyTable();
startNewGame();
