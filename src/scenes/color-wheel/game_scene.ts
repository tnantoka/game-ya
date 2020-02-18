export default class GameScene extends Phaser.Scene {
  static colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
  get colors(): number[] {
    return GameScene.colors;
  }
  get wheelRadius(): number {
    return 60;
  }
  get angleStep(): number {
    return 360 / this.colors.length;
  }

  colorGraphics: Phaser.GameObjects.Graphics[];
  isPointerDown = false;
  color: number;
  ball: Phaser.GameObjects.Graphics;
  rotation = 0;
  score = 0;
  label: Phaser.GameObjects.Text;
  isPlaying = true;
  container: Phaser.GameObjects.Container;

  create(): void {
    this.label = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 50,
      '0'
    );
    this.label.setOrigin(0.5, 0.5);
    this.label.setFill('#ffffff');
    this.label.setFontSize(50);

    this.container = this.add.container(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 100
    );
    this.colorGraphics = this.colors.map((color, i) => {
      const graphics = this.add.graphics({
        x: 0,
        y: 0,
      });
      const startAngle = Phaser.Math.DegToRad(i * this.angleStep);
      const endAngle = Phaser.Math.DegToRad((i + 1) * this.angleStep);
      graphics.slice(0, 0, this.wheelRadius, startAngle, endAngle);
      graphics.fillStyle(color);
      graphics.fillPath();
      this.container.add(graphics);

      this.physics.add.existing(graphics);
      const body = graphics.body as Phaser.Physics.Arcade.Body;
      body.allowGravity = false;
      body.setSize(this.wheelRadius * 0.25, this.wheelRadius * 0.25);

      return graphics;
    });
    this.setColorBodyOffets();

    this.input.on('pointerdown', pointer => {
      if (this.isPlaying) {
        if (pointer.x < this.cameras.main.centerX) {
          this.rotation =
            this.container.rotation -
            (Phaser.Math.DegToRad(this.angleStep) % 360);
        } else if (pointer.x > this.cameras.main.centerX) {
          this.rotation =
            this.container.rotation +
            (Phaser.Math.DegToRad(this.angleStep) % 360);
        }
        this.tweens.add({
          targets: this.container,
          rotation: this.rotation,
          ease: 'Linear',
          duration: 100,
          repeat: 0,
          onComplete: () => {
            this.setColorBodyOffets();
          },
        });
      } else {
        this.isPlaying = true;
        this.label.text = '0';
        this.label.updateText();
        this.score = 0;
        this.addBallWithDelay(1);
      }
    });

    this.addBallWithDelay(2);
  }

  setColorBodyOffets(): void {
    this.colorGraphics.forEach((color, i) => {
      const body = color.body as Phaser.Physics.Arcade.Body;
      const angle = Phaser.Math.DegToRad((i + 0.5) * this.angleStep);
      body.setOffset(
        this.wheelRadius * -0.125 +
          this.wheelRadius * 0.5 * Math.cos(angle + this.rotation),
        this.wheelRadius * -0.125 +
          this.wheelRadius * 0.5 * Math.sin(angle + this.rotation)
      );
    });
  }

  update(): void {
    this.isPointerDown = this.input.activePointer.isDown;

    if (this.ball) {
      this.colorGraphics.forEach((color, i) => {
        if (this.physics.world.overlap(this.ball, color)) {
          this.ball.destroy();
          if (this.colors[i] === this.color) {
            this.addBallWithDelay(1);
            this.score++;
            this.label.text = this.score.toString();
          } else {
            this.label.text = `Score: ${this.score}`;
            this.isPlaying = false;
          }
          this.label.updateText();
        }
      });
    }
  }

  addBallWithDelay(delay): void {
    this.time.delayedCall(
      delay * 1000,
      () => {
        this.addBall();
      },
      null,
      null
    );
  }

  addBall(): void {
    this.color = Phaser.Math.RND.pick(this.colors);
    const radius = 20;
    this.ball = this.add.graphics({
      x: this.cameras.main.centerX,
      y: 0,
    });
    const circle = new Phaser.Geom.Circle(0, 0, radius);
    this.ball.fillStyle(this.color);
    this.ball.fillCircleShape(circle);
    this.physics.add.existing(this.ball);

    const body = this.ball.body as Phaser.Physics.Arcade.Body;
    body.setSize(radius * 2, radius * 2);
    body.setOffset(-radius, -radius);
  }
}
