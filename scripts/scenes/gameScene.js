import Player from "../Player.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(){
    this.load.image("bg", "resources/controls/JumboLightMaster.png"); // Load the background image

    this.load.spritesheet('playerIdle', 'resources/player/idle/adventurer-idle-spritesheetpng.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('playerRun', 'resources/player/run/adventurer-run-spritesheet.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('playerJump', 'resources/player/jump/adventurer-jump-spritesheet.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('playerFall', 'resources/player/fall/adventurer-fall-spritesheet.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('PlayerCrouch', 'resources/player/crouch/adventurer-crouch-spritesheet.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('PlayerStand', 'resources/player/stand/adventurer-stand-spritesheet.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('PlayerSlide', 'resources/player/slide/adventurer-slide-spritesheet.png', { frameWidth: 50, frameHeight: 37 })

  }

  create(){
    /*
    const config = this.sys.game.config;  // Get the game config from Game.js
    const bgImg = this.add.image(0, 0, "bg"); // Add the background image to the scene
    bgImg.setPosition(config.width / 2, config.height / 2); // Center the background image
    bgImg.displayHeight = config.height;  // Set the height of the image to the height of the game
    bgImg.scaleX = bgImg.scaleY;  // Scale the width of the image to the height of the image
    */
    this.player = new Player(this, 100, 450, "PlayerA");
  }

  update(){
    this.player.update();
  }
}
export default GameScene;