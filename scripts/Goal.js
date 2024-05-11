export default class Goal {
    constructor(scene, playerA, playerB, platform) {
      this.scene = scene;
      this.playerA = playerA;
      this.playerB = playerB;
      this.platforms = platform;
      this.create();
    }

    create(){

        this.portalA = this.scene.physics.add.sprite(200, 500, 'portal');
        this.portalA.anims.play('portal');
        this.portalA.setScale(2);
        this.portalA.setCollideWorldBounds(true);
        
        this.portalB = this.scene.physics.add.sprite(1200, 500, 'portal');
        this.portalB.anims.play('portal');
        this.portalB.setScale(2);
        this.portalB.setCollideWorldBounds(true);
        
        //overlap code for playerA and portalB
        this.scene.physics.add.overlap(this.playerA.sprite, this.portalA, this.playerAhunter, null, this);
        this.scene.physics.add.collider(this.portalB, this.platforms.platforms);

        //overlap code for playerB and portalA
        this.scene.physics.add.overlap(this.playerB.sprite, this.portalB, this.playerBhunter, null, this);
        this.scene.physics.add.collider(this.portalA, this.platforms.platforms);
        
        //end scene if playerA and playerB overlap each other
        this.scene.physics.add.overlap(this.playerA.sprite, this.playerB.sprite, this.endScene, null, this);
    }

    update(){

    }

    playerAhunter(playerASprite, portalB){
        if(this.playerA.playerRole == "Hunted"){
            console.log("Player A is now the hunter");
            // Change player A to hunter
            this.playerA.playerRole = "Hunter";

            // Change player A animation to hunter
            this.playerA.sprite.anims.play(`${this.playerA.sprite.anims.currentAnim.key.replace('hunted', 'hunter')}`, true);
            // Change player B to hunted
            this.playerB.playerRole = "Hunted";

            // Change player B animation to hunted
            this.playerB.sprite.anims.play(`${this.playerB.sprite.anims.currentAnim.key.replace('hunter', 'hunted')}`, true);
        }
    }

    playerBhunter(playerBSprite, portalA){
        if(this.playerB.playerRole == "Hunted"){
            console.log("Player B is now the hunter");
            // Change player B to hunter
            this.playerB.playerRole = "Hunter";

            // Change player B animation to hunter
            this.playerB.sprite.anims.play(`${this.playerB.sprite.anims.currentAnim.key.replace('hunted', 'hunter')}`, true);
            // Change player A to hunted
            this.playerA.playerRole = "Hunted";

            // Change player A animation to hunted
            this.playerA.sprite.anims.play(`${this.playerA.sprite.anims.currentAnim.key.replace('hunter', 'hunted')}`, true);
        }
    }


    endScene(){ // bring to endScene

        //if the player is the hunter, then that player wins
        if(this.playerA.playerRole == "Hunter"){
            console.log("Player A wins");
        }
        else{
            console.log("Player B wins");
        }
        //this.scene.scene.start('EndScene');
    }
}
