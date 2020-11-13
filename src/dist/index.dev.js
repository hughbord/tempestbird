"use strict";

require("phaser");

var _mainGame = require("./scenes/main-game");

var gameConfig = {
  width: 1000,
  height: 800,
  scene: [_mainGame.MainGame]
};
new Phaser.Game(gameConfig);