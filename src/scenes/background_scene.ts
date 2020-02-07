export default class BackgroundScene extends Phaser.Scene {
  private stars: Phaser.GameObjects.Shape[] = [];
  private elapsedTime = 0;
  private elapsedSeconds = 0;

  constructor() {
    super({
      key: 'Background',
    });
  }

  create(): void {
    this.addStars();
    this.scene.launch('Title');
  }

  update(time, delta): void {
    this.elapsedTime += delta;
    const newSeconds = Math.floor(this.elapsedTime / 1000);

    if (newSeconds !== this.elapsedSeconds) {
      this.addStars();
    }

    this.elapsedSeconds = newSeconds;

    this.stars.forEach(star => {
      if (star.x < 0) {
        star.destroy();
      }
    });
  }

  addStars(): void {
    for (let i = 0; i < 5; i++) {
      this.addStar();
    }
  }

  addStar(): void {
    const radius = Phaser.Math.Between(1, 3);
    const graphics = this.add.graphics({
      x: Phaser.Math.Between(0, this.cameras.main.width),
      y: -Phaser.Math.Between(radius, radius * 2),
    });
    const circle = new Phaser.Geom.Circle(0, 0, radius);
    graphics.fillStyle(0xffffff);
    graphics.fillCircleShape(circle);
    graphics.alpha = Phaser.Math.Between(0.3, 1.0);

    this.physics.add.existing(graphics);
    const body: any = graphics.body; // eslint-disable-line @typescript-eslint/no-explicit-any
    body.allowGravity = false;
    body.setVelocityY(Phaser.Math.Between(50, 100));
  }
}
