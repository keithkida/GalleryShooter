class Instruction extends Phaser.Scene {
    constructor() {
        super("Instruction");
    }

    preload() {

        this.load.setPath("./assets/");
        this.load.image("background", "purple.png");

    }


    create() {

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.titleInstruction = this.add.text(centerX - 350, centerY - 250, 'Instruction', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '144px',
            color: '#0000ff', 
            align: 'center',
            stroke: '#000000',           
            strokeThickness: 10 
        });


        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("GalleryShooter"); 
        });

        this.add.text(centerX, centerY + 220, 'SPACE to Start', {
            fontFamily: 'Stencil Std',
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 40, 'Enemies:', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#FFD700',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 10, ' Star - +200 point', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFD700'
        }).setOrigin(0.5);
        
        this.add.text(centerX, centerY + 50, ' Blue Ship - Takes 2 hits to destroy', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#00BFFF'
        }).setOrigin(0.5);
        
        this.add.text(centerX, centerY + 90, ' Green Ship - Fast and agile', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#32CD32'
        }).setOrigin(0.5);
        
        this.add.text(centerX, centerY + 130, ' Purple Ship - Spawns 2 minions when destroyed', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#DA70D6'
        }).setOrigin(0.5);

    }

    update() {


    }
}