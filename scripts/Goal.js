export default class Goal {
    constructor(scene, playerA, playerB) {
      this.scene = scene;
      this.playerA = playerA;
      this.playerB = playerB;

      this.create();
    }

    create(){
        this.portalA = this.scene.add.sprite(200, 510, 'portal');
        this.portalA.anims.play('portal');
        this.portalA.setScale(2);

        this.portalB = this.scene.add.sprite(1200, 500, 'portal');
        this.portalB.anims.play('portal');
        this.portalB.setScale(2);

        // Add overlap checks for playerA with portalB and playerB with portalA
    }

    update(){
        this.scene.physics.add.overlap(this.playerA.sprite, this.portalB, this.playerAhunter);
        this.scene.physics.add.overlap(this.playerB.sprite, this.portalA, this.playerBhunter);
    }

    playerAhunter(playerASprite, portalB){
 
        if (this.playerA.sprite === playerASprite) {
            // Change player A to hunter
            console.log("Player A is now the hunter");
            this.playerA.playerRole = "Hunter";
 
            this.playerA.sprite.anims.play('hunterIdle', true);
            // Change player B to hunted
            this.playerB.playerRole = "Hunted";
        }
    }

    playerBhunter(playerBSprite, portalA){

        if (this.playerB.sprite === playerBSprite) {
            // Change player B to hunter
            console.log("Player B is now the hunter");
            this.playerB.playerRole = "Hunter";

            this.playerB.sprite.anims.play('hunterIdle', true);
            // Change player A to hunted
            this.playerA.playerRole = "Hunted";
        }
    }
}
