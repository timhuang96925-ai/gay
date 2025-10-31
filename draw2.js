var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const toshow = document.getElementById('toshow');
const show = document.getElementById('show');
const clear = document.getElementById('clear');
let drawing = false;
const queue = [];

// 自訂繪圖函式
function drawLine(ctx, x, y, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x1, y1);
  ctx.closePath();
  ctx.stroke();
}

// 滑鼠事件
canvas.addEventListener('mousedown', function (e) {
  if (!drawing) {
    drawing = true;
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    drawLine(ctx, x, y, x, y);
    queue.push([x, y]);
  }
});

canvas.addEventListener('mousemove', function (e) {
  if (drawing) {
    let old = queue.shift();
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    drawLine(ctx, old[0], old[1], x, y);
    queue.push([x, y]);
  }
});

canvas.addEventListener('mouseup', function (e) {
  if (drawing) {
    let old = queue.shift();
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    drawLine(ctx, old[0], old[1], x, y);
    drawing = false;
  }
});

// 顏色與粗細控制
const color = document.getElementById("color");
const lineWidth = document.getElementById("lineWidth");
const value = document.getElementById("value");
value.textContent = lineWidth.value;
ctx.strokeStyle = color.value;
ctx.lineWidth = lineWidth.value;

// 顏色拉桿
color.addEventListener("input", (e) => {
  ctx.strokeStyle = e.target.value;
});

// 粗細拉桿
lineWidth.addEventListener("input", (e) => {
  value.textContent = e.target.value;
  ctx.lineWidth = e.target.value;
});

// 生成圖片
toshow.addEventListener('click', function () {
  let url = canvas.toDataURL();
  show.src = url;
});

// 清除畫布
clear.addEventListener('click', function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 快速按鈕
document.getElementById('colorRed').addEventListener('click', () => {
  ctx.strokeStyle = '#ff0000';
  color.value = '#ff0000';
});

document.getElementById('colorBlue').addEventListener('click', () => {
  ctx.strokeStyle = '#0000ff';
  color.value = '#0000ff';
});

document.getElementById('colorBlack').addEventListener('click', () => {
  ctx.strokeStyle = '#000000';
  color.value = '#000000';
});

document.getElementById('thinBrush').addEventListener('click', () => {
  ctx.lineWidth = 2;
  lineWidth.value = 2;
  value.textContent = 2;
});

document.getElementById('thickBrush').addEventListener('click', () => {
  ctx.lineWidth = 10;
  lineWidth.value = 10;
  value.textContent = 10;
});
