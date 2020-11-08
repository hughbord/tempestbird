export class MainMenu extends Phaser.Scene {
  preload() {
    // this.load.image('cokecan', 'assets/cokecan.png');
    this.load.image('cokecan', 'assets/cokecan.png');
  }

  create() {
    this.add.text(100, 100, 'TempestBird 2020 Menu', { fill: '#0f0' });
  }
}