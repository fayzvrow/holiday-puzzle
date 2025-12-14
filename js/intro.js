const book = document.getElementById("storybook");

book.addEventListener("click", () => {
    document.body.classList.add("zoom-in");

    setTimeout(() => {
        window.location.href = "story.php";
    }, 2200);
});