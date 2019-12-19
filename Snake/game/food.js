
export { Food };

export default class Food {
    constructor(game){
        this.game = game;

        this.width = 20;
        this.height = 20;
        this.position = {
            
            x: Math.floor(Math.random() * Math.floor(game.cols))*game.scl,
            y: Math.floor(Math.random() * Math.floor(game.rows))*game.scl
        
        }
        
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
    update() {

        this.position.x = Math.floor(Math.random() * Math.floor(this.game.cols))*this.game.scl;
        this.position.y = Math.floor(Math.random() * Math.floor(this.game.rows))*this.game.scl;    

    }
}