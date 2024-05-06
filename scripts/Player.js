export default class Player{
    constructor(scene, x, y, playerType){
        this.scene = scene; // Store the scene in the player class
        this.playerType = playerType;   // Store the player type
        this.x = x; // Store the x position of the player
        this.y = y; // Store the y position of the player
        this.create();  // Call the create method

        this.moveSpeed = 2; // Set the move speed of the player
        this.jumpHeight = 2;    // Set the jump height of the player
        this.slideFriction = 0.2;   // Set the slide friction of the player
        this.slideMultiplier = 2;   // Set the slide multiplier of the player
        this.slideThreshold = 500;    // Set the run to slide threshold of the player in ms

    }

    create(){
        // Create the keys for the player
        this.moveLeftKey = this.playerType == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.moveRightKey = this.playerType == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.jumpKey = this.playerType == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.crouchKey = this.playerType == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // Create the player sprite
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'playerIdle');    // Add the player sprite to the scene
        this.sprite.setScale(0.6);    // Scale the player sprite

        this.scene.physics.world.enable(this.sprite);  // Enable physics for the player sprite
        this.sprite.body.setCollideWorldBounds(true);   // Set the player sprite to collide with the world bounds

        // Create the animations for the player
        this.scene.anims.create({   // Create the idle animation
            key: 'idle',    
            frames: this.scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        this.scene.anims.create({   // Create the run animation
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('playerRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('playerJump', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        })
        this.scene.anims.create({
            key: 'fall',
            frames: this.scene.anims.generateFrameNumbers('playerFall', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: 0
        })
        this.scene.anims.create({
            key: 'crouch',
            frames: this.scene.anims.generateFrameNumbers('PlayerCrouch', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'stand',
            frames: this.scene.anims.generateFrameNumbers('PlayerStand', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: 0
        })
        this.scene.anims.create({
            key: 'slide',
            frames: this.scene.anims.generateFrameNumbers('PlayerSlide', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: -1
        })

        // Create the state machine for the player
        this.currentState = null;  // Set current state to null
        this.idleState = new IdleState(this);    // Create idle state
        this.runState = new RunState(this);  // Create run state
        this.jumpState = new JumpState(this);    // Create jump state
        this.fallState = new FallState(this);    // Create fall state
        this.crouchState = new CrouchState(this);    // Create crouch state
        this.enterSlideState = new EnterSlideState(this);    // Create stand state
        this.slideState = new SlideState(this);    // Create slide state
        this.changeState(this.runState);   // Set initial state to idle state
    }

    update(){
        if(this.currentState)  // If the current state is not null, update the current state
            this.currentState.stateUpdate();

        this.dynamicColliderSize();  // Change the collider size to fit the sprite [NOTE: REMOVE IF USING STANDARDIZED DIMENSIONS]
        this.displayColliderOrigin();    // Display the collider origin [NOTE: FOR DEBUGGING ONLY]
    }

    changeState(state){ // Change the state of the player
        //console.log("Changing state to " + state.constructor.name);
        this.currentState = state;  // Set the current state to the new state
        this.currentState.stateEnter(); // Enter the new state
    }

    dynamicColliderSize(){
        // Change collider size to fit the sprite
        this.sprite.setOrigin(0.5, 1);
        this.sprite.body.setSize(this.sprite.anims.width, this.sprite.anims.height);
    }

    displayColliderOrigin(){
        // Draw indicator for player collision box
        if (this.graphics)
            this.graphics.clear();
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0x00ff00, 1);
        this.graphics.strokeRect(this.sprite.body.x, this.sprite.body.y, this.sprite.body.width, this.sprite.body.height);

        // Draw a red dots on sprite origin
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillCircle(this.sprite.x, this.sprite.y, 3);
    }
}

class State{    // Create a state class to handle the player states
    constructor(player){
        this.player = player;
    }

    stateEnter(){

    }

    stateUpdate(){

    }

    checkCriteria(){
        
    }
}

class IdleState extends State{  // Create an idle state class that extends the state class
    stateEnter(){
        this.player.sprite.anims.play('idle', true);

        if (this.player.playerType == "PlayerA")
            this.player.sprite.flipX = false;
        else
            this.player.sprite.flipX = true;
    }

    stateUpdate(){
        this.player.sprite.setVelocityX(0);
        this.checkCriteria();    // Check the criteria for changing the state
    }

    checkCriteria(){
        if (this.player.moveLeftKey.isDown || this.player.moveRightKey.isDown) {
            this.player.changeState(this.player.runState);
        }
        if (this.player.jumpKey.isDown) {
            this.player.changeState(this.player.jumpState);
        }
        if (this.player.sprite.body.velocity.y > 0 && !this.player.sprite.body.onFloor()) {
            this.player.changeState(this.player.fallState);
        }
        if (this.player.crouchKey.isDown) {
            this.player.changeState(this.player.crouchState);
        }
    }
}

class RunState extends State{   // Create a run state class that extends the state class
    stateEnter(){
        this.player.sprite.anims.play('run', true);
        this.startTime = this.player.scene.time.now;
    }

    stateUpdate(){
        if (this.player.moveLeftKey.isDown) {
            this.player.sprite.setVelocityX(-this.player.moveSpeed * 100);
            this.player.sprite.flipX = true;
        }
        if (this.player.moveRightKey.isDown) {
            this.player.sprite.setVelocityX(this.player.moveSpeed * 100);
            this.player.sprite.flipX = false;
        }
        this.checkCriteria();
    }

    checkCriteria(){
        const elapsedTime = this.player.scene.time.now - this.startTime;
        if (!this.player.moveLeftKey.isDown && !this.player.moveRightKey.isDown) {
            this.player.changeState(this.player.idleState);
        }
        if (this.player.jumpKey.isDown) {
            this.player.changeState(this.player.jumpState);
        }
        if (this.player.sprite.body.velocity.y > 0 && !this.player.sprite.body.onFloor()) {
            this.player.changeState(this.player.fallState);
        }
        if (this.player.crouchKey.isDown && elapsedTime >= this.player.slideThreshold) {
            this.player.changeState(this.player.enterSlideState);
        }
    }
}

class JumpState extends State{  // Create a jump state class that extends the state class
    stateEnter(){
        this.player.sprite.anims.play('jump', true);
    }

    stateUpdate(){
        if (this.player.moveLeftKey.isDown) {
            this.player.sprite.setVelocityX(-this.player.moveSpeed * 100);
            this.player.sprite.flipX = true;
        }
        if (this.player.moveRightKey.isDown) {
            this.player.sprite.setVelocityX(this.player.moveSpeed * 100);
            this.player.sprite.flipX = false;
        }
        if (this.player.jumpKey.isDown && this.player.sprite.body.onFloor()) {
            this.player.sprite.setVelocityY(-this.player.jumpHeight * 100);
        }
        this.checkCriteria();
    }

    checkCriteria(){
        if (this.player.sprite.body.onFloor()) {
            this.player.changeState(this.player.idleState);
        }
        if (this.player.sprite.body.velocity.y > 0 && !this.player.sprite.body.onFloor()) {
            this.player.changeState(this.player.fallState);
        }
    }
}

class FallState extends State {
    stateEnter() {
        this.player.sprite.anims.play('fall', true);
    }

    stateUpdate() {
        if (this.player.moveLeftKey.isDown) {
            this.player.sprite.setVelocityX(-this.player.moveSpeed * 100);
            this.player.sprite.flipX = true;
        }
        if (this.player.moveRightKey.isDown) {
            this.player.sprite.setVelocityX(this.player.moveSpeed * 100);
            this.player.sprite.flipX = false;
        }
        this.checkCriteria();
    }

    checkCriteria() {
        if (this.player.crouchKey.isDown && this.player.sprite.body.onFloor()) {
            this.player.changeState(this.player.enterSlideState);
        }
        else if (this.player.sprite.body.onFloor()) {
            this.player.changeState(this.player.idleState);
        }
    }
}

class CrouchState extends State {
    stateEnter() {
        this.player.sprite.anims.play('crouch', true);
    }

    stateUpdate() {
        this.player.sprite.setVelocityX(0);
        this.checkCriteria();
    }

    checkCriteria() {
        if (!this.player.crouchKey.isDown) {
            this.player.changeState(this.player.idleState);
        }
    }
}

class EnterSlideState extends State {
    stateEnter() {
        this.player.sprite.anims.play('stand', true);
    }

    stateUpdate() {
        if (this.player.moveLeftKey.isDown) {
            this.player.sprite.setVelocityX(-this.player.moveSpeed * 100);
            this.player.sprite.flipX = true;
        }
        if (this.player.moveRightKey.isDown) {
            this.player.sprite.setVelocityX(this.player.moveSpeed * 100);
            this.player.sprite.flipX = false;
        }
        this.checkCriteria();
    }

    checkCriteria() {
        if (this.player.sprite.anims.currentFrame.isLast) {
            this.player.changeState(this.player.slideState);
        }
    }
}

class SlideState extends State {
    stateEnter() {
        this.player.sprite.anims.play('slide', true);
        this.defaultVelocity = this.player.sprite.body.velocity.x;
        this.player.sprite.setVelocityX(this.defaultVelocity * this.player.slideMultiplier);
    }

    stateUpdate() {
        if (this.player.moveLeftKey.isDown)
            this.player.sprite.body.velocity.x += this.player.slideFriction * 10;
        if (this.player.moveRightKey.isDown)
            this.player.sprite.body.velocity.x -= this.player.slideFriction * 10;

        //console.log(this.player.sprite.body.velocity.x);
        this.checkCriteria();
    }

    checkCriteria() {
        if ((this.player.sprite.body.velocity.x < 0 && this.player.moveRightKey.isDown) ||
            (this.player.sprite.body.velocity.x > 0 && this.player.moveLeftKey.isDown) ||
            (!this.player.moveRightKey.isDown && !this.player.moveLeftKey.isDown) ||
            !this.player.crouchKey.isDown){
            this.player.changeState(this.player.idleState);
        }
        if (this.player.jumpKey.isDown) {
            this.player.changeState(this.player.jumpState);
        }
    }
}
