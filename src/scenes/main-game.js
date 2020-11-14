export class MainGame extends Phaser.Scene {
  constructor() {
    super({
      key: "main"
    });

    this.bullets;
    this.crabs;
  }

  preload() {
    // Nigga preload da sounds
    this.load.audio('blaster_bullet', 'assets/blasterBullet.ogg');
    this.load.audio('blaster_explosition', 'assets/blasterExplosion.ogg');
    this.load.audio('blaster_move', 'assets/blasterMove.ogg');
    this.load.audio('enemy_bullet', 'assets/enemyBullet.ogg');
    this.load.audio('enemy_explosion', 'assets/enemyExplosion.ogg');

    // Nigga preload da bird n egg, shout outs to #egg
    this.load.image('bird', 'assets/bird.png');
    this.load.image('egg', 'assets/egg.png');

    // Crab man never won a rap battle against jewbird
    this.load.image('crab', 'assets/crab.png');

    // Cheaped out cuz I couldn't be bothered to draw a vector triangle lol
    this.load.image('small_triangle', 'assets/small_triangle.png');


  }

  create() {
    this.debugMode = true;

    this.xCheck = 0;
    this.yCheck = 0;
    this.playerPosIndex = 0;

    var layer1Graphic = this.add.graphics({
      x: 0,
      y: 0
    });

    var layer1 = new Phaser.Geom.Polygon([
      325, 150,
      58, 750,
      590, 750
    ]);

    var linePoints = [];
    var points = [];

    layer1Graphic.lineStyle(0.5, 0x00aa00);
    layer1Graphic.beginPath();

    // This works out the points for the triangle
    // There are main points that draw a triangle
    // Then hidden ones which determine the enemies movement and play positions
    for (let i = 0; i < layer1.points.length - 1; i++) {
      layer1Graphic.lineTo(layer1.points[i].x, layer1.points[i].y);
      linePoints.push(new Phaser.Geom.Line(layer1.points[i].x, layer1.points[i].y, layer1.points[i + 1].x, layer1.points[i + 1].y).getPoints((i === 0 ? 4 * 2 : 5 * 2)));
    }

    // Complete the polygon
    linePoints.push(new Phaser.Geom.Line(layer1.points[0].x, layer1.points[0].y, layer1.points[layer1.points.length - 1].x, layer1.points[layer1.points.length - 1].y).getPoints(4 * 2));
    layer1Graphic.closePath();
    layer1Graphic.strokePath();

    points = [
      new Phaser.Geom.Point(325, 150),
      new Phaser.Geom.Point(58, 750),
      new Phaser.Geom.Point(590, 750),
    ];

    layer1Graphic.strokePoints(points, true);
    var centroid = Phaser.Geom.Point.GetCentroid(points);
    layer1Graphic.fillPointShape(centroid, 10);

    // Merge the points into one big array
    points = points.concat(...linePoints);

    // console.log(points);

    // Create player locations
    this.player = {};
    this.player.locationPoints = [];
    this.score = 0;
    this.lives = 5;
    this.bird = this.add.sprite(points[points.length - 1].x, points[points.length - 1].y, 'bird');
    this.centroid = centroid;
    this.enemyPoints = [];

    // Draw the lines from the polygon points to the centroid, to create the 'vanishing point' effect.
    layer1Graphic.beginPath();
    layer1Graphic.lineBetween(points[points.length - 1].x, points[points.length - 1].y, centroid.x, centroid.y);
    for (let i = 0; i < points.length; i++) {
      if (i % 2 !== 0) {
        layer1Graphic.lineStyle(0.5, 0x0ff00);
        layer1Graphic.lineBetween(points[i].x, points[i].y, centroid.x, centroid.y);

      } else {
        if (this.debugMode) {
          layer1Graphic.lineStyle(0.8, 0x000ff);
          layer1Graphic.lineBetween(points[i].x, points[i].y, centroid.x, centroid.y);
        }

        this.player.locationPoints.push(points[i]);
        this.enemyPoints.push(points[i]);
      }
    }
    layer1Graphic.closePath();
    layer1Graphic.strokePath();
    this.smallTriangle = this.add.sprite(325, 550, 'small_triangle');

    // Initial bird positioning and angle
    this.bird.x = this.player.locationPoints[2].x;
    this.bird.y = this.player.locationPoints[2].y;
    this.bird.setAngle(Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bird.x, this.bird.y, this.centroid.x, this.centroid.y));

    // Text on screen
    this.debugDisplay = this.add.text(10, 10, "", {
      fontFamily: 'Tempest',
      fill: '#00ff00'
    });

    this.scoreDisplay = this.add.text(10, 10, "", {
      fontFamily: 'Tempest',
      fill: '#00ff00'
    });

    // System things
    this.gameState = 0;
    this.canMove = false;

    // counter for main loop to slow things down
    this.counter = 0;

    this.speed = Phaser.Math.GetSpeed(400, 1);
    this.crabArray = [];

    this.bullets = new Bullets(this);
    this.crabs = new Crabs(this);

    // console.log({
    //   bullets: this.bullets,
    //   crabs: this.crabs
    // });

    // Centroid zone for bullet removal
    this.zone = this.add.zone(this.centroid.x, this.centroid.y).setSize(35, 35);
    this.physics.world.enable(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;

    window.zone = this.zone;
  }

  update() {
    var pointer = this.input.activePointer;
    this.counter++;

    if (this.counter === 1) {
      // Jump around to the different positions by cycling through the points array

      if (this.input.keyboard.addKey('S').isDown || this.input.keyboard.addKey('D').isDown) {
        this.playerPosIndex = this.playerPosIndex + 1;

        if (this.playerPosIndex >= this.player.locationPoints.length) {
          this.playerPosIndex = 0;
        }
        this.bird.x = this.player.locationPoints[this.playerPosIndex].x;
        this.bird.y = this.player.locationPoints[this.playerPosIndex].y;

        this.sound.play('blaster_move');
      }

      if (this.input.keyboard.addKey('W').isDown || this.input.keyboard.addKey('S').isDown) {
        this.playerPosIndex = this.playerPosIndex - 1;

        if (this.playerPosIndex <= 0) {
          this.playerPosIndex = this.player.locationPoints.length - 1;
        }
        this.bird.x = this.player.locationPoints[this.playerPosIndex].x;
        this.bird.y = this.player.locationPoints[this.playerPosIndex].y;

        this.sound.play('blaster_move');
      }

      // Angle the player sprite so it's facing the center
      this.bird.setAngle(Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bird.x, this.bird.y, this.centroid.x, this.centroid.y));
    }


    // This will only display if this.debugMode is true
    if (this.debugMode) {
      this.debugDisplay.setText([
        'x: ' + pointer.x,
        'y: ' + pointer.y,

        'player-x: ' + this.player.locationPoints[this.playerPosIndex].x,
        'player-y: ' + this.player.locationPoints[this.playerPosIndex].y,

        'points-index: ' + this.playerPosIndex
      ]);
    }

    // Reset delay counter
    if (this.counter >= 10) {
      this.counter = 0;
      let rand = Math.floor(Math.random() * 100);

      // Spawn Crab
      if (rand < 3) {
        let randomPoint = this.enemyPoints[Math.floor((Math.random() * this.enemyPoints.length))];
        let crab = this.crabs.spawnCrab(randomPoint.x, randomPoint.y, Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.centroid.x, this.centroid.y, randomPoint.x, randomPoint.y), this.centroid.x, this.centroid.y);
      }

      // Shooting
      if (this.input.keyboard.addKey('Q').isDown) {
        this.bullets.fireBullet(this.bird.x, this.bird.y, Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.centroid.x, this.centroid.y, this.bird.x, this.bird.y), this.centroid.x, this.centroid.y);
      }

      // console.log(this.zone.body.touching.none);
    }

  }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'egg');
  }

  fire(x, y, angle, cx, cy) {
    this.body.reset(x, y);

    let centroid = new Phaser.Geom.Point(cx, cy);
    this.setAngle(angle);
    this.scene.physics.moveToObject(this, centroid, 350);

    this.setActive(true);
    this.setVisible(true);
    // this.setVelocityY(-500);

    this.scene.physics.add.overlap(this, window.zone);
    this.scene.sound.play('blaster_bullet');
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= -16) {
      this.setActive(false);
      this.setVisible(false);
    }

    if (!window.zone.body.touching.none) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

// class Bullets extends Phaser.Physics.Arcade.Group {
class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 100,
      key: 'egg',
      active: false,
      visible: false,
      classType: Bullet
    });
  }

  fireBullet(x, y, angle, cx, cy) {
    let bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y, angle, cx, cy);
    }
  }
}

class Crab extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, cx, cy) {
    super(scene, x, y, 'crab', cx, cy);
  }

  spawn(x, y, angle, cx, cy) {
    this.body.reset(cx, cy);
    this.setScale(0.1);

    this.setActive(true);
    this.setVisible(true);
    this.setAngle(angle);

    let target = new Phaser.Geom.Point(x, y);
    this.scene.physics.moveToObject(this, target, 75);

    this.timeAlive = 0;

    console.log(this.zone);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.timeAlive++;

    if (this.timeAlive >= 2000) {
      this.setActive(false);
      this.setVisible(false);
      console.log("Destroy crab. FUCK YOU DARKMAGE YA CUNT.");
    }

    if (this.scale < 1) {
      this.setScale(0.008 * this.timeAlive);
    }

  }
}

class Crabs extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 50,
      key: 'crab',
      active: false,
      visible: false,
      classType: Crab
    });
  }

  spawnCrab(x, y, angle, cx, cy) {
    let crab = this.getFirstDead(false);

    if (crab) {
      crab.spawn(x, y, angle, cx, cy);
    }
  }
}