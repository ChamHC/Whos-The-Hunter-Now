class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
  
    preload(){
      this.load.image("bg", "resources/controls/JumboLightMaster.png"); // Load the background image
    }
  
    create(){
      const bgImg = this.add.image(0, 0, "bg"); // Add the background image to the scene
      bgImg.setPosition(config.width / 2, config.height / 2); // Center the background image
      bgImg.displayHeight = config.height;  // Set the height of the image to the height of the game
      bgImg.scaleX = bgImg.scaleY;  // Scale the width of the image to the height of the image
    }
  
    update(){
  
    }
  }