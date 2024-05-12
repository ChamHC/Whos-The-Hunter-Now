export default class Camera {
    constructor(scene, playerA, playerB, background) {
        this.scene = scene;
        this.playerA = playerA;
        this.playerB = playerB;
        this.background = background;
        this.create();
    }
    
    /*
    The camera follows both the hunter and the hunted, but prioritised following the hunted.
    The camera will zoom in and out to keep both players in view, but cannot zoom out further than certain limits.
    If camera is already zoomed out to the maximum, and the hunter is too far away from the hunted, the camera will prioritise following the hunted.
    */
    
    create(){
        this.config = this.scene.sys.game.config;
        this.target = {
            x: (this.playerA.sprite.x + this.playerB.sprite.x) / 2,
            y: (this.playerA.sprite.y + this.playerB.sprite.y) / 2,
        };
        this.zoomRange = {
            min: 1, 
            max: 1.5, 
            deathZoom: 3
        };

        const leftX = this.background.bgImages[0].x - this.background.bgImages[0].width / 2;
        const rightX = this.background.bgImages[0].width;
        this.scene.cameras.main.setBounds(leftX, 0, rightX, this.config.height);
    }

    update(){
        this.scene.cameras.main.setScroll(this.target.x - this.config.width / 2, this.target.y - this.config.height / 2);

        if (this.playerA.currentState != this.playerA.deadState && this.playerB.currentState != this.playerB.deadState){
            this.target = {
                x: (this.playerA.sprite.x + this.playerB.sprite.x) / 2,
                y: (this.playerA.sprite.y + this.playerB.sprite.y) / 2,
            };
            // Set Dynamic Zoom based on distance between players, with a minimum zoom of 1 and maximum zoom of 1.5
            // The camera will zoom out as the players move further apart, and zoom in as they move closer together
            const distance = Phaser.Math.Distance.Between(this.playerA.sprite.x, this.playerA.sprite.y, this.playerB.sprite.x, this.playerB.sprite.y);
            const zoom = Phaser.Math.Clamp(this.zoomRange.max - distance / 2000, this.zoomRange.min, this.zoomRange.max);
            this.scene.cameras.main.setZoom(zoom);
        }
        else if (this.playerA.currentState == this.playerA.deadState){
            // Slowly move the camera towards player A position
            this.tweenToPlayerA = this.scene.tweens.add({
                targets: this.target,
                x: this.playerA.sprite.x,
                y: this.playerA.sprite.y,
                duration: 250,
                ease: 'Linear'
            });

            if (this.scene.cameras.main.zoom < this.zoomRange.deathZoom){
                this.scene.cameras.main.setZoom(this.scene.cameras.main.zoom + 0.01);
            }
        } 
        else if (this.playerB.currentState == this.playerB.deadState){
            // Slowly move the camera towards player B position
            this.tweenToPlayerB = this.scene.tweens.add({
                targets: this.target,
                x: this.playerB.sprite.x,
                y: this.playerB.sprite.y,
                duration: 250,
                ease: 'Linear'
            });

            if (this.scene.cameras.main.zoom < this.zoomRange.deathZoom){
                this.scene.cameras.main.setZoom(this.scene.cameras.main.zoom + 0.01);
            }
        }
    }
}