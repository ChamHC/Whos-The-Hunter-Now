class MenuScene extends Phaser.Scene{
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload(){
        // Load background images
        this.backgroundLoading();
        // Load font
        this.loadFont('ThaleahFat', 'resources/font/ThaleahFat.ttf');
        // Load button border image
        this.load.image('buttonBorder', 'resources/ui/menu-border.png');
        // Load How To Play controls images
        this.load.image('wKey', 'resources/controls/Single PNGs/W.png');
        this.load.image('aKey', 'resources/controls/Single PNGs/A.png');
        this.load.image('sKey', 'resources/controls/Single PNGs/S.png');
        this.load.image('dKey', 'resources/controls/Single PNGs/D.png');
        this.load.image('upKey', 'resources/controls/Single PNGs/ARROWUP.png');
        this.load.image('leftKey', 'resources/controls/Single PNGs/ARROWLEFT.png');
        this.load.image('downKey', 'resources/controls/Single PNGs/ARROWDOWN.png');
        this.load.image('rightKey', 'resources/controls/Single PNGs/ARROWRIGHT.png');
        this.load.image('leftShiftKey', 'resources/controls/Single PNGs/SHIFT.png');
        this.load.image('rightShiftKey', 'resources/controls/Single PNGs/SHIFTALTERNATIVE.png');
        // Load How To Play tools images
        this.load.image('dadsBelt', 'resources/icons/Equipment/Belt.png');
        this.load.image('dashyFeather', 'resources/icons/Monster Part/Feather.png');
        this.load.image('slimyBoot', 'resources/icons/Equipment/Leather Boot.png');
        this.load.image('suspiciousMushroom', 'resources/icons/Food/Mushroom.png');
        this.load.image('woodenBuckler', 'resources/icons/Weapon & Tool/Wooden Shield.png');
        this.load.image('wornHat', 'resources/icons/Equipment/Wizard Hat.png');
        // Load Player Spritesheets
        this.load.spritesheet('playerIdle', 'resources/player/idle/adventurer-idle-spritesheet-21x30.png', { frameWidth: 63, frameHeight: 90 });
        this.load.spritesheet('playerIdleInvert', 'resources/player/idle/adventurer-invert-idle-spritesheet-21x30.png', { frameWidth: 63, frameHeight: 90 });
        this.load.spritesheet('portal', 'resources/portal/Portal-spritesheet.png', { frameWidth: 18, frameHeight: 32 });
    }

    create(){
        // Create background images
        this.config = this.sys.game.config;
        this.backgroundConfig();
        
        // Create Title
        this.writeText(this.config.width / 2, this.config.height / 2 - 150, 'Who\'s The Hunter Now?', 100, 'ThaleahFat', '#ffffff', 0.5);
        
        // Create Buttons
        this.createButton(this.config.width / 2, this.config.height / 2 + 20, 'Play', this.playButtonClicked, this);
        this.createButton(this.config.width / 2, this.config.height / 2 + 110, 'How To Play', this.howToPlayButtonClicked, this);
        this.createButton(this.config.width / 2, this.config.height / 2 + 200, 'Exit', this.exitButtonClicked, this);
        this.createButton(this.config.width / 2 + this.config.width - 150, this.config.height / 2 + 230, 'Back', this.backButtonClicked, this);
        this.createButton(this.config.width / 2 + this.config.width + 150, this.config.height / 2 + 230, 'Next', this.nextButtonClicked, this);
        this.createButton(this.config.width / 2 + this.config.width*2, this.config.height / 2 + 230, 'Back', this.howToPlayButtonClicked, this);
        
        /*
        Roles:
        One player is designated as The Hunter, while the other is The Hunted.
        The Hunter's objective is to capture The Hunted.
        The Hunted's objective is to escape from The Hunter's view.

        Role Switch:
        As The Hunted, reach a designated goal to switch roles.
        The Hunter now becomes The Hunted, and vice versa.

        Tools:
        Random tools will appear throughout the arena.
        Use these tools strategically to turn the tide of the chase.
        */
        this.anims.create({   // Create the idle animation
            key: 'idle',    
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({   // Create the idle animation
            key: 'idleInvert',    
            frames: this.anims.generateFrameNumbers('playerIdleInvert', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({   // Create the idle animation
            key: 'portal',    
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        const spriteHunter = {x : 250 + this.config.width, y : 100};
        this.spriteAHunter = this.add.sprite(spriteHunter.x + 0, spriteHunter.y + 0, 'playerIdleInvert');
        this.spriteBHunter = this.add.sprite(spriteHunter.x + 290, spriteHunter.y + 0, 'playerIdle');
        this.spriteAHunter.anims.play('idleInvert');
        this.spriteBHunter.anims.play('idleInvert');
        this.spriteBHunter.flipX = true;
        this.writeText(spriteHunter.x + 50, spriteHunter.y + 0, 'The Hunter', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(spriteHunter.x - 50, spriteHunter.y + 50, 'Objective: Capture The Hunted', 30, 'ThaleahFat', '#ffffff', 0);

        const spriteHunted = {x : 850 + this.config.width, y : 100};
        this.spriteAHunted = this.add.sprite(spriteHunted.x + 0, spriteHunted.y + 0, 'playerIdle');
        this.spriteBHunted = this.add.sprite(spriteHunted.x + 290, spriteHunted.y + 0, 'playerIdle');
        this.spriteAHunted.anims.play('idle');
        this.spriteBHunted.anims.play('idle');
        this.spriteBHunted.flipX = true;
        this.writeText(spriteHunted.x + 50, spriteHunted.y + 0, 'The Hunted', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(spriteHunted.x - 85, spriteHunted.y + 50, 'Objective: Escape The Hunter\'s View', 30, 'ThaleahFat', '#ffffff', 0);

        const spriteTools = {x : 250 + this.config.width, y : 300};
        this.createToolsIcon(spriteTools.x + 0, spriteTools.y + 0, 'dadsBelt');
        this.createToolsIcon(spriteTools.x + 290, spriteTools.y + 0, 'dashyFeather');
        this.writeText(spriteTools.x + 90, spriteTools.y + 0, 'Tools', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(spriteTools.x - 60, spriteTools.y + 50, 'Use Tools in the arena to turn\nthe tides of the chase', 30, 'ThaleahFat', '#ffffff', 0);

        const spritePortal = {x : 850 + this.config.width, y : 300};
        this.portalA = this.add.sprite(spritePortal.x, spritePortal.y, 'portal');
        this.portalB = this.add.sprite(spritePortal.x + 290, spritePortal.y, 'portal')
        this.portalA.anims.play('portal');
        this.portalB.anims.play('portal');
        this.portalA.setScale(3);
        this.portalB.setScale(3);
        this.writeText(spritePortal.x + 50, spritePortal.y - 40, 'Role Switch', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(spritePortal.x + 90, spritePortal.y + 0, 'Portal', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(spritePortal.x - 60, spritePortal.y + 50, 'Reach the portal as The Hunted\n to switch roles', 30, 'ThaleahFat', '#ffffff', 0);

        // Create How To Play Controls and Tools Icon
        const playerA = this.playerAKeys(this.config.width*2 + 150, 170);
        this.writeText(playerA.x - 70, playerA.y - 150, 'Player A Controls', 60, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerA.x + 100, playerA.y - 85, 'A: Move Left', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerA.x + 100, playerA.y - 45, 'D: Move Right', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerA.x + 100, playerA.y - 5, 'W: Jump', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerA.x + 100, playerA.y + 35, 'S: Crouch / Slide', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerA.x + 100, playerA.y + 75, 'LShift: Use Tool', 40, 'ThaleahFat', '#ffffff', 0);

        const playerB = this.playerBKeys(this.config.width*2 + 850, 170);
        this.writeText(playerB.x - 70, playerB.y - 150, 'Player B Controls', 60, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerB.x + 100, playerB.y - 85, 'Up: Move Left', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerB.x + 100, playerB.y - 45, 'Down: Move Right', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerB.x + 100, playerB.y - 5, 'Left: Jump', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerB.x + 100, playerB.y + 35, 'Right: Crouch / Slide', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(playerB.x + 100, playerB.y + 75, 'RShift: Use Tool', 40, 'ThaleahFat', '#ffffff', 0);
        
        const tools = this.toolsIcons(this.config.width*2 + 80, 350);
        this.writeText(tools.x + 60, tools.y - 30, 'Dad\'s Belt', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 60, tools.y, 'Knockback Opponent', 30, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 60, tools.y + 70, 'Dashy Feather', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 60, tools.y + 100, 'Dash Forward', 30, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 460, tools.y - 30, 'Slimy Boot', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 460, tools.y, 'Launch Upward', 30, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 460, tools.y + 70, 'Suspicious Mushroom', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 460, tools.y + 100, 'Reverse Opponent\'s Control', 30, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 960, tools.y - 30, 'Wooden Buckler', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 960, tools.y, 'Block Opponent\'s Attack', 30, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 960, tools.y + 70, 'Worn Hat', 40, 'ThaleahFat', '#ffffff', 0);
        this.writeText(tools.x + 960, tools.y + 100, 'Stun Opponent', 30, 'ThaleahFat', '#ffffff', 0);
    }

    update(){
        // Scroll the background images
        this.backgroundScrolling();
    }

    backgroundLoading(){
        for (let i = 1; i <= 12; i++) {
            this.load.image(`bg${i}`, `resources/background/layer${12 - i}.png`);
        }
    }
    backgroundConfig(){
        const scale = 1.1;
        const bgImages = [];
        for (let i = 0; i < 12; i++) {
            const bgImg = this.add.tileSprite(0, 0, this.config.width * 5, this.config.height + 400, `bg${i + 1}`);
            bgImg.setPosition(this.config.width / 2, this.config.height / 2);
            bgImg.displayHeight = this.config.height;
            bgImg.scaleX = scale;
            bgImg.scaleY = scale;
            bgImg.setDepth(-5);
            bgImages.push(bgImg);
          }
          this.bgImages = bgImages; 
    }
    backgroundScrolling(){
        for (let i = 0; i < this.bgImages.length; i++) {
            this.bgImages[i].tilePositionX += (i + 1) * 0.1;
        }
    }

    loadFont(name, url){
        const newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function(loadedFont){
            document.fonts.add(loadedFont);
        }).catch(function(error){
            return error;
        });
    }
    writeText(x, y, text, size, family, clr, origin){
        this.add.text(x, y, text, {
            fontSize: size,
            fontFamily: family,
            color: clr,
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(origin);
    }

    createButton(x, y, text, callback, scene) {
        let button = this.add.text(x, y, text, {
            fontSize: '48px',
            fontFamily: 'ThaleahFat',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
    
        // Add button border image
        let buttonBorder = this.add.image(x, y+10, 'buttonBorder').setVisible(false);
        buttonBorder.scale = 2;
    
        // Set button interactivity
        button.setInteractive();
    
        // Button hover event
        button.on('pointerover', function() {
            buttonBorder.setVisible(true);
        });
    
        // Button hover out event
        button.on('pointerout', function() {
            buttonBorder.setVisible(false);
        });

        // Button click event
        button.on('pointerdown', function() {
            button.setStyle({ color: '#AAFF00' });
            buttonBorder.setTint(0xAAFF00);

            // Tween button and border scale
            scene.tweens.add({
                targets: [button, buttonBorder],
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100,
                yoyo: true,
                repeat: 0,
                onComplete: function() {
                    // delay 0.2 second
                    scene.time.delayedCall(150, function() {
                        callback(scene);
                    });
                    scene.time.delayedCall(500, function() {
                        button.setStyle({ color: '#ffffff' });
                        buttonBorder.setTint(0xffffff);
                    });
                }
            });
        });

        return button;
    }
    playButtonClicked(scene){
        scene.cameras.main.fade(1000, 0, 0, 0, false, (camera, progress) => {
            if (progress === 1) {
                scene.scene.start('GameScene');
            }
        });
    }
    howToPlayButtonClicked(scene){
        //console.log("How To Play Button Clicked");
        scene.cameras.main.pan(scene.config.width / 2 + scene.config.width, scene.config.height / 2, 1000, 'Quad.easeOut', false, function(camera, progress){});
    }
    exitButtonClicked(scene){
        //console.log("Exit Button Clicked");
        window.close();
    }
    backButtonClicked(scene){
        //console.log("Back Button Clicked");
        scene.cameras.main.pan(scene.config.width / 2, scene.config.height / 2, 1000, 'Quad.easeOut', false, function(camera, progress){});
    }
    nextButtonClicked(scene){
        //console.log("Next Button Clicked");
        scene.cameras.main.pan(scene.config.width / 2 + scene.config.width*2, scene.config.height / 2, 1000, 'Quad.easeOut', false, function(camera, progress){});
    }

    createControlKeys(x, y, key){
        this.Key = this.add.image(x, y, key).setScale(2);
        // Tween Control Keys Scale Up and Down
        this.tweens.add({
            targets: this.Key,
            scaleX: 2.2,
            scaleY: 2.2,
            duration: 200,
            yoyo: true,
            repeat: -1
        });
    }
    playerAKeys(x, y){
        this.createControlKeys(x, y - 25, 'wKey');
        this.createControlKeys(x, y + 25, 'sKey');
        this.createControlKeys(x - 50, y + 25, 'aKey');
        this.createControlKeys(x + 50, y + 25, 'dKey');
        this.createControlKeys(x, y + 75, 'leftShiftKey');
        return { x: x, y: y };
    }
    playerBKeys(x, y){
        this.createControlKeys(x, y - 25, 'upKey');
        this.createControlKeys(x, y + 25, 'downKey');
        this.createControlKeys(x - 50, y + 25, 'leftKey');
        this.createControlKeys(x + 50, y + 25, 'rightKey');
        this.createControlKeys(x, y + 75, 'rightShiftKey');
        return { x: x, y: y };
    }
    
    createToolsIcon(x, y, key){
        this.Tool = this.add.image(x, y, key).setScale(2);
        this.Tool.angle = -10;
        this.tweens.add({
            targets: this.Tool,
            scaleX: 2.2,
            scaleY: 2.2,
            angle: -this.Tool.angle,
            duration: 400,
            yoyo: true,
            repeat: -1
        });
    }
    toolsIcons(x, y){
        this.createToolsIcon(x, y, 'dadsBelt');
        this.createToolsIcon(x, y + 100, 'dashyFeather');
        this.createToolsIcon(x + 400, y, 'slimyBoot');
        this.createToolsIcon(x + 400, y + 100, 'suspiciousMushroom');
        this.createToolsIcon(x + 900, y, 'woodenBuckler');
        this.createToolsIcon(x + 900, y + 100, 'wornHat');
        return { x: x, y: y };
    }
}
export default MenuScene;