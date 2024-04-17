
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//canvas width and length
var width = canvas.width;
var height = canvas.height;
//block size
var blockSize = 10;
//width, length and block dimensions
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
//score
var score = 0;
//there is a function-score
var circle = function (x,y,radius,fillCircle){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    if (fillCircle){
    ctx.fill();
   }else{
    ctx.stroke();
   }
};










//draw a boundary through a function
var drawBorder = function () {
    //set the block size, height, width
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};
drawBorder();
//draw a boundary through a function
var drawScore = function () {
//set size, width and color
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score : " + score, blockSize, blockSize);
};

drawScore();  
// make text with a sign and its size and color <Game ower>
var gameOver = function () {
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game over!", width / 2, height / 2);
};
gameOver();
//This is a block constructor, the width and length of the row and column are entered here
var Block = function (col, row) {
    this.col = col;
    this.row = row;
};
//The drawSquare function is set which contains x and y. We make a square which we paint and draw through fillRect
Block.prototype.drawSquare = function (color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
     ctx.fillStyle = color;
     ctx.fillRect(x, y, blockSize, blockSize);
};
//Set the color for the Square
var sampleBlock = new Block(3, 4);
sampleBlock.drawSquare("LightBlue");
//Set to DrawCircle function which contains x and y. We make a circle, which we color and draw using fillRect
Block.prototype.drawCircle = function (color) {
    var centerX = this.col * blockSize + blockSize / 2;
    var centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};
//Set the color for the Block
var sampleCircle = new Block(4, 3);
sampleCircle.drawCircle("LightGreen");
//To make it easier to compare cell positions, we will create a method and add it to the prototype property of the Block constructor
Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};
//To move snake, we will add a new cell to the beginning of the segments array and remove the cell from the end.
var Snake = function () {
    this.segments = [   //Segment - Part
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ];
    this.direction = "right";
    this.nextDirection = "right";
};

//methods drawSquare.So for each segment of the snake body in the corresponding cell a square will be drawn.
Snake.prototype.draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("Blue");
    }
};
// 1 )) We save the first element of the array - the head of the snake
// 2 )) We created a variable newHead - representing the new snake head
// 3 )) We set this.direction to this.nextDirection - means the direction of movement of the snake will be match last arrow key pressed
// 4 )) Depending on the direction we add or subtract one from the valuerow or column of the current head to place the new head right next to her
// 5 )) We call the checkCollision method, to find out whether the snake crashed into its tail or into the wall.
// 6 )) We will add a new head to it by adding unshift.newHead to the beginning of the array segments.
Snake.prototype.move = function () {
    var head = this.segments[0];
    var newHead;
    this.direction = this.nextDirection;
    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }
    if (this.checkCollision(newHead)) {
        gameOver();
    return;
}
this.segments.unshift(newHead);
if (newHead.equal(apple.position)) {
    score++;
    apple.move();
} else {
    this.segments.pop();
}
};

