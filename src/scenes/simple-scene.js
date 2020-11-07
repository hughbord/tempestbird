export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
  }

  create() {

    

    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    this.add.image(100, 200, 'cokecan');

    // graphics.strokeLineShape(line); // line: {x1, y1, x2, y2}
    // graphics.lineBetween(x1, y1, x2, y2);
    // graphics.lineTo(x, y);
    // graphics.moveTo(x, y);
  }
}