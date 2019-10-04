
export{ Ball };

/**
 * Ball object moving around in the game context
 */
export default class Ball {
    
    constructor(x, y) {
        
        this.position = {
            x: x,
            y: y        
        };
        this.radius = 15;

        this.dx = 5;
        this.dy = 5;

        // Finds the edges of the ball for collision detection
        this._edges = function() {
            this.edges = {
                top: this.position.y - this.radius,
                left: this.position.x,
                right: this.position.x + this.radius,
                bottom: this.position.y + this.radius
            }
        }
        this._edges();
    }

    /**
     * Draws the ball object
     * @param {ctx of the game} ctx 
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = 'red';
        ctx.stroke();       
    }

    /**
     * Resets speed and position of the ball to defaults
     */
    reset() {
        this.dx = 5;
        this.dy = 5;
        this.position.x = 250;
        this.position.y = 350;
    }

    /**
     * Collision detection to update ball
     * @param {object ball is coming in contact with} object 
     */
    collision(object) {
        let topObject = object.position.y;
        let leftObject = object.position.x;
        let rightObject = object.position.x + object.width;
        let bottomObject = object.position.y + object.height;

        if (this.edges.bottom >= topObject
            && this.edges.left >= leftObject
            && this.edges.right <= rightObject
            && this.edges.top <= bottomObject) {
                // Collision detected
                return true;
        }
        return false;
    }

    /**
     * Updates the movement of the ball
     * @param {game the ball is apart of} game 
     * @param {game paddle} paddle 
     * @param {vector containing all bricks} bricks 
     */
    update(game, paddle, bricks) {
        
        // Checks for side of window collisions
        if (this.position.x + this.radius >= innerWidth || this.position.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.position.y - this.radius < 0){
            this.dy = -this.dy;
        } 
        
        // Checks for ball going past paddle
        if (this.position.y + this.radius >= innerHeight) {
            game.lives -= 1;
            this.reset();
            paddle.reset();
        }

        // Collision with paddle
        if (this.collision(paddle)) {
            this.dy = -this.dy;
            this.position.y = paddle.position.y - this.radius;
        }

        // Checking for collision with bricks
        for (let i = 0; i < bricks.length; i++) {
            if (bricks[i]) {
                if (this.collision(bricks[i]) && !bricks[i].deleted){
                    let b_collision = bricks[i].edges.bottom - this.position.y;
                    let t_collision = this.edges.bottom - bricks[i].position.y;
                    let l_collision = this.edges.right - bricks[i].position.x;
                    let r_collision = bricks[i].edges.right - this.position.x;
                    if ((l_collision <= r_collision && l_collision <= t_collision && l_collision <= b_collision) ||
                        (r_collision <= l_collision && r_collision <= t_collision && r_collision <= b_collision ))
                    {
                        this.dx = -this.dx;
                    }else{this.dy = -this.dy;}
                    
                    bricks[i].delete();
                    game.count -= 1;
                }
            }
        }

        this.position.x += this.dx;
        this.position.y += this.dy;
        this._edges()
        // Update the actual ball object
    }
}