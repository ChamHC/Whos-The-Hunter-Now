export class Tools {
    constructor(scene, player){
        this.scene = scene;
        this.player = player;
        this.isCompleted = false;

        this.create();
    }

    create(){   

    }

    update(){

    }
}

export class DadBelt extends Tools {
    constructor(scene, player){
        super(scene, player);
    }

    create(){
        console.log("Dad Belt created");
        this.length = {current: 0, max: 200};
        this.lineGraphics = this.scene.add.graphics();
        
        if (this.player === this.scene.playerA.sprite){
            this.enemy = this.scene.playerB.sprite;
        }
        else if (this.player === this.scene.playerB.sprite){
            this.enemy = this.scene.playerA.sprite;
        }
    }

    update(){
        console.log("Dad Belt Update");
        this.drawLine();
        
        // If the belt intersects with enemy
        if ((this.player.flipX && this.player.x - this.length.current < this.enemy.x && this.player.x > this.enemy.x) &&
            (this.player.y - this.player.height / 3 < this.enemy.y && this.player.y + this.player.height / 3 > this.enemy.y) ||
            (!this.player.flipX && this.player.x + this.length.current > this.enemy.x && this.player.x < this.enemy.x) &&
            (this.player.y - this.player.height / 3 < this.enemy.y && this.player.y + this.player.height / 3 > this.enemy.y)) {
            this.onOverlap();
        }

        if(this.length.current >= this.length.max){
            this.lineGraphics.clear();
            this.isCompleted = true;
        }
    }

    drawLine(){     
        this.lineLength = Math.min(this.length.max, this.length.current + 10);  // Increase line length by 10

        if (this.player.flipX){this.playerDirection = -1;}
        else {this.playerDirection = +1;}

        const startPoint = {
            x: this.player.x,
            y: this.player.y - this.player.height / 3
        };
        const endPoint = {
            x: this.player.x + this.playerDirection * this.lineLength,
            y: this.player.y - this.player.height / 3
        };

        this.lineGraphics.clear();
        // Set the color to animal brown skin similar to belt color
        this.lineGraphics.lineStyle(5, 0x8B4513);
        this.lineGraphics.beginPath();
        this.lineGraphics.moveTo(startPoint.x, startPoint.y);
        this.lineGraphics.lineTo(endPoint.x, endPoint.y);
        this.lineGraphics.closePath();
        this.lineGraphics.stroke();

        this.length.current = this.lineLength;
    }

    onOverlap(){
        this.enemy.body.velocity.x += 100 * this.playerDirection;
        this.lineGraphics.clear();
        this.hasCompleted = true;
    }
}

export class DashyFeather extends Tools {
    constructor(scene, player){
        super(scene, player);
    }

    create(){
        // Player dash forward
        if (this.player.flipX){
            if (this.player.body.onFloor())
                this.player.body.velocity.x -= 500;
            else
                this.player.body.velocity.x -= 200;
        }
        else {
            if (this.player.body.onFloor())
                this.player.body.velocity.x += 500;
            else
                this.player.body.velocity.x += 200;
        }
    }

    update(){
        this.isCompleted = true;
    }
}

export class SlimyBoot extends Tools {
    constructor(scene, player){
        super(scene, player);
    }

    create(){
        console.log("Slimy Boot created");
    }

    update(){
        console.log("Slimy Boot Update")

        this.isCompleted = true;
    }
}

export class SuspiciousMushroom extends Tools {
    constructor(scene, player){
        super(scene, player);
    }

    create(){
        console.log("Suspicious Mushroom created");
    }

    update(){
        console.log("Suspicious Mushroom Update")

        this.isCompleted = true;
    }
}

export class WoodenBuckler extends Tools {
    constructor(scene, player){
        super(scene, player);
    }

    create(){
        console.log("Wooden Buckler created");
        this.hasTriggered = false;
        this.delayCall = null
        this.scene.physics.add.overlap(this.scene.playerA.sprite, this.scene.playerB.sprite, this.onOverlap, null, this);
    }

    update(){
        if (this.hasTriggered && this.delayCall === null){
            console.log("Delaying call");
            this.delayCall = this.scene.time.delayedCall(1000, () => {
                this.isCompleted = true;
            });
        }

    }

    onOverlap(){
        if (this.hasTriggered) return;
        if (this.player === this.scene.playerA.sprite && this.scene.playerA.playerRole === "Hunted"){
            if (this.scene.playerA.sprite.x < this.scene.playerB.sprite.x){
                this.scene.playerA.sprite.body.velocity.x -= 500;
                this.scene.playerB.sprite.body.velocity.x += 500;
            }
            else {
                this.scene.playerA.sprite.body.velocity.x += 500;
                this.scene.playerB.sprite.body.velocity.x -= 500;
            }
        }
        else if (this.player === this.scene.playerB.sprite && this.scene.playerB.playerRole === "Hunted"){
            if (this.scene.playerB.sprite.x < this.scene.playerA.sprite.x){
                this.scene.playerB.sprite.body.velocity.x -= 500;
                this.scene.playerA.sprite.body.velocity.x += 500;
            }
            else {
                this.scene.playerB.sprite.body.velocity.x += 500;
                this.scene.playerA.sprite.body.velocity.x -= 500;
            }
        }
        this.hasTriggered = true;
    }
}

export class WornHat extends Tools {
    constructor(scene, player){
        super(scene, player);
    }

    create(){
        console.log("Worn Hat created");
    }

    update(){
        console.log("Worn Hat Update")

        this.isCompleted = true;
    }
}