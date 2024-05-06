import Player from "../Player.js";
import Background from "../Background.js";
import Platform from "../Platform.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(){
    // Load the background images
    for (let i = 1; i <= 12; i++) {
        this.load.image(`bg${i}`, `resources/background/layer${12 - i}.png`);
    }

    // Load the platform map
    this.load.image('tiles', 'resources/tileset/oak_woods_tileset.png');
    this.load.tilemapTiledJSON('platform_map', 'resources/tileset/HunterPlatformer.json');


    // Load the player spritesheets based on their own dimensions
    this.load.spritesheet('playerIdle', 'resources/player/idle/adventurer-idle-spritesheet-21x30.png', { frameWidth: 63, frameHeight: 90 });
    this.load.spritesheet('playerRun', 'resources/player/run/adventurer-run-spritesheet-24x29.png', { frameWidth: 72, frameHeight: 87 });
    this.load.spritesheet('playerJump', 'resources/player/jump/adventurer-jump-spritesheet-22x27.png', { frameWidth: 66, frameHeight: 81 });
    this.load.spritesheet('playerFall', 'resources/player/fall/adventurer-fall-spritesheet-17x31.png', { frameWidth: 51, frameHeight: 93 });
    this.load.spritesheet('PlayerCrouch', 'resources/player/crouch/adventurer-crouch-spritesheet-20x22.png', { frameWidth: 60, frameHeight: 66 });
    this.load.spritesheet('PlayerStand', 'resources/player/stand/adventurer-stand-spritesheet-30x17.png', { frameWidth: 90, frameHeight: 51 });
    this.load.spritesheet('PlayerSlide', 'resources/player/slide/adventurer-slide-spritesheet-34x15.png', { frameWidth: 102, frameHeight: 45 });
    
    // Load the player spritesheets with standardized dimensions
    /*
    this.load.spritesheet('playerIdle', 'resources/player/idle/adventurer-idle-spritesheetpng.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('playerRun', 'resources/player/run/adventurer-run-spritesheet.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('playerJump', 'resources/player/jump/adventurer-jump-spritesheet.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('playerFall', 'resources/player/fall/adventurer-fall-spritesheet.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('PlayerCrouch', 'resources/player/crouch/adventurer-crouch-spritesheet.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('PlayerStand', 'resources/player/stand/adventurer-stand-spritesheet.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('PlayerSlide', 'resources/player/slide/adventurer-slide-spritesheet.png', { frameWidth: 50, frameHeight: 37 });
    */
  }

  create(){
    const config = this.sys.game.config; 
    
    this.playerA = new Player(this, 200, 450, "PlayerA");
    this.background = new Background(this, this.playerA); // creates background and updates movement based on player parsed
    this.platform = new Platform(this, this.playerA); // creates platform and sets collision with player parsed
    
    const cameraX = this.cameras.main.scrollX;
    const cameraY = this.cameras.main.scrollY;

    console.log("Camera position:", cameraX, cameraY);
    this.initialCameraX = this.cameras.main.scrollX;

    console.log(this.background.bgImages[0].x, this.background.bgImages[0].y);

    //this.cameras.main.startFollow(this.background);
    //athis.cameras.main.startFollow(this.playerA, true, 0.08, 0.08);
    //this.playerB = new Player(this, 1300, 450, "PlayerB");

      
    this.cameras.main.fadeIn(1000, 0, 0, 0);  //Tween entire screen tint black to white
  }

  update() {

    this.background.update();
    // Update the player
    this.playerA.update();
    this.platform.update();
    //this.playerB.update();
    
  }

}
export default GameScene;