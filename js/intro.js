const book = document.getElementById("storybook");

book.addEventListener("click", () => {
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "story.php";
    }, 800);
});