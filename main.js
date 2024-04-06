
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

var score = 0;

var circle = function (x,y,radius,fillCircle){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    if (fillCircle){
    ctx.fill();
   }else{
    ctx.stroke();
   }
};











var drawBorder = function () {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};
drawBorder();

var drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score : " + score, blockSize, blockSize);
};

drawScore();  

var gameOver = function () {
    //clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game over!", width / 2, height / 2);
};
gameOver();

var Block = function (col, row) {
    this.col = col;
    this.row = row;
};

Block.prototype.drawSquare = function (color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
     ctx.fillStyle = color;
     ctx.fillRect(x, y, blockSize, blockSize);
};

var sampleBlock = new Block(3, 4);
sampleBlock.drawSquare("LightBlue");

Block.prototype.drawCircle = function (color) {
    var centerX = this.col * blockSize + blockSize / 2;
    var centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};
var sampleCircle = new Block(4, 3);
sampleCircle.drawCircle("LightGreen");