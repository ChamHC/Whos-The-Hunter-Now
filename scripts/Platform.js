export default class Platform {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.create();
    }

    create(){
        const map = this.scene.make.tilemap({ key: 'platform_map' });
        const tileset = map.addTilesetImage('HuterTileset', 'tiles');
        this.platforms = map.createLayer('Platform', tileset, 0, 0); // Assigning to instance property
        console.log("fucker " + this.platforms.x);
    
        this.platforms.setCollisionByExclusion(-1, true);
        this.scene.physics.add.collider(this.player.sprite, this.platforms);

        this.screenWidth = this.scene.sys.game.config.width;
    }

    update() {
        if (this.player.sprite.body.velocity.x > 0 && this.platforms.x > this.screenWidth - this.platforms.width) {
            // Adjust the position of the platform layer to the left
            const movementSpeed = 2; // Adjust the speed as needed
            this.platforms.x -= movementSpeed;
        }
        else if (this.player.sprite.body.velocity.x < 0 && this.platforms.x < 0) {
            // Adjust the position of the platform layer to the right
            const movementSpeed = 2; // Adjust the speed as needed
            this.platforms.x += movementSpeed;
        }
        else{
            
        }
    }
    
}

