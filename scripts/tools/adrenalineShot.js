class AdrenalineShot extends Phaser.Game {
    constructor(player) {
        this.player = player;
        this.speedMultiplier = 1.5;
        this.duration = 2;
    }
    constructor(player, speedMultiplier, duration) {
        this.player = player;
        this.speedMultiplier = speedMultiplier;
        this.duration = duration;
    }

    activate() {
        /* Write Tools Effect Here */
        defaultSpeed = this.player.speed;   // Store the player's default speed
        this.player.speed *= speedMultiplier;   // Activate the speed boost effect
        setTimeout(() => { this.player.speed = defaultSpeed; }, duration*1000); // Deactivate the speed boost effect when duration ends
    }
}
module.exports = AdrenalineShot;