import AdrenalineShot from "./tools/adrenalineShot";

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, playerName) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        /* Initialize Variables Here */
        this.moveSpeed = 10;    // Player's movement speed.
        this.jumpHeight = 20;   // Player's jump height.
        this.playerName = playerName;   // PlayerA or PlayerB
    }

    /* Update Game Logic Here */
    update() {
        this.move();
        this.jump();
        this.tools();
    }

    /* Custom Methods Here */
    move() {    // Move the player.

    }

    jump() {    // Make the player jump.

    }

    tools() {   // Use tools.

    }
}

export default Player;