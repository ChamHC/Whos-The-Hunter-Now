export default class Spawner {
    constructor(scene, waypoints, platform) {
        this.scene = scene;
        this.waypoints = waypoints;
        this.usedWaypoints = []; // Array to store used waypoints
        this.create();
        this.spawnTimer = null; // Timer for spawning sprites
        this.platform = platform;
    }

    create() {
        // Start the spawn timer to spawn a sprite every 10 seconds
        this.spawnTimer = this.scene.time.addEvent({
            delay: 10000, // 10 seconds 
            callback: this.spawnSprite,
            callbackScope: this,
            loop: true // Repeat the timer infinitely
        });
    }

    spawnSprite() {
        // Filter out waypoints that have not been used
        const availableWaypoints = this.waypoints.filter(waypoint => !this.usedWaypoints.includes(waypoint));

        if (availableWaypoints.length > 0) {
            // Choose a random waypoint index from available waypoints
            const randomIndex = Phaser.Math.Between(0, availableWaypoints.length - 1);
            const randomWaypoint = availableWaypoints[randomIndex];

            // Add the chosen waypoint to the usedWaypoints array
            this.usedWaypoints.push(randomWaypoint);

            // Create a sprite at the chosen waypoint
            this.sprite = this.scene.physics.add.sprite(randomWaypoint.x, randomWaypoint.y + 2, 'Worn Hat');

            // Additional sprite setup can be done here if needed
            this.sprite.body.setCollideWorldBounds(true);   
            this.scene.physics.add.collider(this.sprite, this.platform.platforms); // platform is the class, the layer for the platform is named platforms
        }
    }

    update() {
    }
}