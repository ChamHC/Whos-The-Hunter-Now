export default class Platform {
    constructor(scene, playerA, playerB) {
        this.scene = scene;
        this.playerA = playerA;
        this.playerB = playerB;
        this.create();
    }

    create(){
        this.map = this.scene.make.tilemap({ key: 'platform_map' });
        const tileset = this.map.addTilesetImage('HunterTileset', 'tiles');
        this.platforms = this.map.createLayer('Platform', tileset, 0, 0); // Assigning to instance property
    
        this.platforms.setCollisionByExclusion(-1, true);
        this.scene.physics.add.collider(this.playerA.sprite, this.platforms);
        this.scene.physics.add.collider(this.playerB.sprite, this.platforms);

        this.screenWidth = this.scene.sys.game.config.width;
    }

    update() {

    }
    
    getWaypoints(name){
        const waypoints = [];
    
        const waypointLayer = this.map.getObjectLayer(name);
    
        if (waypointLayer) {
            // Iterate over waypoints
            waypointLayer.objects.forEach(waypoint => {
                // Access custom properties of waypoint object
                const { x, y } = waypoint;
                waypoints.push({ x, y });
            });
        }
        return waypoints; 
    }  
}

