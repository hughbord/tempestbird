import 'phaser';
import { MainGame } from './scenes/main-game';

const gameConfig = {  
  width: 1000,
  height: 800,
  scene: [MainGame]
};

new Phaser.Game(gameConfig);

