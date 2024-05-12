import { Tools, DadBelt, DashyFeather, SlimyBoot, SuspiciousMushroom, WoodenBuckler, WornHat } from './Tools.js';
import { hasEnded, winner } from './GameStats.js';

export default class Player{
    constructor(scene, x, y, playerName, playerRole){
        this.scene = scene; // Store the scene in the player class
        this.playerName = playerName;   // Store the player name
        this.playerRole = playerRole;    // Set the player role
        this.x = x; // Store the x position of the player
        this.y = y; // Store the y position of the player
        this.create();  // Call the create method

        this.moveSpeed = 2; // Set the move speed of the player
        this.jumpHeight = 2.5;    // Set the jump height of the player
        this.slideFriction = 0.2;   // Set the slide friction of the player
        this.slideMultiplier = 2;   // Set the slide multiplier of the player
        this.slideThreshold = 500;    // Set the run to slide threshold of the player in ms
    }

    create(){
        // Create the keys for the player
        this.moveLeftKey = this.playerName == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.moveRightKey = this.playerName == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.jumpKey = this.playerName == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.crouchKey = this.playerName == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.castKey = this.playerName == "PlayerA" ? this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE) : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Create the player sprite
        if (this.playerRole == "Hunter")
            this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'HunterIdle');    // Add the player sprite to the scene
        else
            this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'HuntedIdle');    // Add the player sprite to the scene
        
        this.sprite.setScale(0.6);    // Scale the player sprite
        // Add Arrow Image above Player Sprite
        this.arrow = this.scene.add.image(this.x, this.y, 'Arrow').setOrigin(0.5);
        this.arrow.setRotation(90 * (Math.PI / 180));
        this.arrow.setScale(0.2);
        // Add Player Name Text above Player Sprite
        this.playerNameParse = this.playerName.replace(/([a-z])([A-Z])/g, '$1 $2');
        this.text = this.scene.add.text(this.x, this.y, this.playerNameParse, {
            fontSize: 24,
            fontFamily: "ThaleahFat",
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
        // Tween the scale of arrow and text
        this.scene.tweens.add({
            targets: this.text,
            scale: 0.9,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.scene.physics.world.enable(this.sprite);  // Enable physics for the player sprite

        // Create the animations for the Hunter
        // Check if animation is created
        if (!this.scene.anims.exists('hunterIdle'))
            this.scene.anims.create({   // Create the idle animation
                key: 'hunterIdle',    
                frames: this.scene.anims.generateFrameNumbers('HunterIdle', { start: 0, end: 3 }),
                frameRate: 7,
                repeat: -1
            });
        if (!this.scene.anims.exists('hunterRun'))
            this.scene.anims.create({   // Create the run animation
                key: 'hunterRun',
                frames: this.scene.anims.generateFrameNumbers('HunterRun', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
        if (!this.scene.anims.exists('hunterJump'))
            this.scene.anims.create({
                key: 'hunterJump',
                frames: this.scene.anims.generateFrameNumbers('HunterJump', { start: 0, end: 3 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('hunterFall'))
            this.scene.anims.create({
                key: 'hunterFall',
                frames: this.scene.anims.generateFrameNumbers('HunterFall', { start: 0, end: 1 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('hunterCrouch'))
            this.scene.anims.create({
                key: 'hunterCrouch',
                frames: this.scene.anims.generateFrameNumbers('HunterCrouch', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });
        if (!this.scene.anims.exists('hunterStand'))
            this.scene.anims.create({
                key: 'hunterStand',
                frames: this.scene.anims.generateFrameNumbers('HunterStand', { start: 0, end: 2 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('hunterSlide'))
            this.scene.anims.create({
                key: 'hunterSlide',
                frames: this.scene.anims.generateFrameNumbers('HunterSlide', { start: 0, end: 1 }),
                frameRate: 15,
                repeat: -1
            });
        if (!this.scene.anims.exists('hunterCast'))
            this.scene.anims.create({
                key: 'hunterCast',
                frames: this.scene.anims.generateFrameNumbers('HunterCast', { start: 0, end: 3 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('hunterUse'))
            this.scene.anims.create({
                key: 'hunterUse',
                frames: this.scene.anims.generateFrameNumbers('HunterUse', { start: 0, end: 2 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('hunterDeath'))
            this.scene.anims.create({
                key: 'hunterDeath',
                frames: this.scene.anims.generateFrameNumbers('HunterDeath', { start: 0, end: 6 }),
                frameRate: 15,
                repeat: 0
            });

        // Create the animations for the Hunted
        if (!this.scene.anims.exists('huntedIdle'))
            this.scene.anims.create({
                key: 'huntedIdle',
                frames: this.scene.anims.generateFrameNumbers('HuntedIdle', { start: 0, end: 3 }),
                frameRate: 7,
                repeat: -1
            });
        if (!this.scene.anims.exists('huntedRun'))
            this.scene.anims.create({
                key: 'huntedRun',
                frames: this.scene.anims.generateFrameNumbers('HuntedRun', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
        if (!this.scene.anims.exists('huntedJump'))
            this.scene.anims.create({
                key: 'huntedJump',
                frames: this.scene.anims.generateFrameNumbers('HuntedJump', { start: 0, end: 3 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('huntedFall'))
            this.scene.anims.create({
                key: 'huntedFall',
                frames: this.scene.anims.generateFrameNumbers('HuntedFall', { start: 0, end: 1 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('huntedCrouch'))
            this.scene.anims.create({
                key: 'huntedCrouch',
                frames: this.scene.anims.generateFrameNumbers('HuntedCrouch', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });
        if (!this.scene.anims.exists('huntedStand'))
            this.scene.anims.create({
                key: 'huntedStand',
                frames: this.scene.anims.generateFrameNumbers('HuntedStand', { start: 0, end: 2 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('huntedSlide'))
            this.scene.anims.create({
                key: 'huntedSlide',
                frames: this.scene.anims.generateFrameNumbers('HuntedSlide', { start: 0, end: 1 }),
                frameRate: 15,
                repeat: -1
            });
        if (!this.scene.anims.exists('huntedCast'))
            this.scene.anims.create({
                key: 'huntedCast',
                frames: this.scene.anims.generateFrameNumbers('HuntedCast', { start: 0, end: 3 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('huntedUse'))
            this.scene.anims.create({
                key: 'huntedUse',
                frames: this.scene.anims.generateFrameNumbers('HuntedUse', { start: 0, end: 2 }),
                frameRate: 15,
                repeat: 0
            });
        if (!this.scene.anims.exists('huntedDeath'))
            this.scene.anims.create({
                key: 'huntedDeath',
                frames: this.scene.anims.generateFrameNumbers('HuntedDeath', { start: 0, end: 6 }),
                frameRate: 15,
                repeat: 0
            });

        // Create the state machine for the player
        this.currentState = null;  // Set current state to null
        this.idleState = new IdleState(this);    // Create idle state
        this.runState = new RunState(this);  // Create run state
        this.jumpState = new JumpState(this);    // Create jump state
        this.fallState = new FallState(this);    // Create fall state
        this.crouchState = new CrouchState(this);    // Create crouch state
        this.enterSlideState = new EnterSlideState(this);    // Create stand state
        this.slideState = new SlideState(this);    // Create slide state
        this.castState = new CastState(this);    // Create cast state   
        this.deadState = new DeadState(this);    // Create dead state
        this.changeState(this.idleState);   // Set initial state to idle state
        this.tools = null;
        this.activeTools = [];

        this.sprite.setOrigin(0.5, 1);
    }

    update(){
        if(this.currentState)  // If the current state is not null, update the current state
            this.currentState.stateUpdate();

        this.arrow.x = this.sprite.x;
        this.arrow.y = this.sprite.y - this.sprite.body.height - 10;
        this.text.x = this.sprite.x;
        this.text.y = this.sprite.y - this.sprite.body.height - 30;

        this.displayColliderOrigin();    // Display the collider origin [NOTE: FOR DEBUGGING ONLY]
        
        if (this.activeTools) {
            this.activeTools.forEach(tool => {
                tool.update();
                if (tool.isCompleted)
                    this.activeTools.splice(this.activeTools.indexOf(tool), 1);
            });
        }
    }

    changeState(state){ // Change the state of the player
        //console.log("Changing state to " + state.constructor.name);
        this.currentState = state;  // Set the current state to the new state
        this.currentState.stateEnter(); // Enter the new state
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
        if (this.player.playerRole == "Hunter")
            this.player.sprite.anims.play('hunterIdle', true);
        else
            this.player.sprite.anims.play('huntedIdle', true);

        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);
    }

    stateUpdate(){
        this.player.sprite.setVelocityX(0);
        this.checkCriteria();    // Check the criteria for changing the state
    }

    checkCriteria(){
        if (hasEnded && winner != this.player.playerName) {
            this.player.changeState(this.player.deadState);
        }
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
            console.log("Crouching");
            this.player.changeState(this.player.crouchState);
        }
        if (this.player.castKey.isDown && this.player.tools != null) {
            this.player.changeState(this.player.castState);
        }
    }
}

class RunState extends State{   // Create a run state class that extends the state class
    stateEnter(){
        if (this.player.playerRole == "Hunter")
            this.player.sprite.anims.play('hunterRun', true);
        else
            this.player.sprite.anims.play('huntedRun', true);

        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);

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
        if (hasEnded && winner != this.player.playerName) {
            this.player.changeState(this.player.deadState);
        }
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
        if (this.player.castKey.isDown && this.player.tools != null) {
            this.player.changeState(this.player.castState);
        }
    }
}

class JumpState extends State{  // Create a jump state class that extends the state class
    stateEnter(){
        if (this.player.playerRole == "Hunter")
            this.player.sprite.anims.play('hunterJump', true);
        else
            this.player.sprite.anims.play('huntedJump', true);

        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);
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
        if (this.player.castKey.isDown && this.player.tools != null) {
            this.player.changeState(this.player.castState);
        }
    }
}

class FallState extends State {
    stateEnter() {
        if (this.player.playerRole == "Hunter")
            this.player.sprite.anims.play('hunterFall', true);
        else
            this.player.sprite.anims.play('huntedFall', true);

        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);
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
        if (this.player.castKey.isDown && this.player.tools != null) {
            this.player.changeState(this.player.castState);
        }
    }
}

class CrouchState extends State {
    stateEnter() {
        if (this.player.playerRole == "Hunter")
            this.player.sprite.anims.play('hunterCrouch', true);
        else
            this.player.sprite.anims.play('huntedCrouch', true);

        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);
    }

    stateUpdate() {
        this.player.sprite.setVelocityX(0);
        this.checkCriteria();
    }

    checkCriteria() {
        if (hasEnded && winner != this.player.playerName) {
            this.player.changeState(this.player.deadState);
        }
        if (!this.player.crouchKey.isDown) {
            this.player.changeState(this.player.idleState);
        }
        if (this.player.castKey.isDown && this.player.tools != null) {
            this.player.changeState(this.player.castState);
        }
    }
}

class EnterSlideState extends State {
    stateEnter() {
        if (this.player.playerRole == "Hunter")
            this.animation = this.player.sprite.anims.play('hunterStand', true);
        else
            this.animation = this.player.sprite.anims.play('huntedStand', true);

        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);

        this.animation.on('animationcomplete', () => {
            this.animation.off('animationcomplete');
            this.player.changeState(this.player.slideState);
        });
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
        if (hasEnded && winner != this.player.playerName) {
            this.player.changeState(this.player.DeadState);
        }
    }
}

class SlideState extends State {
    stateEnter() {
        if (this.player.playerRole == "Hunter")
            this.player.sprite.anims.play('hunterSlide', true);
        else
            this.player.sprite.anims.play('huntedSlide', true);

        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);
        
        if (this.player.sprite.body.velocity.x > 0)
            this.defaultVelocity = this.player.moveSpeed * 100;
        else
            this.defaultVelocity = -this.player.moveSpeed * 100;

        this.player.sprite.setVelocityX(this.defaultVelocity * this.player.slideMultiplier);
    }

    stateUpdate() {
        if (this.player.moveLeftKey.isDown)
            this.player.sprite.body.velocity.x += this.player.slideFriction * 10;
        if (this.player.moveRightKey.isDown)
            this.player.sprite.body.velocity.x -= this.player.slideFriction * 10;

        this.checkCriteria();
    }

    checkCriteria() {
        if (hasEnded && winner != this.player.playerName) {
            this.player.changeState(this.player.deadState);
        }
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

class CastState extends State {
    stateEnter() {
        this.activateTools();
        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);

        this.animation.on('animationcomplete', () => {
            this.player.scene.time.delayedCall(100, () => {
                this.player.tools = null;
                this.animation.off('animationcomplete');
                this.player.changeState(this.player.idleState);
            });
        });
    }

    stateUpdate() {
        if(this.player.sprite.body.onFloor()){
            this.player.sprite.setVelocityX(0);
        }
        this.checkCriteria();
    }

    activateTools(){
        switch (this.player.tools) {
            case 'Dad Belt':
                this.animation = this.player.playerRole == "Hunter" ? this.player.sprite.anims.play('hunterCast', true) : this.player.sprite.anims.play('huntedCast', true);
                this.player.activeTools.push(new DadBelt(this.player.scene, this.player.sprite.x, this.player.sprite.y));
                break;
            case 'Dashy Feather':
                this.animation = this.player.playerRole == "Hunter" ? this.player.sprite.anims.play('hunterUse', true) : this.player.sprite.anims.play('huntedUse', true);
                this.player.activeTools.push(new DashyFeather(this.player.scene, this.player.sprite.x, this.player.sprite.y));
                break;
            case 'Slimy Boot':
                this.animation = this.player.playerRole == "Hunter" ? this.player.sprite.anims.play('hunterUse', true) : this.player.sprite.anims.play('huntedUse', true);
                this.player.activeTools.push(new SlimyBoot(this.player.scene, this.player.sprite.x, this.player.sprite.y));
                break;
            case 'Suspicious Mushroom':
                this.animation = this.player.playerRole == "Hunter" ? this.player.sprite.anims.play('hunterCast', true) : this.player.sprite.anims.play('huntedCast', true);
                this.player.activeTools.push(new SuspiciousMushroom(this.player.scene, this.player.sprite.x, this.player.sprite.y));
                break;
            case 'Wooden Buckler':
                this.animation = this.player.playerRole == "Hunter" ? this.player.sprite.anims.play('hunterUse', true) : this.player.sprite.anims.play('huntedUse', true);
                this.player.activeTools.push(new WoodenBuckler(this.player.scene, this.player.sprite.x, this.player.sprite.y));
                break;
            case 'Worn Hat':
                this.animation = this.player.playerRole == "Hunter" ? this.player.sprite.anims.play('hunterUse', true) : this.player.sprite.anims.play('huntedUse', true);
                this.player.activeTools.push(new WornHat(this.player.scene, this.player.sprite.x, this.player.sprite.y));
                break;
        }
    }

    checkCriteria() {
        if (hasEnded && winner != this.player.playerName && this.player.sprite.body.onFloor()) {
            this.player.changeState(this.player.deadState);
        }
    }
}

class DeadState extends State {
    stateEnter() {
        if (this.player.playerRole == "Hunter")
            this.animation = this.player.sprite.anims.play('hunterDeath', true);
        else
            this.animation = this.player.sprite.anims.play('huntedDeath', true);

        this.player.sprite.body.setSize(this.player.sprite.anims.width, this.player.sprite.anims.height);

        // Alternate between black and white tint every 250ms
        let isWhite = true;
        this.player.scene.time.addEvent({
            delay: 250,
            callback: () => {
                this.player.sprite.clearTint();
                this.player.sprite.setTintFill(isWhite ? 0xffffff : 0x000000);
                isWhite = !isWhite;
            },
            loop: true
        });

        this.animation.on('animationcomplete', () => {
            this.player.scene.time.delayedCall(2000, () => {
                this.animation.off('animationcomplete');
                //Change scene
                this.player.scene.scene.start('EndScene');
            });
        });
    }

    stateUpdate() {
        this.player.sprite.setVelocityX(0);
    }

    checkCriteria() {
        
    }
}