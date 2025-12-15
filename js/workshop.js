document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const santa = document.getElementById("santa-btn");
    const dialogueText = document.querySelector("#dialogue-bar .dialogue-text");

    if (urlParams.get('final') === 'true') {
        santa.classList.add("final");
        dialogueText.textContent = "Thanks for playing!";

        const playBtn = document.getElementById("play-again-btn");
        const statsBox = document.getElementById("player-stats");

        playBtn.style.display = "block";
        statsBox.style.display = "block";

        setTimeout(() => {
            playBtn.style.opacity = 1;
            statsBox.style.opacity = 1;
            statsBox.querySelector("#stat-moves").textContent = `Moves: ${localStorage.getItem('puzzleMoves')}`;
            statsBox.querySelector("#stat-time").textContent = `${localStorage.getItem('puzzleTime')}`;
        }, 50);

        playBtn.addEventListener("click", () => {
            window.location.href = "puzzle.php";
        });
    } else {
        santa.addEventListener("click", () => {
            window.location.href = "puzzle.php";
        });
    }
});
