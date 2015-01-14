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
    this.x = this.x + this.width * dt;
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
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x0, y0, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x0;
    this.y = y0;
    this.width = 101;
    this.height = 83;
    this.speed = speed;
}

Player.prototype.update = function(dt){}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

// Now instantiate your objects.
var player = new Player(202, 83 * 5, 3);
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy(-101 * getRandomInt(1, 5), 83 * getRandomInt(1, 4), getRandomInt(1, 5));
    allEnemies.push(enemy);
}
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


