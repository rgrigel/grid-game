var gridSize = 0;
var squares = 0;
var shown = true;
var randomSquares = [];

function setGridSize(value) {
    gridSize = parseInt(value);
}

function setSquares(value) {
    squares = parseInt(value);
}

function show() {
    shown = !shown;
    document.getElementById("showButton").innerHTML = shown ? 'Hide' : 'Show';
    drawGrid();
}

function drawGrid() {
    const squareSize = 50;
    const squareOffset = 55;

    const canvas = document.getElementById('grid');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let x = 0, i = 0; i < gridSize; x += squareOffset, i++) {
        for (let y = 0, j = 0; j < gridSize; y += squareOffset, j++) {
            ctx.fillStyle = "rgb(68, 190, 227)";
            ctx.rect(x, y, squareSize, squareSize);
        }
    }
    ctx.fill();
    ctx.closePath();
    if (shown) {
        ctx.beginPath();
        for (let i = 0; i < randomSquares.length; i++) {
            const pos = randomSquares[i];
            const posy = pos % gridSize === 0 ? gridSize : pos % gridSize;
            const posx = Math.ceil(pos / gridSize);
            ctx.fillStyle = "rgb(227, 68, 68)";
            ctx.rect((posx - 1) * squareOffset, (posy - 1) * squareOffset, squareSize, squareSize);
        }
        ctx.fill();
        ctx.closePath();
    }
}

function isSetupValid() {
    return gridSize >= 1 && squares >= 0 && (gridSize * gridSize) >= squares;
}

function resetGame() {
    shown = true;
    randomSquares = [];
    document.getElementById("showButton").innerHTML = 'Hide';
}

function setupGame() {
    resetGame();
    if (isSetupValid()) {
        const shuffledArray = generateRandomArray(gridSize * gridSize);
        randomSquares = shuffledArray.slice(0, squares);
        drawGrid();
    }
}

function generateRandomArray(length) {
    const result = [];
    for (let i = 0; i < length; i++) {
        result[i] = i + 1;
    }
    let max = length - 1;
    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * max);
        const rNum = result[rand];
        result[rand] = result[max];
        result[max] = rNum;
        max = max - 1;
    }
    return result;
}
