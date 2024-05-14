import { gameRounds } from './GameStats.js';

export default class Spawner {
    constructor(scene, waypoints, platform, playerA, playerB) {
        this.scene = scene;
        this.waypoints = waypoints;
        this.usedWaypoints = []; // Array to store used waypoints
        this.availableSprites = ['Worn Hat', 'Dad Belt', 'Suspicious Mushroom', 'Dashy Feather', 'Wooden Buckler', 'Slimy Boot'];
        this.platform = platform;
        this.playerA = playerA;
        this.playerB = playerB;
        this.create();
    }

    create() {
        // Spawn sprites after a delay
        setTimeout(() => {
            this.waypoints.forEach(waypoint => {
                this.spawnSprite(waypoint);
            });
        }, 2000);
    }

    spawnSprite(waypoint) {
        // Randomly choose a sprite from availableSprites
        const randIndex = Math.floor(Math.random() * this.availableSprites.length);
        const randSprite = this.availableSprites[randIndex];

        // Create sprite at waypoint
        this.sprite = this.scene.physics.add.sprite(waypoint.x, waypoint.y + 2, randSprite);
        this.sprite.body.setCollideWorldBounds(true);
        this.scene.physics.add.collider(this.sprite, this.platform.platforms);
        this.usedWaypoints.push(waypoint);

        // Overlap check with players
        this.scene.physics.add.overlap(this.sprite, this.playerA.sprite, this.collectItemA, null, this);
        this.scene.physics.add.overlap(this.sprite, this.playerB.sprite, this.collectItemB, null, this);
    }

    collectItemA(sprite, player) {
        if (this.playerA.tools == null) {
            sprite.destroy();
            const powerup = sprite.texture.key;
            this.playerA.tools = powerup;
            console.log("Player A picked up " + this.playerA.tools);
        }
    }

    collectItemB(sprite, player) {
        if (this.playerB.tools == null) {
            sprite.destroy();
            const powerup = sprite.texture.key;
            this.playerB.tools = powerup;
            console.log("Player B picked up " + this.playerB.tools);
        }
    }

    update() {
        // Check if gameRounds has increased
        if (gameRounds > this.previousGameRounds) {
            // Destroy all sprites and spawn new ones
            this.destroyAllSprites();
            this.create();
            this.previousGameRounds = gameRounds;
            console.log("Game round increased to " + gameRounds);
        }
    }

    destroyAllSprites() {
        // Destroy all sprites
        this.scene.physics.world.enable(this.usedWaypoints);
        this.usedWaypoints.forEach(waypoint => {
            waypoint.destroy();
        });
        this.usedWaypoints = [];
    }
}
