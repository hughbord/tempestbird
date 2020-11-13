export class IntroSplash extends Phaser.Scene {
  constructor() {
      super({
        key: "splash"
      });
    }

  preload() {

  }

  create() {
    this.debugDisplay = this.add.text(10, 10, 'Move the mouse', {
      fontFamily: 'Tempest',
      fill: '#00ff00'
    });

  }

  update() {
    // this.splashText.setText([
    //   'Tempestbird 2020'
    // ]);
  }
}