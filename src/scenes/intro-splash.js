import 'phaser';

export class IntroSplash extends Phaser.Scene {
  preload() {
    
  }

  create() {
    var layer1Graphic = this.add.graphics({
      x: 0,
      y: 0
    });


    var layer1 = new Phaser.Geom.Polygon([
      325, 150,
      108, 650,
      550, 650
    ]);

    var linePoints = [];

    layer1Graphic.lineStyle(0.5, 0x00aa00);
    layer1Graphic.beginPath();
    layer1Graphic.moveTo(layer1.points[0].x, layer1.points[0].y);

    // layer1Graphic.moveTo(300, 400);

    var points = [];

    for (let i = 0; i < layer1.points.length-1; i++) {
      layer1Graphic.lineTo(layer1.points[i].x, layer1.points[i].y);
      linePoints.push(new Phaser.Geom.Line(layer1.points[i].x, layer1.points[i].y, layer1.points[i+1].x, layer1.points[i+1].y).getPoints( (i === 0 ? 4 : 5) ) );
    }
    
    linePoints.push(new Phaser.Geom.Line(layer1.points[0].x, layer1.points[0].y, layer1.points[ layer1.points.length-1 ].x, layer1.points[ layer1.points.length-1 ].y).getPoints(4));   
    layer1Graphic.closePath();
    layer1Graphic.strokePath();


  // Text and points

    this.text = this.add.text(10, 10, 'Move the mouse', {
      font: '16px Courier',
      fill: '#00ff00'
    });

    points = [
      new Phaser.Geom.Point(325, 150),
      new Phaser.Geom.Point(108, 650),
      new Phaser.Geom.Point(550, 650),
    ];

    layer1Graphic.strokePoints(points, true);
   
    var centroid = Phaser.Geom.Point.GetCentroid(points);

    layer1Graphic.fillPointShape(centroid, 10);

    layer1Graphic.lineStyle(0.5, 0x00aa00);
    points = points.concat(...linePoints);

    console.log(points);

    for (let i = 0; i < points.length; i++) {
        layer1Graphic.lineBetween(points[i].x, points[i].y, centroid.x, centroid.y); 
    }


      var layer2Graphic = this.add.graphics({
        x: centroid.x,
        y: centroid.y
      });

    var layer2 = new Phaser.Geom.Polygon([
      (325 / 3), (150 / 3),
      (108 / 3), (650 / 3),
      (550 / 3), (650 / 3)
    ]);

    layer2Graphic.lineStyle(0.5, 0x00aa00);
    layer2Graphic.beginPath();
    layer2Graphic.moveTo(centroid.x, centroid.y);

    for (let i = 0; i < layer2.points.length - 1; i++) {
      layer2Graphic.lineTo(layer2.points[i].x, layer2.points[i].y);
    }

    layer2Graphic.closePath();
    layer2Graphic.strokePath();
  }

  update() {
    // if (this.cursors.left.isDown) {
    //   triangle.x -= 5;
    // } else if (this.cursors.right.isDown) {
    //   triangle.x += 5;
    // }

    // if (this.cursors.up.isDown) {
    //   triangle.y -= 5;
    // } else if (this.cursors.down.isDown) {
    //   triangle.y += 5;
    // }

    // var dist = Phaser.Math.Distance.Between(player.x, player.y, ufo.x, ufo.y);

    var pointer = this.input.activePointer;

    this.text.setText([
      'x: ' + pointer.x,
      'y: ' + pointer.y,
      'mid x: ' + pointer.midPoint.x,
      'mid y: ' + pointer.midPoint.y,
      // 'velocity x: ' + pointer.velocity.x,
      // 'velocity y: ' + pointer.velocity.y,
      // 'movementX: ' + pointer.movementX,
      // 'movementY: ' + pointer.movementY
    ]);
  }
}