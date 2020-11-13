"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainGame = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MainGame =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MainGame, _Phaser$Scene);

  function MainGame() {
    _classCallCheck(this, MainGame);

    return _possibleConstructorReturn(this, _getPrototypeOf(MainGame).call(this, {
      key: "main"
    }));
  }

  _createClass(MainGame, [{
    key: "preload",
    value: function preload() {
      // Nigga preload da sounds
      this.load.audio('blaster_bullet', 'assets/blasterBullet.ogg');
      this.load.audio('blaster_explosition', 'assets/blasterExplosion.ogg');
      this.load.audio('blaster_move', 'assets/blasterMove.ogg');
      this.load.audio('enemy_bullet', 'assets/enemyBullet.ogg');
      this.load.audio('enemy_explosion', 'assets/enemyExplosion.ogg'); // Nigga preload da bird n egg, shout outs to #egg

      this.load.image('bird', 'assets/bird.png');
      this.load.image('egg', 'assets/egg.png'); // Crab man never won a rap battle against jewbird

      this.load.image('crab', 'assets/crab.png'); // Cheaped out cuz I couldn't be bothered to draw a vector triangle lol

      this.load.image('small_triangle', 'assets/small_triangle.png');
    }
  }, {
    key: "create",
    value: function create() {
      var _points;

      this.debugMode = true;
      this.xCheck = 0;
      this.yCheck = 0;
      this.playerPosIndex = 0;
      var layer1Graphic = this.add.graphics({
        x: 0,
        y: 0
      });
      var layer1 = new Phaser.Geom.Polygon([325, 150, 58, 750, 590, 750]);
      var linePoints = [];
      var points = [];
      layer1Graphic.lineStyle(0.5, 0x00aa00);
      layer1Graphic.beginPath(); // This works out the points for the triangle
      // There are main points that draw a triangle
      // Then hidden ones which determine the enemies movement and play positions

      for (var i = 0; i < layer1.points.length - 1; i++) {
        layer1Graphic.lineTo(layer1.points[i].x, layer1.points[i].y);
        linePoints.push(new Phaser.Geom.Line(layer1.points[i].x, layer1.points[i].y, layer1.points[i + 1].x, layer1.points[i + 1].y).getPoints(i === 0 ? 4 * 2 : 5 * 2));
      } // Complete the polygon


      linePoints.push(new Phaser.Geom.Line(layer1.points[0].x, layer1.points[0].y, layer1.points[layer1.points.length - 1].x, layer1.points[layer1.points.length - 1].y).getPoints(4 * 2));
      layer1Graphic.closePath();
      layer1Graphic.strokePath();
      points = [new Phaser.Geom.Point(325, 150), new Phaser.Geom.Point(58, 750), new Phaser.Geom.Point(590, 750)];
      layer1Graphic.strokePoints(points, true);
      var centroid = Phaser.Geom.Point.GetCentroid(points);
      layer1Graphic.fillPointShape(centroid, 10); // Merge the points into one big array

      points = (_points = points).concat.apply(_points, linePoints); // console.log(points);
      // Create player locations

      this.player = {};
      this.player.locationPoints = [];
      this.score = 0;
      this.lives = 5;
      this.bird = this.add.sprite(points[points.length - 1].x, points[points.length - 1].y, 'bird');
      this.centroid = centroid;
      this.enemyPoints = []; // Draw the lines from the polygon points to the centroid, to create the 'vanishing point' effect.

      layer1Graphic.beginPath();
      layer1Graphic.lineBetween(points[points.length - 1].x, points[points.length - 1].y, centroid.x, centroid.y);

      for (var _i = 0; _i < points.length; _i++) {
        if (_i % 2 !== 0) {
          layer1Graphic.lineStyle(0.5, 0x0ff00);
          layer1Graphic.lineBetween(points[_i].x, points[_i].y, centroid.x, centroid.y);
        } else {
          if (this.debugMode) {
            layer1Graphic.lineStyle(0.8, 0x000ff);
            layer1Graphic.lineBetween(points[_i].x, points[_i].y, centroid.x, centroid.y);
          }

          this.player.locationPoints.push(points[_i]);
          this.enemyPoints.push(points[_i]);
        }
      }

      layer1Graphic.closePath();
      layer1Graphic.strokePath();
      this.smallTriangle = this.add.sprite(325, 550, 'small_triangle'); // Initial bird positioning and angle

      this.bird.x = this.player.locationPoints[2].x;
      this.bird.y = this.player.locationPoints[2].y;
      this.bird.setAngle(Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bird.x, this.bird.y, this.centroid.x, this.centroid.y)); // Text on screen

      this.debugDisplay = this.add.text(10, 10, "", {
        fontFamily: 'Tempest',
        fill: '#00ff00'
      });
      this.scoreDisplay = this.add.text(10, 10, "", {
        fontFamily: 'Tempest',
        fill: '#00ff00'
      }); // System things

      this.gameState = 0;
      this.canMove = false; // counter for main loop to slow things down

      this.counter = 0;
      this.bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: false
      });
      this.speed = Phaser.Math.GetSpeed(400, 1);
      this.eggs = [];
    }
  }, {
    key: "update",
    value: function update() {
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
        } // Angle the player sprite so it's facing the center


        this.bird.setAngle(Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bird.x, this.bird.y, this.centroid.x, this.centroid.y));
      } // Shooting


      if (this.input.keyboard.addKey('Q').isDown && this.counter === 2) {
        var bullet = this.bullets.get();

        if (bullet) {
          bullet.fire(this.bird.x, this.bird.y);
          bullet.setAngle(Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(bullet.x, bullet.y, this.centroid.x, this.centroid.y));
        }

        this.eggs.push(bullet);
        this.sound.play('blaster_bullet');
      }

      for (var i = 0; i < this.eggs.length; i++) {
        if (this.eggs[i]) {
          this.eggs[i].y -= 5;

          if (this.eggs[i].y < -20) {
            this.eggs[i].setActive(false);
            this.eggs[i].setVisible(false);
          }
        }
      } // This will only display if this.debugMode is true


      if (this.debugMode) {
        this.debugDisplay.setText(['x: ' + pointer.x, 'y: ' + pointer.y, 'prev-x: ' + this.xCheck, 'prev-y: ' + this.yCheck, 'player-x: ' + this.player.locationPoints[this.playerPosIndex].x, 'player-y: ' + this.player.locationPoints[this.playerPosIndex].y, 'mid x: ' + pointer.midPoint.x, 'mid y: ' + pointer.midPoint.y]);
      } // Reset delay counter


      if (this.counter >= 10) {
        this.counter = 0;
      }
    }
  }]);

  return MainGame;
}(Phaser.Scene);

exports.MainGame = MainGame;

var Bullet =
/*#__PURE__*/
function (_Phaser$GameObjects$S) {
  _inherits(Bullet, _Phaser$GameObjects$S);

  function Bullet(scene) {
    var _this;

    _classCallCheck(this, Bullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this, scene, 0, 0, 'egg'));
    scene.add.existing(_assertThisInitialized(_this));
    _this.speed = Phaser.Math.GetSpeed(400, 1);
    return _this;
  }

  _createClass(Bullet, [{
    key: "fire",
    value: function fire(x, y) {
      this.setPosition(x, y - 50);
      this.setActive(true);
      this.setVisible(true);
    }
  }, {
    key: "update",
    value: function update(delta) {
      this.y -= this.speed * delta;

      if (this.y < -50) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  }]);

  return Bullet;
}(Phaser.GameObjects.Sprite);