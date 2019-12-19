/**
 * \file Game.js
 * 
 * \author Christopher Beeman
 */
export { Game };

import { Snake } from "./snake.js";
import { Food } from "./food.js";

/** The actual rules and logic of the game snake */
export default class Game {

    constructor(row, col, scl) {
        /// Dimensions of the canvas
        this.rows = row;
        this.cols = col; 

        this.scl = scl; /// Scale of canvas

        this.snake = new Snake(this); /// Snake object being controlled
        
        this.paused = false;
        this.started = false;
        this.gameOver = false;   /// Flags inidicating the current state of the game
        this.food = new Food(this);
        this.score = this.snake.total; /// How many things have been eaten
    }
    
    /** Pause the game */
    pauseGame() {
        if (this.started){
            this.paused = !this.paused;
        }
    }

    /** Draw the game and all objects associated
     * \param ctx Context of the canvas
     */
    draw(ctx) {
        if (this.started){
            if (!this.gameOver){
                this.food.draw(ctx);
                this.snake.draw(ctx);
            }
            
            // A bunch of css that can definitely be moved to a different file for readability
            if (this.paused) {
                ctx.font = "30px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText("Paused", innerWidth/2, innerHeight/2);
            }
            ctx.font = "30px Arial";
            ctx.fillStyle = 'blue';
            ctx.fillText("Score: "+this.score, 0+60, innerHeight-40);

        }
        else if (this.gameOver) {
            ctx.rect(0,0,innerWidth, innerHeight);
            ctx.fillStyle = 'black';
            ctx.fill();


            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "red";
            ctx.fillText("GAME OVER", innerWidth/2, innerHeight/2);
            ctx.fillText("Q to start over",innerWidth/2, innerHeight/2 + 30);
        }
        else{
            ctx.rect(0,0,innerWidth, innerHeight);
            ctx.fillStyle = 'black';
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "red";
            ctx.fillText("Press Shift to Play!", innerWidth/2, innerHeight/2);
            ctx.fillText("P to Pause",innerWidth/2, innerHeight/2 + 30);
        }


    }

    /** Update all objects associated with the game */
    update() {
        // Check for food snake collision
        if (this.snake.collision(this.food)) {
            this.snake.total++;
            this.score++;
            this.food = new Food(this);
            this.snake.add = true;
        }

        // Check for game over conditions
        if (this.snake.tail){
            for (let i =0; i < this.snake.tail.length-1; i++) {
                if (this.snake.tail[i].x == this.snake.position.x && 
                    this.snake.tail[i].y == this.snake.position.y){
                        this.gameOver = true;
                        this.started = false;
                    }
            }
        }
        if ((this.snake.position.x < 0 || (this.snake.position.x + this.snake.width) > innerWidth) ||
            this.snake.position.y < 0 || (this.snake.position.y + this.snake.height) > innerHeight) {
            this.gameOver = true;
            this.started = false;
            
        }
        this.snake.update();
    }

    /** Start the game */
    start() {
        if (this.gameOver) {
            this.restart();
        }else {
            this.started = true;
        }
    }

    /** Restart the game */
    restart() {
        this.score = 0;
        this.gameOver = false;
        this.started = false;
        this.paused = false;
        this.snake = new Snake(this);
    }
}