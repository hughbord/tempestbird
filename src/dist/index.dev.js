"use strict";

require("phaser");

var _introSplash = require("./scenes/intro-splash");

var _mainGame = require("./scenes/main-game");

// Intro splash
// Actual Game
var gameConfig = {
  width: 680,
  height: 800,
  scene: [_mainGame.MainGame, _introSplash.IntroSplash]
};
new Phaser.Game(gameConfig);