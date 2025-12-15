document.addEventListener("DOMContentLoaded", () => {

    const puzzleContainer = document.getElementById("fifteen-puzzle");
    const movesCounter = document.getElementById("moves-counter");
    const timerDisplay = document.getElementById("timer");
    const doorBg = document.getElementById("door-bg");
    const sizeSelector = document.getElementById("puzzle-size");
    const hintBtn = document.getElementById("hint-btn");
    const swapBtn = document.getElementById("swap-btn");
    const freezeBtn = document.getElementById("freeze-btn");
    const rewardText = document.getElementById("reward-text");

    let gridSize = parseInt(sizeSelector.value);
    let tiles = [];
    let emptyIndex = gridSize * gridSize - 1;
    let moves = 0;
    let freezeActive = false;
    let hintUses = 3;
    let swapUses = 2;
    let freezeUses = 1;
    let startTime;
    let completed = false;
    let timerInterval;

    function initPuzzle() {
        tiles = [];
        moves = 0;
        emptyIndex = gridSize * gridSize - 1;
        completed = false;
        freezeActive = false;
        startTime = Date.now();
        rewardText.textContent = "";

        for (let i = 1; i < gridSize * gridSize; i++) tiles.push(i);
        tiles.push(null);

        shuffleTiles();
        renderTiles();
        updateMoveCounter();
        updatePowerButtons();
        updateDoorOpacity();
        startTimer();
    }

    function shuffleTiles() {
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        if (!isSolvable(tiles)) shuffleTiles();
    }

    function isSolvable(array) {
        let inv = 0;
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if (array[i] && array[j] && array[i] > array[j]) inv++;
            }
        }
        return inv % 2 === 0;
    }

    function renderTiles() {
        puzzleContainer.innerHTML = '';
        puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
        puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, 80px)`;

        tiles.forEach((num, idx) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (!num) tile.classList.add('empty');
            else tile.textContent = num;

            tile.addEventListener('click', () => moveTile(idx));
            puzzleContainer.appendChild(tile);
        });

        updateDoorOpacity();
    }

    function moveTile(index) {
        if (freezeActive || completed) return;

        const emptyRow = Math.floor(emptyIndex / gridSize);
        const emptyCol = emptyIndex % gridSize;
        const tileRow = Math.floor(index / gridSize);
        const tileCol = index % gridSize;

        const dx = Math.abs(tileCol - emptyCol);
        const dy = Math.abs(tileRow - emptyRow);

        if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            emptyIndex = index;
            moves++;
            updateMoveCounter();
            renderTiles();
            checkSolved();
        }
    }

    function updateMoveCounter() {
        movesCounter.textContent = `Moves: ${moves}`;
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        if (completed) return;
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerDisplay.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function checkSolved() {
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) return false;
        }
        completed = true;
        clearInterval(timerInterval);
        movesCounter.textContent += ' - Solved!';
        rewardPlayer();
        return true;
    }

    function rewardPlayer() {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        let rewardMsg = "Workshop door unlocked!";
        if (moves <= gridSize * gridSize * 2 && timeTaken < gridSize * 60) {
            rewardMsg += " Bonus Badge: Quick Solver!";
        }
        rewardText.textContent = rewardMsg;
    }

    hintBtn.addEventListener('click', () => {
        if (hintUses <= 0 || completed) return;
        hintUses--;
        updatePowerButtons();
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) {
                const tileDiv = puzzleContainer.children[i];
                tileDiv.style.background = '#f4d35e';
                setTimeout(() => tileDiv.style.background = '#d4a373', 1000);
                break;
            }
        }
    });

    swapBtn.addEventListener('click', () => {
        if (swapUses <= 0 || completed) return;
        swapUses--;
        updatePowerButtons();

        let idx1, idx2;
        do { idx1 = Math.floor(Math.random() * (tiles.length - 1)); } while (!tiles[idx1]);
        do { idx2 = Math.floor(Math.random() * (tiles.length - 1)); } while (!tiles[idx2] || idx2 === idx1);
        [tiles[idx1], tiles[idx2]] = [tiles[idx2], tiles[idx1]];
        renderTiles();
    });

    freezeBtn.addEventListener('click', () => {
        if (freezeUses <= 0 || completed) return;
        freezeUses--;
        updatePowerButtons();
        freezeActive = true;
        freezeBtn.textContent = "Frozen!";
        setTimeout(() => { freezeActive = false; freezeBtn.textContent = "Freeze Timer"; }, 5000);
    });

    function updatePowerButtons() {
        hintBtn.textContent = `Hint (${hintUses})`;
        swapBtn.textContent = `Swap (${swapUses})`;
        freezeBtn.textContent = `Freeze (${freezeUses})`;
    }

    function updateDoorOpacity() {
        const correctTiles = tiles.reduce((count, val, idx) => count + (val === idx + 1 ? 1 : 0), 0);
        const percentCorrect = correctTiles / (gridSize * gridSize);
        doorBg.style.opacity = 1 - percentCorrect * 0.9;
    }

    sizeSelector.addEventListener('change', () => {
        gridSize = parseInt(sizeSelector.value);
        initPuzzle();
    });

    initPuzzle();

});
