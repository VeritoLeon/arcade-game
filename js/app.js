// Enemies our player must avoid
var Enemy = function(x0, y0, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x0;
    this.y = y0;
    this.width = 101;
    this.height = 83;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 101 * 5)
    {
        this.x = -(101 * 5);
        this.speed = getRandomInt(2, 5);

    }
    this.x = this.x + this.width * this.speed * dt;
    this.checkCollisions();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.checkCollisions = function() {
    var rect1 = {x: this.x, y: this.y, width: this.width, height: this.height}
    var rect2 = {x: player.x, y: player.y, width: player.width, height: player.height}

    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {
        alert('Game over');
        reset();
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x0, y0, speed) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x0;
    this.y = y0;
    this.width = 101;
    this.height = 83;
    this.speed = speed;
    this.won = false;
    this.lives = 3;
}

Player.prototype.update = function(dt){
    if(this.y === 0) {
        this.won = true;
        this.sprite = 'images/char-princess-girl.png';
        this.y = 0;
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.won) {
        win();
    }
}
Player.prototype.handleInput = function(direction){
    var maxRowIndex = 5,
        maxColIndex = 4,
        currentRow = Math.floor(this.y/83),
        currentCol = Math.floor(this.x/101);

    switch(direction) {
        case 'left':
            if (currentCol > 0) {
                this.x = (currentCol - 1) * 101;
            }
            break;
        case 'up':
            if (currentRow > 0) {
                this.y = (currentRow - 1) * 83;
            }
            break;
        case 'right':
            if(currentCol < maxColIndex) {
                this.x = (currentCol + 1) * 101;
            }
            break;
        case 'down':
            if(currentRow < maxRowIndex) {
                this.y = (currentRow + 1) * 83;
            }
            break;
    }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function reset() {
    player.x = 202;
    player.y = 83 * 4;
}

function win() {
    ctx.fillStyle = "#000"; // Set color to black
    ctx.font = "100px serif";
    ctx.fillText("You won!", 101/2, 83*3.5);
    allEnemies = [];
    document.removeEventListener('keyup', listener);
}

// Now instantiate your objects.
var player = new Player(202, 83 * 4, 3);
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy(-101 * getRandomInt(1, 3), 83 * (i + 1), getRandomInt(2, 5));
    allEnemies.push(enemy);
}
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var listener;
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', listener = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


