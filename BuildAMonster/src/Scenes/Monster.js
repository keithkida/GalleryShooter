class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        // Define the locations of the smile and hands relative to the
        // main body location. This way, if we change the main body
        // location, the other values update too.
        this.MouthX = this.bodyX;
        this.MouthY = this.bodyY + 20;

        this.AntennaX = this.bodyX + 10;
        this.AntennaY = this.bodyY - 100; 

        this.EyeX = this.bodyX;
        this.EyeY = this.bodyY - 35;        

        this.leftArmX = this.bodyX - 100;
        this.leftArmY = this.bodyY + 100;
        
        this.rightArmX = this.bodyX + 100;
        this.rightArmY = this.bodyY + 100;    
        
        this.leftLegX = this.bodyX - 40;
        this.leftLegY = this.bodyY + 140;

        this.rightLegX = this.bodyX + 40;
        this.rightLegY = this.bodyY + 140;

        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        
        // Create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        // Create the Antenna sprite
        my.sprite.antenna = this.add.sprite(this.AntennaX, this.AntennaY, "monsterParts", "detail_green_antenna_large.png");

        // Create the eye sprite
        my.sprite.eye = this.add.sprite(this.EyeX, this.EyeY, "monsterParts", "eye_cute_light.png"); 

        // Create the mouth sprites
        my.sprite.smile = this.add.sprite(this.MouthX, this.MouthY, "monsterParts", "mouthA.png");
        my.sprite.fang = this.add.sprite(this.MouthX, this.MouthY, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fang.visible = false;

        // Create the arm sprites
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_greenD.png");
        my.sprite.leftArm.flipX = true;
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_greenD.png");

        // Create the leg sprites
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_greenD.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_greenD.png");        
        
        // poll key for P
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // poll key for F to show fangs
        this.input.keyboard.on('keydown-F', () => {
            my.sprite.smile.visible = false;
            my.sprite.fang.visible = true;
        });

            // poll key for S to make the face smile
        this.input.keyboard.on('keydown-S', () => {
            my.sprite.smile.visible = true;
            my.sprite.fang.visible = false;
        });
        
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // poll key for P for when its pressed how it changes to peace sign
        if (this.aKey.isDown) {

            my.sprite.body.x -= 5;
            my.sprite.antenna.x -= 5;
            my.sprite.eye.x -= 5;
            my.sprite.smile.x -= 5;
            my.sprite.fang.x -= 5;
            my.sprite.leftArm.x -= 5;
            my.sprite.rightArm.x -= 5;
            my.sprite.leftLeg.x -= 5;
            my.sprite.rightLeg.x -= 5;
        } 
        
        if (this.dKey.isDown) {

            my.sprite.body.x += 5;
            my.sprite.antenna.x += 5;
            my.sprite.eye.x += 5;
            my.sprite.smile.x += 5;
            my.sprite.fang.x += 5;
            my.sprite.leftArm.x += 5;
            my.sprite.rightArm.x += 5;
            my.sprite.leftLeg.x += 5;
            my.sprite.rightLeg.x += 5;
        }        
        
    }

}



        
        