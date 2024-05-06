class MenuScene extends Phaser.Scene{
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload(){
        // Load background images
        this.backgroundLoading();
        // Load font
        this.loadFont('ThaleahFat', 'resources/font/ThaleahFat.ttf');
        this.load.image('buttonBorder', 'resources/ui/menu-border.png');
    }

    create(){
        // Create background images
        this.config = this.sys.game.config;
        this.backgroundConfig();
    
        // Write Texts
        this.writeText(this.config.width / 2, this.config.height / 2 - 150, 'Who\'s The Hunter Now?', 100, 'ThaleahFat', '#ffffff');

        // Create Buttons
        this.createButton(this.config.width / 2, this.config.height / 2 + 20, 'Play', this.playButtonClicked, this);
        this.createButton(this.config.width / 2, this.config.height / 2 + 110, 'How To Play', this.howToPlayButtonClicked, this);
        this.createButton(this.config.width / 2, this.config.height / 2 + 200, 'Option', this.optionButtonClicked, this);
        this.createButton(this.config.width / 2 - this.config.width, this.config.height / 2 + 200, 'Back', this.backButtonClicked, this);
        this.createButton(this.config.width / 2 + this.config.width, this.config.height / 2 + 200, 'Back', this.backButtonClicked, this);
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
            const bgImg = this.add.tileSprite(0, 0, this.config.width * 3, this.config.height + 400, `bg${i + 1}`);
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

    writeText(x, y, text, size, family, clr){
        this.add.text(x, y, text, {
            fontSize: size,
            fontFamily: family,
            color: clr
        }).setOrigin(0.5);
    }

    createButton(x, y, text, callback, scene) {
        let button = this.add.text(x, y, text, {
            fontSize: '48px',
            fontFamily: 'ThaleahFat',
            color: '#ffffff'
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
        scene.cameras.main.pan(scene.config.width / 2 - scene.config.width, scene.config.height / 2, 1000, 'Quad.easeOut', false, function(camera, progress){});
    }

    optionButtonClicked(scene){
        //console.log("Option Button Clicked");
        scene.cameras.main.pan(scene.config.width / 2 + scene.config.width, scene.config.height / 2, 1000, 'Quad.easeOut', false, function(camera, progress){});
    }

    backButtonClicked(scene){
        //console.log("Back Button Clicked");
        scene.cameras.main.pan(scene.config.width / 2, scene.config.height / 2, 1000, 'Quad.easeOut', false, function(camera, progress){});
    }
}
export default MenuScene;