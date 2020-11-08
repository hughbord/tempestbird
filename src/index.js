import 'phaser';

import { IntroSplash } from './scenes/intro-splash'; // Intro splash
// import { MainMenu } from './scenes/main-menu'; // Main Menu
// import { MainGame } from './scenes/main-game'; // Actual Game

const gameConfig = {
  width: 680,
  height: 800,
  scene: [IntroSplash]
};

new Phaser.Game(gameConfig);

