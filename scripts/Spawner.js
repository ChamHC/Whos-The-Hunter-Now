import { getRounds } from './GameStats.js';

export default class Spawner {
    constructor(scene, waypoints, platform, playerA, playerB) {
        this.scene = scene;
        this.waypoints = waypoints;
        this.usedWaypoints = []; // Array to store used waypoints
        this.spawnedSprites = []; // Array to store spawned sprites
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
        }, 500);

        this.previousGameRounds = getRounds();
    }

    spawnSprite(waypoint) {
        // Randomly choose a sprite from availableSprites
        const randIndex = Math.floor(Math.random() * this.availableSprites.length);
        const randSprite = this.availableSprites[randIndex];

        // Create sprite at waypoint
        const sprite = this.scene.physics.add.sprite(waypoint.x, waypoint.y + 2, randSprite);
        sprite.body.setCollideWorldBounds(true);
        this.scene.physics.add.collider(sprite, this.platform.platforms);
        this.spawnedSprites.push(sprite);
        this.usedWaypoints.push(waypoint);

        // Overlap check with players
        this.scene.physics.add.overlap(sprite, this.playerA.sprite, this.collectItemA, null, this);
        this.scene.physics.add.overlap(sprite, this.playerB.sprite, this.collectItemB, null, this);
    }

    collectItemA(sprite, player) {
        if (this.playerA.tools == null) {
            const powerup = sprite.texture.key;
            sprite.destroy();
            this.removeSprite(sprite);
            this.playerA.tools = powerup;
            console.log("Player A picked up " + this.playerA.tools);

            // Emit event to UIScene to show the tool
            this.scene.game.events.emit('showPlayer1Tool', powerup);
        }
    }

    collectItemB(sprite, player) {
        if (this.playerB.tools == null) {
            const powerup = sprite.texture.key;
            sprite.destroy();
            this.removeSprite(sprite);
            this.playerB.tools = powerup;
            console.log("Player B picked up " + this.playerB.tools);

            // Emit event to UIScene to show the tool
            this.scene.game.events.emit('showPlayer2Tool', powerup);
        }
    }

    removeSprite(sprite) {
        const index = this.spawnedSprites.indexOf(sprite);
        if (index > -1) {
            this.spawnedSprites.splice(index, 1);
        }
    }

    update() {
        // Check if gameRounds has increased
        if (getRounds() > this.previousGameRounds) {
            // Destroy all sprites and spawn new ones
            this.destroyAllSprites();
            this.create();
            this.previousGameRounds = getRounds();
            //console.log("Game round increased to " + getRounds());
        }
    }

    destroyAllSprites() {
        // Destroy all spawned sprites
        this.spawnedSprites.forEach(sprite => {
            sprite.destroy();
        });
        this.spawnedSprites = [];
        this.usedWaypoints = [];
    }
}
