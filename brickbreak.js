
import Game from './game.js'

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');


const LEVEL1 = [
    [0,0,0,1,0,1,0,1,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1]
];

window.addEventListener('keydown', function move(event) {
    // User interactions to play the game 
    switch(event.keyCode){
        case 16:
            game.start();
            break;
        case 32:
            game.paddle.stop();
            break;
        case 37:
            game.paddle.moveLeft(game);
            break;
        case 39:
            game.paddle.moveRight(game);    
            break;
        case 80:
            game.pauseGame();
            break;
        case 81:
            game.restart();
            break;
    }
    event.preventDefault();
});

/**
 * Plays the game on a continuously updating canvas 
 */
function play() {

    requestAnimationFrame(play);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    if (game.started_game()) {
        if (!game.is_paused() && !game.gameOver) {
            game.update(ctx);
        }
    }
    game.draw(ctx);
}

let game = new Game(LEVEL1);
play();



