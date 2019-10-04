
export { Brick };

/**
 * Brick object trying to break
 */
export default class Brick {
    
    constructor(x, y) {

        this.position = {
            x: x,
            y: y
        };

        this.image = new Image();
        this.image.src = "images/brick.png"
        this.width = innerWidth / 10;
        this.height = 52;
        this.deleted = false;
        
        this.edges = {
            top: this.position.y,
            left: this.position.x,
            right: this.position.x + this.width,
            bottom: this.position.y + this.height
        };
    }

    /**
     * Deletes a brick after collision
     */
    delete() {
        this.deleted = true;
    }

    /**
     * Draws a brick object
     * @param ctx Context of the canvas
     */
   draw(ctx) {
        if (!this.deleted) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }
}