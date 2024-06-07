const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const player = {
    x: 0,
    y: 0,
    width: tileSize,
    height: tileSize,
    color: 'blue'
};

const blocks = [];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBlocks() {
    for (const block of blocks) {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, block.width, block.height);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawPlayer();
    drawBlocks();
}

function updatePlayerPosition(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (player.y > 0) player.y -= tileSize;
            break;
        case 'ArrowDown':
            if (player.y < canvas.height - player.height) player.y += tileSize;
            break;
        case 'ArrowLeft':
            if (player.x > 0) player.x -= tileSize;
            break;
        case 'ArrowRight':
            if (player.x < canvas.width - player.width) player.x += tileSize;
            break;
    }
    draw();
}

function placeBlock(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileSize) * tileSize;
    const y = Math.floor((event.clientY - rect.top) / tileSize) * tileSize;
    blocks.push({ x, y, width: tileSize, height: tileSize, color: 'green' });
    draw();
}

document.addEventListener('keydown', updatePlayerPosition);
canvas.addEventListener('click', placeBlock);

draw();
