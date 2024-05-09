export default class Camera {
    constructor(scene, player) {
      this.scene = scene;
      this.player = player;
      this.create();
    }
    
    
    create(){

    }


    update(){
        if (this.player.sprite.body.velocity.x > 0) {
            const cameraSpeed = 0.5; // Adjust the camera speed as needed, if change this, also change in background.js please. change bmgImg.x += 0.5 to the same value
            this.scene.cameras.main.scrollX += cameraSpeed;
        }
            if (this.player.sprite.body.velocity.x < 0) {
            const cameraSpeed = 0.5; // Adjust the camera speed as needed, same here
            this.scene.cameras.main.scrollX -= cameraSpeed;
        }
    }
}