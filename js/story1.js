window.addEventListener("DOMContentLoaded", () => {
    const goInsideBtn = document.getElementById("go-inside");

    if (goInsideBtn) {
        goInsideBtn.addEventListener("click", () => {
            document.body.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "workshop.php";
            }, 1000);
        });
    } else {
        console.error("Go Inside button not found!");
    }
});