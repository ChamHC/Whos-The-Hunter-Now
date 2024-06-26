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

    removeToolUI() {
        // Emit event to UIScene to remove the tool
        if (this.player === this.scene.playerA.sprite) {
            //emit a delayed call before calling remove tool, if not the tool might crash the UI
            this.delay = this.scene.time.delayedCall(1000, () => {
                this.scene.game.events.emit('removePlayer1Tool');
            });
        } else if (this.player === this.scene.playerB.sprite) {

            this.delay = this.scene.time.delayedCall(1000, () => {
                this.scene.game.events.emit('removePlayer2Tool');
            });
        }
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

        this.scene.playerA.playSound('whip', 0.3);
        
        if (this.player === this.scene.playerA.sprite){
            this.enemy = this.scene.playerB.sprite;
        }
        else if (this.player === this.scene.playerB.sprite){
            this.enemy = this.scene.playerA.sprite;
        }
        
        
        console.log("Hello! im being called")
        this.removeToolUI();
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

        this.scene.playerA.playSound('woosh', 0.5);

        if (this.player.flipX){
            this.player.body.velocity.x -= 680;
        }
        else {
            this.player.body.velocity.x += 680;
        }

        this.removeToolUI();
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
        this.player.body.velocity.y -= 380;
        this.scene.playerA.playSound('woosh', 0.5);
        this.removeToolUI();
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

    create() {
        console.log("Suspicious Mushroom created");
        if (this.player === this.scene.playerA.sprite) {
            this.enemy = this.scene.playerB;
            this.playerObj = this.scene.playerA;
        } else if (this.player === this.scene.playerB.sprite) {
            this.enemy = this.scene.playerA;
            this.playerObj = this.scene.playerB;
        }

        // Create the mushroom sprite
        this.sprite = this.scene.physics.add.sprite(this.playerObj.sprite.x, this.playerObj.sprite.y, 'Suspicious Mushroom Outline');

        let throwVelocityX = this.playerObj.sprite.flipX ? -200 : 200;
        let throwVelocityY = -300;

        this.sprite.setVelocity(throwVelocityX, throwVelocityY);
        this.sprite.setGravityY(500); 

        this.scene.physics.add.collider(this.sprite, this.scene.platform.platforms, this.OnFloor, null, this);
        this.scene.physics.add.overlap(this.sprite, this.enemy.sprite, this.onOverlap, null, this);

        this.scene.playerA.playSound('put', 1);

        this.removeToolUI();
    }

    OnFloor() {
        this.sprite.setVelocity(0, 0);
        this.sprite.setGravityY(0);
    }

    onOverlap(){
        console.log("Suspicious Mushroom Overlap");
        this.invertKeys(this.enemy);
        this.playerObj.playSound('mushroom', 0.4);   
        this.sprite.destroy();
    }

    invertKeys(player) {
        if (this.isInverted) return;
        this.isInverted = true;

        // Save original keys
        this.originalKeys = {
            moveLeftKey: player.moveLeftKey,
            moveRightKey: player.moveRightKey,
            jumpKey: player.jumpKey,
            crouchKey: player.crouchKey,
            castKey: player.castKey
        };

        // invert key bindings
        player.moveLeftKey = this.originalKeys.moveRightKey;
        player.moveRightKey = this.originalKeys.moveLeftKey;
        player.jumpKey = this.originalKeys.crouchKey;
        player.crouchKey = this.originalKeys.jumpKey;

        // Revert keys back after 3 seconds
        this.scene.time.delayedCall(3000, () => {
            player.moveLeftKey = this.originalKeys.moveLeftKey;
            player.moveRightKey = this.originalKeys.moveRightKey;
            player.jumpKey = this.originalKeys.jumpKey;
            player.crouchKey = this.originalKeys.crouchKey;
            this.isInverted = false;
        }, [], this);
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
        this.scene.playerA.playSound('equipshield', 0.3);
        this.hasTriggered = false;
        this.delayCall = null
        this.scene.physics.add.overlap(this.scene.playerA.sprite, this.scene.playerB.sprite, this.onOverlap, null, this);

        this.removeToolUI();
    }

    update(){
        if (this.hasTriggered && this.delayCall === null){
            console.log("Delaying call");
            this.delayCall = this.scene.time.delayedCall(1000, () => {
                this.isCompleted = true;
                console.log("Triggered!")
            });
        }
    }

    onOverlap(){
        if (this.hasTriggered) return;
        this.scene.playerA.playSound('shield', 0.3);
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
        this.scene.playerA.playSound('lightning', 0.7);
        if (this.player === this.scene.playerA.sprite){
            this.enemy = this.scene.playerB;
        }
        else if (this.player === this.scene.playerB.sprite){
            this.enemy = this.scene.playerA;
        }

        this.enemy.changeState(this.enemy.stunState);
        this.removeToolUI();
        
    }

    update(){
        console.log("Worn Hat Update")

        this.isCompleted = true;
    }
}