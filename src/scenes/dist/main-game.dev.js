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
      this.load.image('bird', 'assets/bird.png');
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
      var layer1 = new Phaser.Geom.Polygon([325, 150, 108, 650, 550, 650]);
      var linePoints = [];
      layer1Graphic.lineStyle(0.5, 0x00aa00);
      layer1Graphic.beginPath(); // layer1Graphic.moveTo(layer1.points[0].x, layer1.points[0].y);

      var points = []; // This works out the points for the triangle
      // There are main points that draw a triangle
      // Then hidden ones which determine the enemies movement and play positions

      for (var i = 0; i < layer1.points.length - 1; i++) {
        layer1Graphic.lineTo(layer1.points[i].x, layer1.points[i].y);
        linePoints.push(new Phaser.Geom.Line(layer1.points[i].x, layer1.points[i].y, layer1.points[i + 1].x, layer1.points[i + 1].y).getPoints(i === 0 ? 4 * 2 : 5 * 2));
      }

      linePoints.push(new Phaser.Geom.Line(layer1.points[0].x, layer1.points[0].y, layer1.points[layer1.points.length - 1].x, layer1.points[layer1.points.length - 1].y).getPoints(4 * 2));
      layer1Graphic.closePath();
      layer1Graphic.strokePath();
      this.debugDisplay = this.add.text(10, 10, 'Move the mouse', {
        fontFamily: 'Tempest',
        fill: '#00ff00'
      });
      points = [new Phaser.Geom.Point(325, 150), new Phaser.Geom.Point(108, 650), new Phaser.Geom.Point(550, 650)];
      layer1Graphic.strokePoints(points, true);
      var centroid = Phaser.Geom.Point.GetCentroid(points);
      layer1Graphic.fillPointShape(centroid, 10);
      points = (_points = points).concat.apply(_points, linePoints);
      console.log(points); // Create player locations

      this.player = {};
      this.player.locationPoints = [];
      this.enemyPoints = [];
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
      this.bird = this.add.sprite(layer1.points[layer1.points.length - 1].x, layer1.points[layer1.points.length - 1].y, 'bird');
      this.centroid = centroid;
    }
  }, {
    key: "update",
    value: function update() {
      var pointer = this.input.activePointer;

      if (this.input.keyboard.addKey('W').isDown) {
        // Jump around to the different positions by cycling through the points array
        if (this.playerPosIndex === this.player.locationPoints.length - 1) {
          this.playerPosIndex = 0;
        } else {
          this.playerPosIndex = this.playerPosIndex + 1;
          this.bird.x = this.player.locationPoints[this.playerPosIndex].x;
          this.bird.y = this.player.locationPoints[this.playerPosIndex].y;
        } // Angle the player sprite so it's facing the center


        var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bird.x, this.bird.y, this.centroid.x, this.centroid.y);
        this.bird.setAngle(angle);
        console.log('angle: ' + angle);
      }

      this.debugDisplay.setText(['x: ' + pointer.x, 'y: ' + pointer.y, 'prev-x: ' + this.xCheck, 'prev-y: ' + this.yCheck, 'player-x: ' + this.player.locationPoints[this.playerPosIndex].x, 'player-y: ' + this.player.locationPoints[this.playerPosIndex].y, 'mid x: ' + pointer.midPoint.x, 'mid y: ' + pointer.midPoint.y]);
    }
  }]);

  return MainGame;
}(Phaser.Scene);

exports.MainGame = MainGame;