<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Santa's Workshop Puzzle</title>
    <link rel="stylesheet" href="css/puzzle.css">
</head>
<body>
    <div id="puzzle-scene">
        <div id="door-backdrop"></div>
        <img src="images/wooden-texture.png" alt="Wooden Door" id="door-bg">

        <div id="puzzle-container">
            <h2 id="puzzle-title">Santa's Workshop</h2>
            <select id="puzzle-size">
                <option value="3">3x3</option>
                <option value="4" selected>4x4</option>
                <option value="6">6x6</option>
                <option value="8">8x8</option>
                <option value="10">10x10</option>
            </select>

            <div id="fifteen-puzzle"></div>
            <p id="moves-counter">Moves: 0</p>
            <p id="timer">Time: 0:00</p>

            <div id="powerups">
                <button id="hint-btn">Hint (3)</button>
                <button id="swap-btn">Swap (2)</button>
                <button id="freeze-btn">Freeze (1)</button>
            </div>

            <div id="rewards">
                <p id="reward-text"></p>
            </div>
        </div>

        <img src="images/gift-sticker.png" class="door-sticker sticker1">
        <img src="images/reindeer-sticker.png" class="door-sticker sticker2">
        <img src="images/tree-sticker.png" class="door-sticker sticker3">
    </div>

    <audio id="bg-music" loop>
        <source src="audio/christmas.mp3" type="audio/mpeg">
    </audio>

    <script src="js/puzzle.js"></script>
</body>
</html>