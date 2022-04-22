const GAME_DIMENSION = 4;

let stepCounter = 0;

function setupEmptyTable() {

    const board = document.querySelector('#board');
    let slotCounter = 0;

    for (r = 0; r < GAME_DIMENSION; r++) {
        for (c = 0; c < GAME_DIMENSION; c++) {

            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', ++slotCounter);
            cell.addEventListener('click', cellClicked);
            
            const slot = document.createElement('div');
            slot.classList.add("slot");
            
            cell.appendChild(slot);
            board.append(cell);
        };
    };
};

function getRandomArray() {
    const ORDERED_ARRAY = Array.from(Array(GAME_DIMENSION*GAME_DIMENSION-1).keys(), n=>n+1);
    const NUMBERS = [...ORDERED_ARRAY, ""].sort(() => Math.random() - 0.5);
    return NUMBERS
};

function fillTable() {

    const slots = document.querySelectorAll('.slot');
    const currentNumbers = getRandomArray();
    
    for (i = 0; i < slots.length; i++) {

        const cell = slots[i].parentNode;
        cell.classList.remove('empty');
        const slot_value = currentNumbers.pop();

        if (slot_value) { slots[i].innerText = slot_value }
        else {
            cell.classList.add("empty");
            slots[i].innerText = '';
        };
    };
};

function cellClicked(event) {

    const clickedCell = event.currentTarget

    if (clickedCell.classList.contains('empty')) { return };

    const leftCell = document.getElementById(+clickedCell.id - 1)
    if (leftCell && leftCell.classList.contains('empty') && leftCell.id % GAME_DIMENSION != 0) {
        switchSlots(clickedCell, leftCell);
        return
    };

    const rightCell = document.getElementById(+clickedCell.id + 1)
    if (rightCell && rightCell.classList.contains('empty') && clickedCell.id % GAME_DIMENSION != 0) {
        switchSlots(clickedCell, rightCell);
        return
    };

    const up_cell = document.getElementById(+clickedCell.id - GAME_DIMENSION)
    if (up_cell && up_cell.classList.contains('empty')) {
        switchSlots(clickedCell, up_cell);
        return
    };

    const down_cell = document.getElementById(+clickedCell.id + GAME_DIMENSION)
    if (down_cell && down_cell.classList.contains('empty')) {
        switchSlots(clickedCell, down_cell);
        return
    };
};

function switchSlots(clicked_cell, empty_cell) {
    empty_cell.classList.remove("empty");
    clicked_cell.classList.add("empty");

    empty_cell.firstElementChild.innerText = clicked_cell.firstElementChild.innerText;
    clicked_cell.firstElementChild.innerText = '';

    updateStepCounter(++stepCounter);
}

function updateStepCounter(value) {
    step_counter_value = document.getElementById('step_counter_value');
    step_counter_value.innerText = value;
}

function startNewGame() {
    fillTable();
    stepCounter = 0;
    updateStepCounter(stepCounter);
}

setupEmptyTable();
startNewGame();