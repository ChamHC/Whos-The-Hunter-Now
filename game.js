/* Import Libraries Here */
import Phaser from 'phaser';
import Player from './scripts/player.js';

// Create a Game Instance
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

/* Load Game Assets Here */
function preload() {
    // this.load.image('player', 'resources/player.png');   // Load player image to the key 'player'.
}

/* Set Up Scene Here */
function create() {
    // this.player = new Player(this, xPosition, yPosition, 'player');  // Create a new player with the key 'player' as texture.
}

/* Update Game Logic Here */
function update() {
    
}