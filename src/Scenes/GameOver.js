class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {

        this.load.setPath("./assets/");
        this.load.image("GameOverbackground", "darkPurple.png");

    }


    create() {

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(0, 0, 'GameOverbackground').setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.titleGame = this.add.text(centerX - 350, centerY - 250, 'GAME', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '144px',
            color: '#ff0000', 
            align: 'center',
            stroke: '#000000',           
            strokeThickness: 10 
        });

        this.titleOver = this.add.text(centerX + 25, centerY - 250, 'OVER', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '144px',
            color: '#ff0000', 
            align: 'center',
            stroke: '#000000',           
            strokeThickness: 10 
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("TitleScreen"); 
        });


        this.add.text(centerX, centerY + 100, 'SPACE to return', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',           
            strokeThickness: 5
        }).setOrigin(0.5);

    }

    update() {


    }
}