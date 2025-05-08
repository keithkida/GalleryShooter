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
        this.currentWaveSize = 3;
        this.maxWaveSize = 7;
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
        this.load.audio("attackSound", "laser9.ogg");
        this.load.audio("bgMusic", "8bit-spaceshooter.mp3");
    }

    create() {
        let my = this.my;

        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
        this.bgMusic.play();

        my.sprite.playerShip = this.add.sprite(this.shipX, this.shipY, "playerShip").setScale(0.5);

        this.healthIcon = this.add.image(20, 25, "playerShip").setScale(0.3).setOrigin(0, 0.5);

        this.lives = this.add.text(60, 25, "X " + this.playerHealth, {
            fontFamily: "Stencil Std, fantasy",
            fontSize: "32px",
            fill: "#ffffff",
            stroke: '#000000',
            strokeThickness: 3 
        }).setOrigin(0, 0.5);

        this.score = this.add.text(625, 25, "Score: " + this.playerScore, {
            fontFamily: "Stencil Std, fantasy",
            fontSize: "32px",
            fill: "#ffffff",
            stroke: '#000000',
            strokeThickness: 3 
        }).setOrigin(0, 0.5);

        this.my.sprite.bullet = [];

        for (let i = 0; i < this.maxBullets; i++) {
            let bullet = this.add.sprite(-10, -10, "laser");
            bullet.visible = false;
            this.my.sprite.bullet.push(bullet);
        }

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.shipSpeed = 15;
        this.laserSpeed = 25;
        this.enemySpeed = 1;
    }

    update() {
        let my = this.my;
        this.bulletCooldownCounter--;

        if (this.aKey.isDown && my.sprite.playerShip.x > my.sprite.playerShip.displayWidth / 2) {
            my.sprite.playerShip.x -= this.shipSpeed;
        }

        if (this.dKey.isDown && my.sprite.playerShip.x < this.cameras.main.width - my.sprite.playerShip.displayWidth / 2) {
            my.sprite.playerShip.x += this.shipSpeed;
        }

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

        for (let bullet of my.sprite.bullet) {
            if (bullet.visible) {
                bullet.y -= this.laserSpeed;
                if (bullet.y < -bullet.displayHeight / 2) {
                    bullet.visible = false;
                }
            }
        }

        if (this.enemies.length === 0) {
            const width = this.cameras.main.width;
            const enemyTypes = ["cryonShip", "verdaraShip", "umbrosShip"];
            for (let i = 0; i < this.currentWaveSize; i++) {
                let x = Phaser.Math.Between(50, width - 50);
                let enemyType = Phaser.Utils.Array.GetRandom(enemyTypes);

                let path = new Phaser.Curves.Path(x, -50);
                path.lineTo(x, this.cameras.main.height + 100);

                let enemy = this.add.follower(path, x, -50, enemyType).setScale(0.5);

                let followDuration;
                if (enemyType === "verdaraShip") {
                    followDuration = 15000 / (this.enemySpeed * 3); 
                } else {
                    followDuration = 15000 / this.enemySpeed;
                }

                enemy.startFollow({
                    duration: followDuration,
                    rotateToPath: false
                });

                enemy.type = enemyType;

                if (enemy.type === "cryonShip") {
                    enemy.health = 2;
                } else {
                    enemy.health = 1;
                }

                this.enemies.push(enemy);
            }

            if (this.currentWaveSize < this.maxWaveSize) {
                this.currentWaveSize++;
            }
        }

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            let enemy = this.enemies[i];

            if (enemy.y > this.cameras.main.height + enemy.displayHeight / 2) {
                this.enemies.splice(i, 1);
                enemy.destroy();
                this.playerHealth--;
                continue;
            }

            for (let bullet of my.sprite.bullet) {
                if (bullet.visible && this.collides(bullet, enemy)) {
                    this.sound.play("attackSound");
                    bullet.visible = false;
                    enemy.health--;

                    if (enemy.health <= 0) {
                        if (enemy.type === "umbrosShip") {
                            for (let j = 0; j < 2; j++) {
                                let offsetX;
                                if (j === 0) {
                                    offsetX = 40;
                                } else {
                                    offsetX = -40
                                }

                                let path = new Phaser.Curves.Path(enemy.x + offsetX, enemy.y);
                                path.lineTo(enemy.x + offsetX, this.cameras.main.height + 100);

                                let smallEnemy = this.add.follower(path, enemy.x + offsetX, enemy.y, "smallumbrosShip").setScale(0.4);
                                smallEnemy.startFollow({
                                    duration: 15000 / (this.enemySpeed + 1),
                                    rotateToPath: false
                                });

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
            this.bgMusic.stop();
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