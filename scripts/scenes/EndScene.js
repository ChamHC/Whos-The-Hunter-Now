import {winner, gameDuration, gameRounds, setHasEnded} from '../GameStats.js';

class EndScene extends Phaser.Scene{
    constructor() {
        super({ key: 'EndScene' });
        this.winner;
        this.duration;
        this.rounds;
    }

    preload(){
        // Load background images
        this.backgroundLoading();
        // Load font
        this.loadFont('ThaleahFat', 'resources/font/ThaleahFat.ttf');
        // Load button border image
        this.load.image('buttonBorder', 'resources/ui/menu-border.png');
        // Load border
        this.load.image('border', 'resources/ui/menu-border-6x.png');
    }

    create(){
        // Create background images
        this.config = this.sys.game.config;
        this.winner = winner.replace("Player", "Player ");
        this.duration = gameDuration;
        this.rounds = gameRounds;

        this.backgroundConfig();

        // Create Title
        this.writeText(this.config.width / 2, this.config.height / 2 - 200, this.winner + " Wins", 100, 'ThaleahFat', '#ffffff', 0.5);
        this.writeText(this.config.width / 2, this.config.height / 2 - 100, "Duration: " + this.duration + " seconds", 30, 'ThaleahFat', '#ffffff', 0.5);
        this.writeText(this.config.width / 2, this.config.height / 2 - 50, "Rounds:  " + this.rounds, 30, 'ThaleahFat', '#ffffff', 0.5);
        this.add.image(this.config.width / 2, this.config.height / 2 - 125, 'border');
        
        // Create Buttons
        this.createButton(this.config.width / 2, this.config.height / 2 + 45, 'Restart', this.restartButtonClicked, this);
        this.createButton(this.config.width / 2, this.config.height / 2 + 135, 'Main Menu', this.mainMenuButtonClicked, this);
        this.createButton(this.config.width / 2, this.config.height / 2 + 225, 'Exit', this.exitButtonClicked, this);

        this.cameras.main.fadeIn(1000, 0, 0, 0);  //Tween entire screen tint black to white
    }

    update(){
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
    restartButtonClicked(scene){
        scene.cameras.main.fade(1000, 0, 0, 0, false, (camera, progress) => {
            if (progress === 1) {
                setHasEnded(false);
                scene.scene.start('GameScene');
            }
        });
    }
    mainMenuButtonClicked(scene){
        scene.cameras.main.fade(1000, 0, 0, 0, false, (camera, progress) => {
            if (progress === 1) {
                setHasEnded(false);
                scene.scene.start('MenuScene');
            }
        });
    }
    exitButtonClicked(scene){
        window.close();
    }
}
export default EndScene;