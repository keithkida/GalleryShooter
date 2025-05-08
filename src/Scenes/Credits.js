class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("background", "purple.png");
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add.text(centerX, centerY - 120, 'Credits', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '64px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 40, 'Background: Kenney Assets', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, 'Sprites: Kenney Assets', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 40, 'Sound Effects: Kenney Assets', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 80, 'Music: HydroGene', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 160, 'Press SPACE to return', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("TitleScreen");
        });
    }

    update() {}
}