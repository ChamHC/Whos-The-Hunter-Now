import Player from "../Player.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(){
    this.load.image("bg", "resources/controls/JumboLightMaster.png"); // Load the background image

    // Load the player spritesheets based on their own dimensions
    this.load.spritesheet('playerIdle', 'resources/player/idle/adventurer-idle-spritesheet-21x30.png', { frameWidth: 21, frameHeight: 30 });
    this.load.spritesheet('playerRun', 'resources/player/run/adventurer-run-spritesheet-24x29.png', { frameWidth: 24, frameHeight: 29 });
    this.load.spritesheet('playerJump', 'resources/player/jump/adventurer-jump-spritesheet-22x27.png', { frameWidth: 22, frameHeight: 27 });
    this.load.spritesheet('playerFall', 'resources/player/fall/adventurer-fall-spritesheet-17x31.png', { frameWidth: 17, frameHeight: 31 });
    this.load.spritesheet('PlayerCrouch', 'resources/player/crouch/adventurer-crouch-spritesheet-20x22.png', { frameWidth: 20, frameHeight: 22 });
    this.load.spritesheet('PlayerStand', 'resources/player/stand/adventurer-stand-spritesheet-30x17.png', { frameWidth: 30, frameHeight: 17 });
    this.load.spritesheet('PlayerSlide', 'resources/player/slide/adventurer-slide-spritesheet-34x15.png', { frameWidth: 34, frameHeight: 15 });
    
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
    
    const config = this.sys.game.config;  // Get the game config from Game.js
    const bgImg = this.add.image(0, 0, "bg"); // Add the background image to the scene
    bgImg.setPosition(config.width / 2, config.height / 2); // Center the background image
    bgImg.displayHeight = config.height;  // Set the height of the image to the height of the game
    bgImg.scaleX = bgImg.scaleY;  // Scale the width of the image to the height of the image
    
    this.playerA = new Player(this, 100, 450, "PlayerA");
    this.playerB = new Player(this, 1300, 450, "PlayerB");
  }

  update(){
    this.playerA.update();
    this.playerB.update();
  }
}
export default GameScene;