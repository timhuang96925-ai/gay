const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const BLOCK_SIZE = 20;
const MAP_SIZE = canvas.width / BLOCK_SIZE;
let gameInterval;

function gameStart() {
  let snake = {
    body: [{ x: MAP_SIZE / 2, y: MAP_SIZE / 2 }],
    size: 5,
    direction: { x: 0, y: -1 },

    drawSnake: function () {
      this.moveSnake();
      ctx.fillStyle = "lime";
      for (let b of this.body) {
        ctx.fillRect(b.x * BLOCK_SIZE, b.y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
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
    x: 5, y: 5,
    drawApple: function () {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
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

    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
      snake.size++;
      apple.putApple();
    }

    if (
      snake.body[0].x < 0 ||
      snake.body[0].x >= MAP_SIZE ||
      snake.body[0].y < 0 ||
      snake.body[0].y >= MAP_SIZE ||
      snake.body.slice(1).some(b => b.x === snake.body[0].x && b.y === snake.body[0].y)
    ) {
      clearInterval(gameInterval);
      alert("💀 遊戲結束！");
      gameStart();
    }
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp": if (snake.direction.y !== 1) snake.direction = { x: 0, y: -1 }; break;
      case "ArrowDown": if (snake.direction.y !== -1) snake.direction = { x: 0, y: 1 }; break;
      case "ArrowLeft": if (snake.direction.x !== 1) snake.direction = { x: -1, y: 0 }; break;
      case "ArrowRight": if (snake.direction.x !== -1) snake.direction = { x: 1, y: 0 }; break;
    }
  });

  apple.putApple();
  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, 150);
}

gameStart();
