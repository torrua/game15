const GAME_DIMENSION = 4

let stepCounter = 0;

function setupEmptyTable() {

    const board = document.querySelector('#board');
    let slotCounter = 0;

    for (r = 0; r < GAME_DIMENSION; r++) {
        for (c = 0; c < GAME_DIMENSION; c++) {
            const slot = document.createElement('div');
            slot.classList.add("slot");
            slot.setAttribute('id', ++slotCounter);
            slot.addEventListener('click', cellClicked)
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.appendChild(slot);
            board.append(cell);
        }
    }
}

function getRandomArray() {
    const ORDERED_ARRAY = Array.from(Array(GAME_DIMENSION*GAME_DIMENSION-1).keys(), n=>n+1)
    const NUMBERS = [...ORDERED_ARRAY, ""].sort(() => Math.random() - 0.5);
    return NUMBERS
};

function fillTable() {

    const slots = document.querySelectorAll('.slot');
    const currentNumbers = getRandomArray();

    for (i = 0; i < slots.length; i++) {
        slots[i].classList.remove('empty');
        const slot_value = currentNumbers.pop();

        if (slot_value) { slots[i].innerText = slot_value }
        else {
            slots[i].classList.add("empty");
            slots[i].innerText = '';
        };
    };
};

function cellClicked(event) {

    const slot = event.target

    if (slot.classList.contains('empty')) { return }

    const prev_item = document.getElementById(+slot.id - 1)
    if (prev_item && prev_item.classList.contains('empty') && prev_item.id % GAME_DIMENSION != 0) {
        switchSlots(slot, prev_item);
        return
    }

    const next_item = document.getElementById(+slot.id + 1)
    if (next_item && next_item.classList.contains('empty') && slot.id % GAME_DIMENSION != 0) {
        switchSlots(slot, next_item);
        return
    }

    const up_item = document.getElementById(+slot.id - GAME_DIMENSION)
    if (up_item && up_item.classList.contains('empty')) {
        switchSlots(slot, up_item);
        return
    }

    const down_item = document.getElementById(+slot.id + GAME_DIMENSION)
    if (down_item && down_item.classList.contains('empty')) {
        switchSlots(slot, down_item);
        return
    }
}

function switchSlots(clicked_slot, empty_slot) {
    empty_slot.classList.remove("empty");
    clicked_slot.classList.add("empty");
    empty_slot.innerText = clicked_slot.innerText;
    clicked_slot.innerText = '';
    updateStepCounter(++stepCounter)
}

function updateStepCounter(value) {
    step_counter_value = document.getElementById('step_counter_value');
    step_counter_value.innerText = value;
}

function startNewGame() {
    fillTable();
    stepCounter = 0;
    updateStepCounter(stepCounter)
}

setupEmptyTable();
startNewGame();