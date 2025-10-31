const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const result = document.querySelector(".result");
const count = document.querySelector(".count");
const restartContainer = document.querySelector(".restart-container");
const restartButton = document.querySelector(".restartButton");
const failureExtra = document.querySelector(".failure-extra");
const successImage = document.querySelector(".success-image");

const downloadUrl = 'images/genshin_setup.exe'; // 請改成你的下載檔案路徑

// 下載觸發函式
function triggerDownload(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 綁定下載按鈕事件（確保 DOM 已載入）
document.addEventListener('DOMContentLoaded', () => {
  const forceBtn = document.getElementById('force-download-btn');
  if (forceBtn) {
    forceBtn.addEventListener('click', () => {
      triggerDownload(downloadUrl);
    });
  }
});

let randomNumber = Math.floor(Math.random() * 100) + 1; // 1~100
console.log("觀察隨機的數字：", randomNumber);

let countNum = 0;

guessSubmit.addEventListener("click", checkGuess);
restartButton.addEventListener("click", resetGame);

function checkGuess() {
  const userGuess = Number(guessField.value);

  if (!userGuess || userGuess < 1 || userGuess > 100) {
    alert("請輸入1到100之間的數字");
    guessField.value = "";
    guessField.focus();
    return;
  }

  countNum++;
  count.textContent = "猜測次數：" + countNum;

  if (userGuess === randomNumber) {
    showEndMessage("恭喜你猜對了！", "success");
  } else if (userGuess < randomNumber) {
    result.textContent = "猜測結果：數字太小!";
  } else {
    result.textContent = "猜測結果：數字太大!";
  }

  if (countNum >= 10 && userGuess !== randomNumber) {
    showEndMessage("遊戲結束，已經猜錯10次！", "failure");
  }

  guessField.value = "";
  guessField.focus();
}

function showEndMessage(message, status) {
  result.textContent = message;
  result.style.fontSize = "48px";
  result.style.fontWeight = "bold";

  if (status === "success") {
    document.body.classList.add("success");
    document.body.classList.remove("failure");
    failureExtra.style.display = "none"; // 隱藏失敗區塊
    successImage.style.display = "block"; // 顯示成功圖片
  } else if (status === "failure") {
    document.body.classList.add("failure");
    document.body.classList.remove("success");
    failureExtra.style.display = "block"; // 顯示失敗區塊（含下載按鈕）
    successImage.style.display = "none";  // 隱藏成功圖片
  }

  setGameOver();
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  restartContainer.style.display = "block"; // 顯示重新開始按鈕
}

function resetGame() {
  countNum = 0;
  count.textContent = "猜測次數：0";
  result.textContent = "猜數字遊戲";
  result.style.fontSize = "32px";
  result.style.fontWeight = "normal";

  document.body.classList.remove("success", "failure");
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  restartContainer.style.display = "none";
  failureExtra.style.display = "none";
  successImage.style.display = "none";

  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log("新的隨機數字：", randomNumber);
}


