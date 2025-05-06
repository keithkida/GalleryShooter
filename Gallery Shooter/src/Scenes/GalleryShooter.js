class GalleryShooter extends Phaser.Scene {
    constructor() {
        super("GalleryShooter");
        this.my = { sprite: {} };

        this.maxBullets = 10;
        this.bulletCooldown = 10;
        this.bulletCooldownCounter = 0;

        this.shipX = 400;
        this.shipY = 550;

        this.playerHealth = 3;
        this.playerScore = 0;

        this.my.sprite.stars = [];

        this.enemies = []; 
        this.currentWaveSize = 4;
        this.maxWaveSize = 8;

    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("background", "purple.png");
        this.load.image("playerShip", "playerShip1_red.png");
        this.load.image("laser", "laserGreen02.png");
        this.load.image("cryonShip", "enemyBlue4.png");
        this.load.image("verdaraShip", "enemyGreen3.png");
        this.load.image("umbrosShip", "enemyBlack1.png");
        this.load.image("smallumbrosShip", "enemyBlack5.png");        
        this.load.image("star", "star_gold.png");
        this.load.audio("laserSound", "laserLarge_001.ogg");
    }

    create() {
        let my = this.my;

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        my.sprite.playerShip = this.add.sprite(this.shipX, this.shipY, "playerShip").setScale(0.5);

        this.healthIcon = this.add.image(20, 25, "playerShip").setScale(0.3).setOrigin(0, 0.5);

        this.lives = this.add.text(60, 25, "X " + this.playerHealth, {
            font: "24px Arial",
            fill: "#ffffff",
            stroke: '#000000',           
            strokeThickness: 3 
        }).setOrigin(0, 0.5);

        this.score = this.add.text(650, 25, "Score: " + this.playerScore, {
            font: "24px Arial",
            fill: "#ffffff",
            stroke: '#000000',           
            strokeThickness: 3 
        }).setOrigin(0, 0.5);

        this.my.sprite.bullet = [];

        for (let i = 0; i < this.maxBullets; i++) {
            let bullet = this.add.sprite(-10, -10, "laser").setScale(0.5);
            bullet.visible = false;
            this.my.sprite.bullet.push(bullet);
        }


        // Input keys
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.shipSpeed = 10;
        this.laserSpeed = 25;;
        this.enemySpeed = 2;
    }

    update() {
        let my = this.my;
        this.bulletCooldownCounter--;

        // Player movement
        if (this.aKey.isDown && my.sprite.playerShip.x > my.sprite.playerShip.displayWidth / 2) {
            my.sprite.playerShip.x -= this.shipSpeed;
        }

        if (this.dKey.isDown && my.sprite.playerShip.x < this.cameras.main.width - my.sprite.playerShip.displayWidth / 2) {
            my.sprite.playerShip.x += this.shipSpeed;
        }

        // Player shooting
        if (this.spaceKey.isDown && this.bulletCooldownCounter < 0) {
            this.sound.play("laserSound");
            for (let bullet of my.sprite.bullet) {
                if (!bullet.visible) {
                    bullet.x = my.sprite.playerShip.x;
                    bullet.y = my.sprite.playerShip.y - bullet.displayHeight / 2;
                    bullet.visible = true;
                    this.bulletCooldownCounter = this.bulletCooldown;
                    break;
                }
            }
        }

        // Update bullets
        for (let bullet of my.sprite.bullet) {
            if (bullet.visible) {
                bullet.y -= this.laserSpeed;
                if (bullet.y < -bullet.displayHeight / 2) {
                    bullet.visible = false;
                }
            }
        }

        // Spawn new wave
        if (this.enemies.length === 0) {
            const width = this.cameras.main.width;
            const enemyTypes = ["cryonShip", "verdaraShip", "umbrosShip"];
            for (let i = 0; i < this.currentWaveSize; i++) {
                let x = Phaser.Math.Between(50, width - 50);
                let enemyType = Phaser.Utils.Array.GetRandom(enemyTypes);
                let enemy = this.add.sprite(x, -50, enemyType).setScale(0.5);
                if (enemyType === "cryonShip") {
                    enemy.health =  2
                } else { 
                    enemy.health = 1;
                }
                if (enemyType === "verdaraShip") {
                    enemy.speed = this.enemySpeed * 2;
                } else {
                    enemy.speed = this.enemySpeed;
                }
                this.enemies.push(enemy);
            }

            if (this.currentWaveSize < this.maxWaveSize) {
                this.currentWaveSize++;
            }
        }

        // Update and handle enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            let enemy = this.enemies[i];
            enemy.y += enemy.speed;

            if (enemy.y > this.cameras.main.height + enemy.displayHeight / 2) {
                this.enemies.splice(i, 1);
                enemy.destroy();
                this.playerHealth--;
                continue;
            }

            for (let bullet of my.sprite.bullet) {
                if (bullet.visible && this.collides(bullet, enemy)) {
                    bullet.visible = false;
                    enemy.health--;

                    if (enemy.health <= 0) {
                        // Split logic for umbrosShip
                        if (enemy.texture.key === "umbrosShip") {
                            for (let j = 0; j < 2; j++) {
                                let offsetX = (j === 0) ? -40 : 40;
                                let smallEnemy = this.add.sprite(enemy.x + offsetX, enemy.y, "smallumbrosShip").setScale(0.4);
                                smallEnemy.health = 1;
                                smallEnemy.speed = this.enemySpeed + 1;
                                this.enemies.push(smallEnemy);
                            }
                        }

                        this.enemies.splice(i, 1);
                        enemy.destroy();
                        this.playerScore += 100;

                        if (Phaser.Math.Between(0, 100) < 30) {
                            let star = this.add.sprite(enemy.x, enemy.y, "star").setScale(0.5);
                            this.my.sprite.stars.push(star);
                        }
                    }

                    break;
                }
            }
        }

        // Update stars
        for (let i = this.my.sprite.stars.length - 1; i >= 0; i--) {
            let star = this.my.sprite.stars[i];
            if (star.active) {
                star.y += 2;
                if (this.collides(star, my.sprite.playerShip)) {
                    star.destroy();
                    this.my.sprite.stars.splice(i, 1);
                    this.playerScore += 200;
                }
            }
        }

        this.lives.setText("X " + this.playerHealth);
        this.score.setText("Score: " + this.playerScore);

        if (this.playerHealth <= 0) {
            this.scene.start("GameOver");
            this.playerHealth = 3;
            this.playerScore = 0;
            this.currentWaveSize = 4;
        }

        
    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth / 2 + b.displayWidth / 2)) {
            return false;
        }
        if (Math.abs(a.y - b.y) > (a.displayHeight / 2 + b.displayHeight / 2)) {
            return false;
        }
        return true;
    }
}