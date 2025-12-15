document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const santa = document.getElementById("santa-btn");
    const dialogueTexts = document.querySelectorAll("#dialogue-bar .dialogue-text");
    const playBtn = document.getElementById("play-again-btn");
    const statsBox = document.getElementById("player-stats");

    if (urlParams.get('final') === 'true') {
        santa.classList.add("final");

        dialogueTexts.forEach(p => p.style.display = 'none');

        const newDialogue = document.createElement('p');
        newDialogue.classList.add('dialogue-text', 'fade-in');
        newDialogue.textContent = "Thanks for playing!";
        document.getElementById("dialogue-bar").appendChild(newDialogue);

        playBtn.style.display = "block";
        statsBox.style.display = "block";

        setTimeout(() => {
            playBtn.style.opacity = 1;
            statsBox.style.opacity = 1;
            statsBox.querySelector("#stat-moves").textContent = `Moves: ${localStorage.getItem('puzzleMoves')}`;
            statsBox.querySelector("#stat-time").textContent = `Time: ${localStorage.getItem('puzzleTime')}`;
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
