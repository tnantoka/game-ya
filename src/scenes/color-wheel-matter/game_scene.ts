import { throttle } from 'lodash';

export default class GameScene extends Phaser.Scene {
  static colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
  get colors(): number[] {
    return GameScene.colors;
  }
  get wheelRadius(): number {
    return 50;
  }
  get wheelCenter(): { x: number; y: number } {
    return {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY + 100,
    };
  }
  get angleStep(): number {
    return 360 / this.colors.length;
  }

  colorSprites: Phaser.Physics.Matter.Sprite[];
  isPointerDown = false;
  downPointer: { x: number; y: number };
  color: number;
  ball: Phaser.GameObjects.Graphics;
  rotation = 0;
  score = 0;
  label: Phaser.GameObjects.Text;
  isPlaying = true;
  prevRotation = 0;

  preload(): void {
    if (!this.textures.list['box-0']) {
      this.colors.forEach((color, i) => {
        const texture = this.game.textures.createCanvas(
          `box-${i}`,
          20,
          this.wheelRadius
        );
        texture.context.fillStyle = Phaser.Display.Color.ValueToColor(
          color
        ).rgba;
        texture.context.fillRect(0, 0, texture.width, texture.height);
        texture.refresh();
      });
    }
  }

  create(): void {
    this.label = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 50,
      '0'
    );
    this.label.setOrigin(0.5, 0.5);
    this.label.setFill('#ffffff');
    this.label.setFontSize(50);

    this.matter.world.setBounds();
    this.matter.world.setGravity(0, 0.05);

    this.colorSprites = this.colors.map((color, i) => {
      const sprite = this.matter.add.sprite(0, 0, `box-${i}`, null, {
        label: color,
        isStatic: true,
      });
      return sprite;
    });
    this.setColorBodyOffets();

    this.input.on('pointerdown', pointer => {
      if (this.isPlaying) {
        this.downPointer = { x: pointer.x, y: pointer.y };
      } else {
        this.isPlaying = true;
        this.label.text = '0';
        this.label.updateText();
        this.score = 0;
        this.addBallWithDelay(1);
      }
    });

    this.input.on('pointermove', pointer => {
      if (this.isPointerDown) {
        const downAngle = Phaser.Math.Angle.Between(
          this.wheelCenter.x,
          this.wheelCenter.y,
          this.downPointer.x,
          this.downPointer.y
        );
        const moveAngle = Phaser.Math.Angle.Between(
          this.wheelCenter.x,
          this.wheelCenter.y,
          pointer.x,
          pointer.y
        );
        this.rotation = moveAngle - downAngle;
        this.setColorBodyOffets();
      }
    });

    this.input.on('pointerup', () => {
      this.prevRotation += this.rotation;
    });

    this.addBallWithDelay(2);

    this.matter.world.on(
      'collisionstart',
      throttle((event, bodyA, bodyB) => {
        [bodyA, bodyB].forEach(body => {
          if (
            body.gameObject === this.ball ||
            body.label === 'Rectangle Body' ||
            !this.ball
          ) {
            return;
          }
          this.matter.world.remove(this.ball, false);
          this.ball.destroy();
          this.ball = null;
          if (body.label === this.color) {
            this.addBallWithDelay(1);
            this.score++;
            this.label.text = this.score.toString();
          } else {
            this.label.text = `Score: ${this.score}`;
            this.isPlaying = false;
          }
        });
      }, 300)
    );
  }

  setColorBodyOffets(): void {
    this.colorSprites.forEach((sprite, i) => {
      const angle =
        Phaser.Math.DegToRad(i * this.angleStep) +
        this.prevRotation +
        this.rotation;
      sprite.setPosition(
        this.wheelCenter.x + this.wheelRadius * Math.cos(angle),
        this.wheelCenter.y + this.wheelRadius * Math.sin(angle)
      );
      sprite.rotation = angle;
    });
  }

  update(): void {
    this.isPointerDown = this.input.activePointer.isDown;
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
    const graphics = this.add.graphics({
      x: this.cameras.main.centerX,
      y: 0,
    });
    graphics.fillStyle(this.color);
    graphics.fillCircle(0, 0, radius);

    const body = this.matter.add.circle(graphics.x, graphics.y, radius, {});
    this.matter.add.gameObject(graphics, body);

    this.ball = graphics;
  }
}
