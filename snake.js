const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const BLOCK_SIZE = 20;
const MAP_SIZE = canvas.width / BLOCK_SIZE;

// === DOM ===
const startScreen = document.getElementById("startScreen");
const difficultyScreen = document.getElementById("difficultyScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startBtn = document.getElementById("startBtn");
const difficultyBtn = document.getElementById("difficultyBtn");
const backBtn = document.getElementById("backBtn");

const scoreBoard = document.getElementById("scoreBoard");
const finalScoreText = document.getElementById("finalScore");
const currentDifficultyText = document.getElementById("currentDifficulty");

const retryBtn = document.getElementById("retryBtn");
const changeDifficultyBtn = document.getElementById("changeDifficultyBtn");
const backToMenuBtn = document.getElementById("backToMenuBtn");

// 難度按鈕
const lowBtn = document.getElementById("lowBtn");
const mediumBtn = document.getElementById("mediumBtn");
const highBtn = document.getElementById("highBtn");

let gameInterval;
let currentDifficulty = "medium";
let currentSpeed = 150;

// === 開啟難度選單 ===
difficultyBtn.onclick = () => {
  startScreen.style.display = "none";
  difficultyScreen.style.display = "flex";
};

// === 難度選擇 ===
lowBtn.onclick = () => setDifficulty("low", 300);
mediumBtn.onclick = () => setDifficulty("medium", 150);
highBtn.onclick = () => setDifficulty("high", 80);

function setDifficulty(level, speed) {
  currentDifficulty = level;
  currentSpeed = speed;
  currentDifficultyText.textContent =
    "目前難度：" + (level === "low" ? "低" : level === "medium" ? "中" : "高");
  difficultyScreen.style.display = "none";
  startScreen.style.display = "flex";
}

// 返回主選單
backBtn.onclick = () => {
  difficultyScreen.style.display = "none";
  startScreen.style.display = "flex";
};

// === 開始遊戲 ===
startBtn.onclick = () => {
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  startGame(currentSpeed);
};

// === 結束畫面按鈕 ===
retryBtn.onclick = () => {
  gameOverScreen.style.display = "none";
  startGame(currentSpeed);
};

changeDifficultyBtn.onclick = () => {
  gameOverScreen.style.display = "none";
  difficultyScreen.style.display = "flex";
};

backToMenuBtn.onclick = () => {
  gameOverScreen.style.display = "none";
  startScreen.style.display = "flex";
};

// === 遊戲主要邏輯 ===
function startGame(speed) {
  let score = 0;
  scoreBoard.textContent = `分數：${score}`;

  let snake = {
    body: [{ x: Math.floor(MAP_SIZE / 2), y: Math.floor(MAP_SIZE / 2) }],
    size: 5,
    direction: { x: 0, y: -1 },

    drawSnake: function () {
      this.moveSnake();
      ctx.fillStyle = "lime";
      for (let b of this.body) {
        ctx.fillRect(
          b.x * BLOCK_SIZE,
          b.y * BLOCK_SIZE,
          BLOCK_SIZE - 1,
          BLOCK_SIZE - 1
        );
      }
    },

    moveSnake: function () {
      const newBlock = {
        x: this.body[0].x + this.direction.x,
        y: this.body[0].y + this.direction.y,
      };
      this.body.unshift(newBlock);
      while (this.body.length > this.size) this.body.pop();
    },
  };

  let apple = {
    x: 5,
    y: 5,
    drawApple: function () {
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.x * BLOCK_SIZE,
        this.y * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
      );
    },
    putApple: function () {
      this.x = Math.floor(Math.random() * MAP_SIZE);
      this.y = Math.floor(Math.random() * MAP_SIZE);
    },
  };

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.drawSnake();
    apple.drawApple();

    // 🧺 吃到蘋果
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
      snake.size++;
      apple.putApple();
      score++;
      scoreBoard.textContent = `分數：${score}`;
    }

    // 🚧 撞牆或撞自己
    if (
      snake.body[0].x < 0 ||
      snake.body[0].x >= MAP_SIZE ||
      snake.body[0].y < 0 ||
      snake.body[0].y >= MAP_SIZE ||
      snake.body.slice(1).some(
        (b) => b.x === snake.body[0].x && b.y === snake.body[0].y
      )
    ) {
      clearInterval(gameInterval);
      showGameOver(score);
    }
  }

  // 🕹️ 鍵盤控制
  document.onkeydown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (snake.direction.y !== 1) snake.direction = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (snake.direction.y !== -1) snake.direction = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (snake.direction.x !== 1) snake.direction = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (snake.direction.x !== -1) snake.direction = { x: 1, y: 0 };
        break;
    }
  };

  apple.putApple();
  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, speed);
}

// === 顯示結束畫面 ===
function showGameOver(finalScore) {
  gameOverScreen.style.display = "flex";
  finalScoreText.textContent = `你的分數：${finalScore}`;
}
