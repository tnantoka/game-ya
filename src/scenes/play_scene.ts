import { addPixelGraphics } from './pixel_graphics';

export default class PlayScene extends Phaser.Scene {
  private isReady = false;
  private fire: Phaser.GameObjects.Graphics;
  private fireBody: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private enemy: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: 'Play',
    });
  }

  create(): void {
    const playerSize = this.cameras.main.width * 0.2;
    const player = addPixelGraphics(this, 'player', {
      x: this.cameras.main.centerX,
      y: 0,
      size: playerSize,
      length: 16,
    });
    player.setDepth(1);

    this.tweens.add({
      targets: player,
      y: {
        from: this.cameras.main.height + playerSize,
        to: this.cameras.main.height - playerSize,
      },
      ease: 'Linear',
      duration: 1000,
      repeat: 0,
      onComplete: () => {
        this.isReady = true;
        this.goNext();
      },
    });

    this.input.on('pointerdown', () => {
      if (this.isReady && !this.fire) {
        const fireSize = this.cameras.main.width * 0.1;
        this.fire = addPixelGraphics(this, 'fire', {
          x: this.cameras.main.centerX,
          y: this.cameras.main.height - fireSize,
          size: fireSize,
          length: 16,
        });
        this.physics.add.existing(this.fire);
        this.fireBody = this.fire.body;
        this.fireBody.allowGravity = false;
        this.fireBody.setVelocityY(-500);
        this.fireBody.setSize(fireSize * 0.5, fireSize * 0.5);
        this.fireBody.setOffset(fireSize * 0.25, fireSize * 0.25);

        this.physics.add.overlap(this.fire, this.enemy, () => {
          console.log('hit');
        });
      }
    });
  }

  update(): void {
    if (this.isReady && this.fire && this.fire.y < 0) {
      this.fireBody.setVelocityY(0);
      this.isReady = false;
      console.log('game over');
    }
  }

  goNext(): void {
    const enemySize = this.cameras.main.width * 0.2;
    this.enemy = addPixelGraphics(this, 'enemy', {
      x: 0,
      y: this.cameras.main.height * 0.2,
      size: enemySize,
      length: 16,
    });
    this.physics.add.existing(this.enemy);
    const enemyBody: any = this.enemy.body; // eslint-disable-line @typescript-eslint/no-explicit-any
    enemyBody.allowGravity = false;
    enemyBody.setSize(enemySize * 0.5, enemySize * 0.5);
    enemyBody.setOffset(enemySize * 0.25, enemySize * 0.25);

    this.tweens.add({
      targets: this.enemy,
      x: {
        from: -enemySize,
        to: this.cameras.main.width,
      },
      ease: 'Linear',
      duration: 3000,
      repeat: -1,
      yoyo: true,
    });
  }
}
