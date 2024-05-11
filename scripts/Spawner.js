export default class Spawner {
    constructor(scene, waypoints, platform, playerA, playerB) {
        this.scene = scene;
        this.waypoints = waypoints;
        this.usedWaypoints = []; // Array to store used waypoints
        this.create();
        this.platform = platform;
        this.playerA = playerA;
        this.playerB = playerB;
    }

    create() {
        // Spawn a sprite for each waypoint
        //wait 2 seconds before spawning tools
        setTimeout(() => {
            this.waypoints.forEach(waypoint => {
            this.spawnSprite(waypoint);
            });
        }, 2000);
    }

    spawnSprite(waypoint) {
        // Get an array of image names from the loaded images
        const toolNames = ['Worn Hat', 'Dad Belt', 'Suspicious Mushroom', 'Dashy Feather', 'Wooden Buckler', 'Slimy Boot'];

        // Randomize the array of image names
        const randToolName = toolNames.sort(() => Math.random() - 0.5);

        // Get a random image name from the randomized array
        const randTool = randToolName[0];

        // Create a sprite at the given waypoint using the random image name
        this.sprite = this.scene.physics.add.sprite(waypoint.x, waypoint.y + 2, randTool);

        // Additional sprite setup can be done here if needed
        this.sprite.body.setCollideWorldBounds(true);
        this.scene.physics.add.collider(this.sprite, this.platform.platforms); // platform is the class, the layer for the platform is named platforms

        // Add the sprite to the usedWaypoints array
        this.usedWaypoints.push(waypoint);

        // Check for overlap with the player
        this.scene.physics.add.overlap(this.sprite, this.playerA.sprite, this.collectItemA, null, this);
        this.scene.physics.add.overlap(this.sprite, this.playerB.sprite, this.collectItemB, null, this);
    }

    collectItemA(sprite, player) {
        // esnsure a player can only have one powerup at a time
        if (this.playerA.tools == null) {

            sprite.destroy();
            // Get the powerup based on the item name
            const powerup = sprite.texture.key;
            // Apply the powerup to the player
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
    }
}
