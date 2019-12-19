
import { Game } from "./game/game.js";

var canvas = document.querySelector('canvas');
const WIDTH = canvas.width = innerWidth;
const HEIGHT = canvas.height = innerHeight - 40;
var ctx = canvas.getContext('2d');
var scl = 20;

const rows = HEIGHT / scl;
const cols = WIDTH / scl;


window.addEventListener('keydown', (event) => {
    switch(event.keyCode){
        case 16:
            game.start();
            break;
        case 37:
            game.snake.moveLeft();
            break;
        case 38:
            game.snake.moveUp();
            break;
        case 39:
            game.snake.moveRight();    
            break;
        case 40:
            game.snake.moveDown();
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

function play() {
    window.setInterval( () => {
        ctx.clearRect(0,0, WIDTH, HEIGHT)

    
        if (game.started) {
            if (!game.paused && !game.gameOver) {
                game.update();
            }
        }

        game.draw(ctx);
    }, 100);

}

let game = new Game(rows, cols, scl);
play();