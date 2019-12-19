/**
 * \file paddle.js
 * \author Christoper Beeman
 * Paddle object the user will control to bounce the ball back
 */

export { Paddle };

/**
 * Paddle object controlled by the user to play
 */
export default class Paddle {
    constructor(game) {
        this.width = 200;
        this.height = 20;
        this.position = {
            x: innerWidth/2 - this.width/2,
            y: innerHeight - this.height -20
        };

        // Example of aggregation. Paddle cannot exist without a game object.
        // 2 way connection between game and paddle.
        this.game = game;

        this.dx = 0;
        this.lastSpeed = this.dx; // Keeps track of last speed in case paused
    }

    /**
     * Draws the paddle
     * @param {ctx of the canvas} ctx 
     */
    draw(ctx){
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = 'blue';
        ctx.fill();
    }
    
    /**
     * On user left arrow, update paddle direction
     * @param {game paddle is apart of} game 
     */
    moveLeft(){
        if (!this.game.is_paused()&&this.game.started_game()){
            this.dx = -7;
            this.lastSpeed = this.dx;
        }
    }
    
    /**
     * On user right arrow, update paddle
     * @param {game the paddle is apart of} game 
     */
    moveRight(){
        if (!this.game.is_paused()&&this.game.started_game()){
            this.dx = 7;
            this.lastSpeed = this.dx;
        }
    }
    
    /**
     * Stops the paddle on user space baar
     */
    stop(){
        if (this.dx != 0) {this.dx = 0}
        else {this.dx = this.lastSpeed}
    }

    /**
     * Resets position and speed of paddle
     */
    reset(){
        this.position.x = innerWidth/2 - this.width/2;
        this.position.y = innerHeight - this.height - 20;
        this.dx = 0;
    }

    /**
     * Updates the position and movement of the paddle
     */
    update(){
        if (this.position.x <= 0 || this.position.x + this.width >= innerWidth){
            this.dx = -this.dx;
        }
        this.position.x += this.dx;
    }
    
}