import { addPixelGraphics } from './pixel_graphics';

export default class PlayScene extends Phaser.Scene {
  private isReady = false;
  private fire: Phaser.GameObjects.Graphics;
  private fireBody: Phaser.Physics.Arcade.Body;
  private enemy: Phaser.GameObjects.Graphics;
  private enemyBody: Phaser.Physics.Arcade.Body;
  private wave = 0;
  private score: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Play',
    });
  }

  get fireSize(): number {
    return 40;
  }

  preload(): void {
    if (!this.textures.list['explosion']) {
      const texture = this.game.textures.createCanvas('explosion', 30, 30);
      texture.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
      texture.context.fillRect(0, 0, texture.width, texture.height);
      texture.refresh();
    }
    if (!this.textures.list['jet']) {
      const texture = this.game.textures.createCanvas('jet', 15, 15);
      texture.context.fillStyle = 'rgba(255, 150, 0, 0.5)';
      texture.context.fillRect(0, 0, texture.width, texture.height);
      texture.refresh();
    }
    this.fire = null;
    this.fireBody = null;
    this.enemy = null;
    this.enemyBody = null;
    this.wave = 0;
  }

  create(): void {
    const playerSize = 65;
    const player = addPixelGraphics(this, 'player', {
      x: this.cameras.main.centerX,
      y: 0,
      size: playerSize,
      length: 16,
    });
    player.setDepth(1);
    const particles = this.add.particles('jet');
    const emitter = particles.createEmitter({
      x: -this.cameras.main.centerX,
      y: -this.cameras.main.centerY,
      speed: 30,
      scale: { start: 1, end: 0 },
      visible: false,
    });

    this.tweens.add({
      targets: player,
      y: {
        from: this.cameras.main.height + playerSize,
        to: this.cameras.main.height - 10 - playerSize,
      },
      ease: 'Linear',
      duration: 1000,
      repeat: 0,
      onComplete: () => {
        this.start();
      },
      onStart: () => {
        emitter.startFollow(
          player,
          this.cameras.main.centerX + playerSize * 0.5,
          this.cameras.main.centerY + playerSize * 0.9
        );
        emitter.visible = true;
      },
    });

    this.input.on('pointerdown', () => {
      if (this.isReady && !this.fire) {
        this.fire = addPixelGraphics(this, 'fire', {
          x: this.cameras.main.centerX,
          y: this.cameras.main.height - this.fireSize,
          size: this.fireSize,
          length: 16,
        });
        this.physics.add.existing(this.fire);
        this.fireBody = this.fire.body as Phaser.Physics.Arcade.Body;
        this.fireBody.allowGravity = false;
        this.fireBody.setVelocityY(-500);
        this.fireBody.setSize(this.fireSize * 0.5, this.fireSize * 0.5);
        this.fireBody.setOffset(this.fireSize * 0.25, this.fireSize * 0.25);

        this.physics.add.overlap(this.fire, this.enemy, () => {
          this.enemy.destroy();
          this.fire.destroy();
          this.fire = null;
          this.isReady = false;

          const particles = this.add.particles('explosion');
          particles.createEmitter({
            x: this.enemyBody.center.x,
            y: this.enemyBody.center.y,
            speed: 100,
            scale: { start: 1, end: 0 },
            maxParticles: 30,
          });

          this.time.delayedCall(
            1000,
            () => {
              this.start();
            },
            null,
            null
          );
        });
      }
    });

    this.score = this.add.text(
      this.cameras.main.width - 10,
      10,
      `Score ${localStorage.getItem('highscore') || '0'}`
    );
    this.score.setOrigin(1, 0);
    this.score.setFill('#ffffff');
    this.score.setFontFamily('"Press Start 2P"');
    this.score.setFontSize(15);
  }

  start(): void {
    this.isReady = true;
    this.wave++;
    this.goNext();
  }

  update(): void {
    if (this.isReady && this.fire && this.fire.y < -this.fireSize) {
      this.fireBody.setVelocityY(0);
      this.isReady = false;
      this.scene.transition({
        target: 'Result',
        duration: 3000,
        data: { score: this.wave },
      });
    }
    this.score.setText(`wave ${this.wave}`);
    localStorage.setItem('highscore', this.wave.toString());
  }

  goNext(): void {
    const enemySize = 65;
    this.enemy = addPixelGraphics(this, 'enemy', {
      x: -enemySize,
      y: 150,
      size: enemySize,
      length: 16,
    });
    this.physics.add.existing(this.enemy);
    this.enemyBody = this.enemy.body as Phaser.Physics.Arcade.Body;
    this.enemyBody.allowGravity = false;
    this.enemyBody.setSize(enemySize * 0.5, enemySize * 0.5);
    this.enemyBody.setOffset(enemySize * 0.25, enemySize * 0.25);

    this.tweens.add({
      targets: this.enemy,
      x: {
        from: -enemySize,
        to: this.cameras.main.width,
      },
      ease: 'Linear',
      duration: 3000 - Math.min(2700, this.wave * 200),
      repeat: -1,
      yoyo: true,
    });
  }
}
