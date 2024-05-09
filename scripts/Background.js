export default class Background {
    constructor(scene, player) {
      this.scene = scene;
      this.player = player;
      this.create();
    }
  
    preload() {
      // Load the background images
    }
  
    create() {
      const config = this.scene.sys.game.config;
      const scale = 1.1;
      const bgImages = [];
  
      // Create and position background images
      for (let i = 0; i < 12; i++) {
        const bgImg = this.scene.add.tileSprite(0, 0, config.width, config.height + 400, `bg${i + 1}`);
        bgImg.setPosition(config.width / 2, config.height / 2);
        bgImg.displayHeight = config.height;
        bgImg.scaleX = scale;
        bgImg.scaleY = scale;
        bgImg.setDepth(-5);
        bgImages.push(bgImg);
      }
  
      this.bgImages = bgImages; // Store the array in the scene
    }
  
    update() {
      const bgSpeeds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2]; // speeds of which background images move
        
      // Check if the player is moving left or right
        if (this.player.sprite.body.velocity.x < 0) {
            for (let i = 0; i < this.bgImages.length; i++) {
                const bgImg = this.bgImages[i];
                const speed = bgSpeeds[i];
                bgImg.tilePositionX -= speed;
                bgImg.x -= 0.5 // 0.5 is the constant speed of the background to catch up with the camera movement
            }
        } 
        else if (this.player.sprite.body.velocity.x > 0) {
            for (let i = 0; i < this.bgImages.length; i++) {
                const bgImg = this.bgImages[i];
                const speed = bgSpeeds[i];
                bgImg.tilePositionX += speed;
                bgImg.x += 0.5 // 0.5 is the constant speed of the background to catch up with the camera movement
            }
        }
    }
}
  
