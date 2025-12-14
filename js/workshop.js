const santaBtn = document.getElementById("santa-btn");

santaBtn.addEventListener("click", () => {
    document.getElementById("workshop-scene").style.opacity = 0;
    document.getElementById("workshop-scene").style.transition = "opacity 1s ease-in-out";

    setTimeout(() => {
        window.location.href = "puzzle.php";
    }, 1000);
});