var canvas = document.getElementById('canvas'); // 取得畫布元素
var ctx = canvas.getContext('2d'); // 使用2D繪圖
ctx.fillRect(300,100,500,600); //畫了一個座標為(300,100)的500px * 500px的矩形
ctx.clearRect(400,150,100,100); //再清除一個座標為(350,150)的100px * 100px的矩形形狀
ctx.clearRect(600,150,100,100);
ctx.strokeRect(425,175,50,50); //最後畫一個座標為(42,175)的50px * 50px的矩形邊框
ctx.strokeRect(625,175,50,50); 
ctx.clearRect(500,400,100,100); //再清除一個座標為(500,300)的100px * 100px的矩形形狀
 //畫三角形
ctx.beginPath(); //開始路徑
ctx.moveTo(150,50); //將起始點移到座標(150,50)
ctx.lineTo(250,200); //畫一條直線到(250,200)
ctx.lineTo(50,200); //再畫一條直線到(50,200)
ctx.closePath();
ctx.fillStyle='green'; //設定填充顏色為黑色
ctx.fill(); //最後填滿路徑，形成三角形

//畫愛心
ctx.beginPath(); //開始路徑
ctx.moveTo(75,40); //將起始點移到座標(75,40)
ctx.bezierCurveTo(75,37,70,25,50,25);
ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
ctx.bezierCurveTo(20,80,40,102,75,120);
ctx.bezierCurveTo(110,102,130,80,130,62.5);
ctx.bezierCurveTo(130,62.5,130,25,100,25);
ctx.bezierCurveTo(85,25,75,37,75,40);
ctx.closePath();
ctx.fillStyle='orange'; //設定填充顏色為紅色
ctx.fill(); //最後填滿路徑，形成紅色愛心

//畫圓形
ctx.beginPath(); //開始路徑
ctx.moveTo(50,50); //將起始點移到座標(150,50)
ctx.arc(100,150,50,0,2*Math.PI,true); //畫圓
ctx.closePath();
ctx.fillStyle='blue'; //設定填充顏色為藍色
ctx.fill(); //最後填滿路徑，形成藍色圓形


