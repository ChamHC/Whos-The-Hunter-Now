export default class Camera {
    constructor(scene, playerA, playerB, background) {
        this.scene = scene;
        this.playerA = playerA;
        this.playerB = playerB;
        this.background = background;
        this.create();
    }
    
    
    create(){
        this.config = this.scene.sys.game.config;
        const leftX = this.background.bgImages[0].x - this.background.bgImages[0].width / 2;
        const rightX = this.background.bgImages[0].width;
        this.scene.cameras.main.startFollow(this.playerA.sprite, true, 0.08, 0.08);

        this.scene.cameras.main.setBounds(leftX, 0, rightX, this.config.height);
    }

    update(){
        if (this.playerA.playerRole == "Hunted" && this.scene.cameras.main._follow === this.playerB.sprite) {
            this.scene.cameras.main.startFollow(this.playerA.sprite, true, 0.08, 0.08);
        }
        else if (this.playerB.playerRole == "Hunted" && this.scene.cameras.main._follow === this.playerA.sprite){
            this.scene.cameras.main.startFollow(this.playerB.sprite, true, 0.08, 0.08);
        }
    }
}