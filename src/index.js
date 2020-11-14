import 'phaser';
import {
  MainGame
} from './scenes/main-game';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    }
  },
  scene: MainGame
};

new Phaser.Game(gameConfig);