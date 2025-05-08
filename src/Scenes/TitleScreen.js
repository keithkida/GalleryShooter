class TitleScreen extends Phaser.Scene {
    constructor() {
        super("TitleScreen");
    }

    preload() {

        this.load.setPath("./assets/");
        this.load.image("background", "purple.png");
        this.load.image('playerShip', 'playerShip1_red.png');
        this.load.image('blueShip', 'enemyBlue4.png');
        this.load.image('greenShip', 'enemyGreen3.png');
        this.load.image('purpleShip', 'enemyBlack1.png');



    }


    create() {

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.ship = this.add.sprite(-50, centerY, 'playerShip').setScale(0.5);
        this.ship.angle = 90;
        this.shipSpeed = 5; 

        this.greenship = this.add.sprite(-50, centerY + 200, 'greenShip').setScale(0.5);
        this.greenship.angle = -90;
        this.greenshipSpeed = 6; 

        this.blueship = this.add.sprite(-50, centerY + 150, 'blueShip').setScale(0.5);
        this.blueship.angle = -90;
        this.blueshipSpeed = 3; 

        this.purpleship = this.add.sprite(-50, centerY + 250, 'purpleShip').setScale(0.5);
        this.purpleship.angle = -90;
        this.purpleshipSpeed = 4; 

        this.titleGalaxy = this.add.text(centerX - 350, centerY - 250, 'Galaxy', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '144px',
            color: '#7DADFA', 
            align: 'center',
            stroke: '#000000',           
            strokeThickness: 10 
        });

        this.titleWar = this.add.text(centerX + 75, centerY - 250, 'War', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '144px',
            color: '#FFD700', 
            align: 'center',
            stroke: '#000000',           
            strokeThickness: 10 
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("Instruction"); 
        });

        this.add.text(centerX, centerY + 60, 'SPACE to continue', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',           
            strokeThickness: 5
        }).setOrigin(0.5);

    }

    update() {

        this.ship.x += this.shipSpeed;
        if (this.ship.x > this.cameras.main.width + 50){ 
            this.ship.x = -50;
        }
        
        this.greenship.x += this.greenshipSpeed;
        if (this.greenship.x > this.cameras.main.width + 50){ 
            this.greenship.x = -50;
        }
        
        this.blueship.x += this.blueshipSpeed;
        if (this.blueship.x > this.cameras.main.width + 50){ 
            this.blueship.x = -50;
        }
        
        this.purpleship.x += this.purpleshipSpeed;
        if (this.purpleship.x > this.cameras.main.width + 50){
            this.purpleship.x = -50;
        }
    }
}