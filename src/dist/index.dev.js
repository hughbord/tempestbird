"use strict";

require("phaser");

var _mainGame = require("./scenes/main-game");

var gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  physics: {
    "default": 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    }
  },
  scene: _mainGame.MainGame
};
new Phaser.Game(gameConfig);