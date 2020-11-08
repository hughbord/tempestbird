"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntroSplash = void 0;

require("phaser");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IntroSplash =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(IntroSplash, _Phaser$Scene);

  function IntroSplash() {
    _classCallCheck(this, IntroSplash);

    return _possibleConstructorReturn(this, _getPrototypeOf(IntroSplash).apply(this, arguments));
  }

  _createClass(IntroSplash, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _points;

      var layer1Graphic = this.add.graphics({
        x: 0,
        y: 0
      });
      var layer1 = new Phaser.Geom.Polygon([325, 150, 108, 650, 550, 650]);
      var linePoints = [];
      layer1Graphic.lineStyle(0.5, 0x00aa00);
      layer1Graphic.beginPath();
      layer1Graphic.moveTo(layer1.points[0].x, layer1.points[0].y); // layer1Graphic.moveTo(300, 400);

      var points = [];

      for (var i = 0; i < layer1.points.length - 1; i++) {
        layer1Graphic.lineTo(layer1.points[i].x, layer1.points[i].y);
        linePoints.push(new Phaser.Geom.Line(layer1.points[i].x, layer1.points[i].y, layer1.points[i + 1].x, layer1.points[i + 1].y).getPoints(i === 0 ? 4 : 5));
      }

      linePoints.push(new Phaser.Geom.Line(layer1.points[0].x, layer1.points[0].y, layer1.points[layer1.points.length - 1].x, layer1.points[layer1.points.length - 1].y).getPoints(4));
      layer1Graphic.closePath();
      layer1Graphic.strokePath(); // Text and points

      this.text = this.add.text(10, 10, 'Move the mouse', {
        font: '16px Courier',
        fill: '#00ff00'
      });
      points = [new Phaser.Geom.Point(325, 150), new Phaser.Geom.Point(108, 650), new Phaser.Geom.Point(550, 650)];
      layer1Graphic.strokePoints(points, true);
      var centroid = Phaser.Geom.Point.GetCentroid(points);
      layer1Graphic.fillPointShape(centroid, 10);
      layer1Graphic.lineStyle(0.5, 0x00aa00);
      points = (_points = points).concat.apply(_points, linePoints);
      console.log(points);

      for (var _i = 0; _i < points.length; _i++) {
        layer1Graphic.lineBetween(points[_i].x, points[_i].y, centroid.x, centroid.y);
      }

      var layer2Graphic = this.add.graphics({
        x: centroid.x,
        y: centroid.y
      });
      var layer2 = new Phaser.Geom.Polygon([325 / 3, 150 / 3, 108 / 3, 650 / 3, 550 / 3, 650 / 3]);
      layer2Graphic.lineStyle(0.5, 0x00aa00);
      layer2Graphic.beginPath();
      layer2Graphic.moveTo(centroid.x, centroid.y);

      for (var _i2 = 0; _i2 < layer2.points.length - 1; _i2++) {
        layer2Graphic.lineTo(layer2.points[_i2].x, layer2.points[_i2].y);
      }

      layer2Graphic.closePath();
      layer2Graphic.strokePath();
    }
  }, {
    key: "update",
    value: function update() {
      // if (this.cursors.left.isDown) {
      //   triangle.x -= 5;
      // } else if (this.cursors.right.isDown) {
      //   triangle.x += 5;
      // }
      // if (this.cursors.up.isDown) {
      //   triangle.y -= 5;
      // } else if (this.cursors.down.isDown) {
      //   triangle.y += 5;
      // }
      // var dist = Phaser.Math.Distance.Between(player.x, player.y, ufo.x, ufo.y);
      var pointer = this.input.activePointer;
      this.text.setText(['x: ' + pointer.x, 'y: ' + pointer.y, 'mid x: ' + pointer.midPoint.x, 'mid y: ' + pointer.midPoint.y // 'velocity x: ' + pointer.velocity.x,
      // 'velocity y: ' + pointer.velocity.y,
      // 'movementX: ' + pointer.movementX,
      // 'movementY: ' + pointer.movementY
      ]);
    }
  }]);

  return IntroSplash;
}(Phaser.Scene);

exports.IntroSplash = IntroSplash;