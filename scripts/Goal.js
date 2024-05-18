import {setWinner, setDuration, setRounds, setHasEnded, getRounds} from './GameStats.js';

export default class Goal {
    constructor(scene, playerA, playerB, platform) {
      this.scene = scene;
      this.playerA = playerA;
      this.playerB = playerB;
      this.platforms = platform;

      this.duration = 0;
      this.roleSwitchCounter = 0;
      this.create();
    }

    create(){

        this.spawnPointA = this.platforms.getWaypoints('Portal Spawn A');
        this.spawnPointB = this.platforms.getWaypoints('Portal Spawn B');


        // Randomly select a spawn point from spawnPointA array
        const randomIndexA = Phaser.Math.Between(0, this.spawnPointA.length - 1);
        const spawnPointA = this.spawnPointA[randomIndexA];

        // Spawn portalA at the selected spawn point
        this.portalA = this.scene.physics.add.sprite(spawnPointA.x, spawnPointA.y, 'portal');
        this.portalA.anims.play('portal');
        this.portalA.setScale(2);
        this.portalA.setCollideWorldBounds(true);

        // Randomly select a spawn point from spawnPointB array
        const randomIndexB = Phaser.Math.Between(0, this.spawnPointB.length - 1);
        const spawnPointB = this.spawnPointB[randomIndexB];

        // Spawn portalB at the selected spawn point
        this.portalB = this.scene.physics.add.sprite(spawnPointB.x, spawnPointB.y, 'portal');
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
        this.scene.physics.add.overlap(this.playerA.sprite, this.playerB.sprite, ()=> this.endGame(false), null, this);

        this.duration = new Date();
    }

    update(){
        if (Phaser.Math.Distance.Between(this.playerA.sprite.x, this.playerA.sprite.y, this.playerB.sprite.x, this.playerB.sprite.y) > 1450){
            this.endGame(true);
        }
    }

    playerAhunter(playerASprite, portalB){
        if(this.playerA.playerRole == "Hunted"){
            //console.log("Player A is now the hunter");
            this.playerA.playerRole = "Hunter";
            this.playerA.sprite.anims.play(`${this.playerA.sprite.anims.currentAnim.key.replace('hunted', 'hunter')}`, true);
            this.playerB.playerRole = "Hunted";
            this.playerB.sprite.anims.play(`${this.playerB.sprite.anims.currentAnim.key.replace('hunter', 'hunted')}`, true);

            this.roleSwitchCounter++;
            setRounds(Math.floor(this.roleSwitchCounter / 2));
            console.log("Role switch counter: " + getRounds());
        }
    }

    playerBhunter(playerBSprite, portalA){
        if(this.playerB.playerRole == "Hunted"){
            //console.log("Player B is now the hunter");
            this.playerB.playerRole = "Hunter";
            this.playerB.sprite.anims.play(`${this.playerB.sprite.anims.currentAnim.key.replace('hunted', 'hunter')}`, true);
            this.playerA.playerRole = "Hunted";
            this.playerA.sprite.anims.play(`${this.playerA.sprite.anims.currentAnim.key.replace('hunter', 'hunted')}`, true);

            this.roleSwitchCounter++;
            setRounds(Math.floor(this.roleSwitchCounter / 2));
            //console.log("Role switch counter: " + getRounds()) ;
        }
    }

    endGame(outOfRange = false){ 
        if ((this.playerA.playerRole == "Hunted" && this.playerA.activeTools.some(tool => tool.constructor.name === "WoodenBuckler")) ||
            (this.playerB.playerRole == "Hunted" && this.playerB.activeTools.some(tool => tool.constructor.name === "WoodenBuckler"))) {
            return;
        }
        
        this.elapsed = (new Date() - this.duration) / 1000;

        this.rounds = Math.floor(this.roleSwitchCounter / 2);

        if(outOfRange ? this.playerA.playerRole == "Hunted" : this.playerA.playerRole == "Hunter"){
            // Player A wins
            setWinner("PlayerA");
        }
        else{
            setWinner("PlayerB");
        }
        setDuration(this.elapsed.toFixed(1));
        setRounds(this.rounds);
        setHasEnded(true);
    }
}
