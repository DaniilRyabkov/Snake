
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
    // ____________________________________________________________Snake.prototype.move _____________________________________________________________________

    //On line 1 we store the first element of the this.segments array (this is the snake's head) in the head variable.
    //On line 2 we created a newHead variable to use to store a cell object representing a new snake the head (which we are just about to create).
    //On line 3 we set this.direction to this.nextDirection - after this the direction of movement of the snake will be match last arrow key pressed.
    //line 4 we use a chain of if...else constructs for processing different directions. In each case we create a new one snake head and save it in the newHead variable.
    //On line 5 we call the checkCollision method to find out did the snake hit its tail or the wall?
    //on line 6 we will add a new head to it using unshift adding newHead to the beginning of the segments array.

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
/*
____________________________________________________________Snake.prototype.checkCollision _____________________________________________________________________
On line 1 we create a variable leftCollision and assign it is the meaning of the expression head.col === 0. So this variable will be true if the snake will collide with the left
 wall, in other words, if the head turns out to be in column 0.

In line 2 we determine whether the snake collided with any of the walls: using the operation || (OR) we check if the variable matches leftCollision, or topCollision, 
or rightCollision, or bottomCollision to true.

On line 3 we create the selfCollision variable by first assigning its value is false.

In line 4, we use a for loop to iterate through all the segments of the snake's body and check to see if any of the segments are in the same position as the new snake's head 
- for This is done by the expression head.equal(this.segments[i]). And the head and other body segments are cell objects, so we can use the cell object method to check position
matches equal.
And then we

set selfCollision to true on line 5

on line 6 we return from the method wallCollision ||selfCollision - this expression will be true if the snake collided either with the wall or with itself.
*/

Snake.prototype.checkCollision = function (head) {
     var leftCollision = (head.col === 0);
     var topCollision = (head.row === 0);
     var rightCollision = (head.col === widthInBlocks - 1);
     var bottomCollision = (head.row === heightInBlocks - 1);
     var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
     var selfCollision = false;
     for (var i = 0; i < this.segments.length; i++) {
     if (head.equal(this.segments[i])) {
        selfCollision = true;
    }
}
        return wallCollision || selfCollision;
};
/*
_____________________________________________________________________________var directions______________________________________________________________________

On line 1 we create an object to convert arrow key codes to strings.

On line 2 we specify
handler for keydown events inside the body element. This handler will be called whenever the user presses a key.

On line 3 we compare the variable newDirection with undefined and, if it is not equal to undefined, we call the method of the snake object
setDirection, passing it the string newDirection.

*/
var directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

$("body").keydown(function (event) {
    var newDirection = directions[event.keyCode];
     if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});

/*
_________________________________________________________________________________(Snake.prototype.setDirection)(Create an apple)______________________________________________________

in line 1 consists of four parts - for
handling the four invalid direction changes we want
prevent. The first part says that if the snake moves
up (this.direction equals "up") and the player pressed the down arrow
(newDirection equals "down")
The last line of the setDirection method will be executed only
if newDirection contains a valid new direction -
otherwise it won't get there because one of the return commands in the previous lines will terminate the method.

on line 2.
Create an apple
In this game, an apple is an object with three components:
the position property, which stores the position of the apple in the cell object type, the draw method, with which we will draw the apple
on the screen, and the move method
*/

Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
     return;
     } else if (this.direction === "right" && newDirection === "left") {
     return;
     } else if (this.direction === "down" && newDirection === "up") {
     return;
     } else if (this.direction === "left" && newDirection === "right") {
     return;
}
this.nextDirection = newDirection;
};