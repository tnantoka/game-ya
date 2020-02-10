export default class ResultScene extends Phaser.Scene {
  private score: number;

  init(data): void {
    this.score = data.score;
  }

  create(): void {
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 50,
      'Game Over'
    );
    title.setOrigin(0.5, 0.5);
    title.setFill('#ffffff');
    title.setFontFamily('"Press Start 2P"');
    title.setFontSize(30);

    this.time.delayedCall(
      3000,
      () => {
        const score = this.add.text(
          this.cameras.main.centerX,
          this.cameras.main.centerY + 50,
          `Score ${this.score}`
        );
        score.setOrigin(0.5, 0.5);
        score.setFill('#ffffff');
        score.setFontFamily('"Press Start 2P"');
        score.setFontSize(25);
      },
      null,
      null
    );

    this.input.on('pointerdown', () => {
      this.scene.start('PlayScene');
    });
  }
}
