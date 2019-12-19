
export { Snake };


export default class Snake {
    constructor(game){
        this.game = game;

        this.position = {
            x: 200,
            y: 200
        };
        this.size = 20;
        this.speed = {
            dx: 0,
            dy: 0
        };
        this.width = 20;
        this.height = 20;
        this.add = false;
        this.tail = [];
        this.total = 0;
    }
    
    draw(ctx) {
        ctx.beginPath();
        
        for (let i = 0; i < this.tail.length; i++) {
            ctx.rect(this.tail[i].x, this.tail[i].y, this.size, this.size);
            ctx.fillStyle = 'yellow';
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.fill();
        }

        ctx.closePath();
        
    }

    update() {

        for (let i = 0; i < this.tail.length -1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total] = {x:this.position.x, y: this.position.y};

        this.position.y += this.speed.dy*this.game.scl;
        this.position.x += this.speed.dx*this.game.scl;
        
    }
    
    moveLeft() {
        this.speed.dx = -1;
        this.speed.dy = 0;
        // this.update();
    }

    moveRight() {
        this.speed.dx = 1;
        this.speed.dy = 0;
        // this.update();
    }

    moveUp() {
        this.speed.dy = -1;
        this.speed.dx = 0;
        // this.update();
    }

    moveDown() {
        this.speed.dy = 1;
        this.speed.dx = 0;
        // this.update();
    }

    collision(object) {
        let topObject = object.position.y;
        let leftObject = object.position.x;
        let rightObject = object.position.x + object.width;
        let bottomObject = object.position.y + object.height;

        if ((this.position.y) >= (topObject)
            && this.position.x >= (leftObject)
            && (this.position.x + this.width) <= (rightObject)
            && (this.position.y+this.height) <= (bottomObject)) {
                return true;
        }return false;
    }
}





