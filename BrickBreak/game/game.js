/**
 * \file game.js
 * \author Christopher Beeman
 * Creates the actual game that holds all game objects
 */

import {Ball} from './ball.js';
import {Paddle} from './paddle.js';
import {Brick} from './brick.js'

export { Game };

/**
 * The brickbreak game that is being played
 * Acts as container to all individual pieces of brickbreak
 */
export default class Game {
    constructor(level) {
        this.ball = new Ball(this, 250, 350);
        this.paddle = new Paddle(this);
        this.bricks = []; // array of bricks for the specified level
        this.lives = 3;
        this.level = level;
        // initializing all aspects of the game

        // Takes a 2d array, level, of where to place each brick
        for (let i = 0; i < level.length; i++){
            let row = level[i];
            for (let j = 0; j < row.length; j++){
                if (row[j] == 1){
                    this.bricks.push(
                    new Brick(((j*innerWidth/10) < innerWidth ? innerWidth/10: innerWidth-x)* j,75+52*i));
                }
            }
        }

        this.count = this.bricks.length; // number of bricks in the game
 
        this.paused = false;
        this.started = false; // flags representing status of the game
        this.gameOver = false;
    }

    /**
     * Starts the game
     */
    start() {
        this.started = true;
    }

    /**
     * Restarts the entire game
     */
    restart() {
        if (this.paused) {
            this.paused = false;
        }
        this.gameOver = false;
        this.lives = 3;
        this.started = false;
        this.ball.reset();
        this.paddle.reset();
        // reset all game objects
        
        for (let i = 0; i < this.bricks.length; i++) {
            if (this.bricks[i].deleted){
                this.bricks[i].deleted = false;
            }
            // makes sure all bricks are reset for the current level
        }

        this.count = this.bricks.length;
        this.draw();
    }

    /**
     * Draws all attributes of game
     * @param {ctx of the canvas} ctx 
     */
    draw(ctx) {

        if (this.lives == 0 || this.count == 0){
            this.gameOver = true;
        }

        // Draws a different screen for each flag.
        // Can probably be done in a much more readable way, such as creating css ids of each screen
        // and then getting each element by id. Will work on that later
        if (this.started) {
            ctx.rect(0,0,innerWidth,innerHeight);
            ctx.fillStyle = "black";
            ctx.fill();
            
            if (!this.gameOver){
                ctx.font = '30px Arial';
                ctx.fillStyle = 'red';
                ctx.fillText("Lives: "+this.lives, 75, 30);
                this.ball.draw(ctx);
                this.paddle.draw(ctx);
                for (let i = 0; i < this.bricks.length; i++) {
                    if (!this.bricks[i].deleted){
                        this.bricks[i].draw(ctx);
                    }
                }
            }else {
                if (this.lives == 0){
                    let img = new Image();
                    img.src = 'images/gameOver.png'
                    ctx.drawImage(img, 0, 0, img.width,img.height, 0, 0, innerWidth, innerHeight);
                }else if (this.count == 0){
                    let img = new Image();
                    img.src = 'images/victory.png'
                    ctx.drawImage(img, 0, 0, img.width,img.height, 0, 0, innerWidth, innerHeight);
                }
                
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                if (this.lives == 0){
                    ctx.fillStyle = "red";
                    ctx.fillText("GAME OVER", innerWidth/2, innerHeight/2);
                    ctx.fillText("Q to start over",innerWidth/2, innerHeight/2 + 30);
                }else if (this.count == 0){
                    ctx.fillStyle = "white";
                    ctx.fillText("You Win!!", innerWidth/2, 60);
                    ctx.fillText("Q to play again",innerWidth/2, 90);
                }

            }
            
            if (this.paused) {
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Paused", innerWidth/2, innerHeight/2);
            }
        }else {
            let img = new Image();
            img.src = 'images/screen.png'
            ctx.drawImage(img, 0, 0, img.width,img.height, 0, 0, innerWidth, innerHeight);

            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Press Shift to Play!", innerWidth/2, innerHeight/2);
            ctx.fillText("P to pause",innerWidth/2, innerHeight/2 + 30);
        }

    }

    /**
     * Updates every aspect of the game
     * @param {ctx of the canvas updating} ctx 
     */
    update(ctx) {  
        this.ball.update(this.paddle, this.bricks);
        this.paddle.update();
        for (let i = 0; i < this.bricks.length; i++) {
            this.bricks[i].draw(ctx);
        }
    }

    /**
     * Pauses the game
     */
    pauseGame() {
        if (this.started) {
            this.paused = !this.paused;
        }
    }

    is_paused() {
        return this.paused;
    }

    started_game() {
        return this.started;
    }
}