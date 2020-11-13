import 'phaser';

import { IntroSplash } from './scenes/intro-splash'; // Intro splash
import { MainGame } from './scenes/main-game'; // Actual Game


const gameConfig = {
  
  width: 680,
  height: 800,
  scene: [MainGame, IntroSplash]
};

new Phaser.Game(gameConfig);

