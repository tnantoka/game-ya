export default class GameScene extends Phaser.Scene {
  isPlaying = false;
  isDownLeft = false;
  isDownRight = false;

  paddle: Phaser.GameObjects.Rectangle;
  ball: Phaser.GameObjects.Graphics;
  blocks: Phaser.GameObjects.Rectangle[];
  leftArrow: Phaser.GameObjects.Text;
  rightArrow: Phaser.GameObjects.Text;
  speed = 2;

  create(): void {
    this.input.on('pointerdown', () => {
      if (this.isPlaying) {
        return;
      }
      this.isPlaying = true;
      this.addBall();
    });

    this.leftArrow = this.add.text(
      this.cameras.main.centerX - 8,
      this.cameras.main.height - 8,
      '←'
    );
    this.leftArrow.setOrigin(1.0, 1.0);
    this.leftArrow.setFontFamily('"MisakiGothic2nd"');
    this.leftArrow.setFill('white');
    this.leftArrow.setFontSize(40);
    this.leftArrow
      .setInteractive()
      .on('pointerdown', () => (this.isDownLeft = true))
      .on('pointerout', () => (this.isDownLeft = false))
      .on('pointerup', () => (this.isDownLeft = false));

    this.rightArrow = this.add.text(
      this.cameras.main.centerX + 8,
      this.cameras.main.height - 8,
      '→'
    );
    this.rightArrow.setOrigin(0.0, 1.0);
    this.rightArrow.setFontFamily('"MisakiGothic2nd"');
    this.rightArrow.setFill('white');
    this.rightArrow.setFontSize(40);
    this.rightArrow
      .setInteractive()
      .on('pointerdown', () => (this.isDownRight = true))
      .on('pointerout', () => (this.isDownRight = false))
      .on('pointerup', () => (this.isDownRight = false));

    this.paddle = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.height - 60,
      80,
      10,
      0xffffff
    );
    this.physics.add.existing(this.paddle, true);

    this.addBlocks();
  }

  update(): void {
    const body = this.paddle.body as Phaser.Physics.Arcade.Body;
    if (this.isDownLeft) {
      this.paddle.x -= this.speed;
      body.position.x -= this.speed;
      this.leftArrow.alpha = 0.8;
    } else if (this.isDownRight) {
      this.paddle.x += this.speed;
      body.position.x += this.speed;
      this.rightArrow.alpha = 0.8;
    } else {
      this.leftArrow.alpha = 0.5;
      this.rightArrow.alpha = 0.5;
    }

    if (this.isPlaying && this.ball.y > this.cameras.main.height - 10) {
      this.isPlaying = false;
      this.ball.destroy();
    }
  }

  addBall(): void {
    const radius = 5;
    this.ball = this.add.graphics({
      x: this.paddle.x,
      y: this.paddle.y - 10,
    });
    const circle = new Phaser.Geom.Circle(0, 0, radius);
    this.ball.fillStyle(0xffffff);
    this.ball.fillCircleShape(circle);
    this.physics.add.existing(this.ball);

    const body = this.ball.body as Phaser.Physics.Arcade.Body;
    body.setSize(radius * 2, radius * 2);
    body.setOffset(-radius, -radius);
    body.setCollideWorldBounds(true);
    body.setAllowGravity(false);
    body.setBounce(1, 1);

    this.physics.add.collider(this.ball, this.paddle);

    this.blocks.forEach(block => {
      this.physics.add.collider(this.ball, block, (object1, object2) => {
        [object1, object2].forEach(object => {
          const life = object.getData('life');
          if (life !== undefined) {
            if (life > 1) {
              object.setData('life', life - 1);
              (object as Phaser.GameObjects.Rectangle).alpha -= 0.2;
            } else {
              object.destroy();
            }
          }
        });
      });
    });

    body.setVelocity(100, -200);
  }

  addBlocks(): void {
    const width = 30;
    const height = 10;
    const margin = 16;
    const rows = 5;
    const cols = 6;
    const baseX =
      (this.cameras.main.width + margin - (width + margin) * cols) * 0.5;
    this.blocks = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const block = this.add.rectangle(
          baseX + j * (width + margin),
          margin + i * (height + margin),
          width,
          height,
          0xffffff
        );
        block.setOrigin(0, 0);
        block.setData('life', 3);
        this.physics.add.existing(block, true);
        this.blocks.push(block);
      }
    }
  }
}
