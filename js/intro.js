const music = document.getElementById("bg-music");
music.volume = 0.4;
music.play().catch(() => {
    document.body.addEventListener("click", () => music.play(), { once: true });
});

const book = document.getElementById("storybook");

book.addEventListener("click", () => {
    document.body.classList.add("zoom-in");

    setTimeout(() => {
        window.location.href = "story.php";
    }, 2200);
});