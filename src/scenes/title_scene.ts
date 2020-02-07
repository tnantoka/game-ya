export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Title',
    });
  }

  create(): void {
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - this.cameras.main.height * 0.1,
      '一発屋'
    );
    title.setOrigin(0.5, 0.5);
    title.setFill('#ffffff');
    title.setFontFamily('"MisakiGothic2nd"');
    title.setFontSize(this.cameras.main.width * 0.175);

    const start = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.height * 0.1,
      'Start'
    );
    start.setOrigin(0.5, 0.5);
    start.setFill('#ffffff');
    start.setFontFamily('"Press Start 2P"');
    start.setFontSize(this.cameras.main.width * 0.075);

    this.input.on('pointerdown', () => {
      this.scene.start('Play');
    });

    const score = this.add.text(
      this.cameras.main.width * 0.99,
      this.cameras.main.height * 0.01,
      `Score ${localStorage.getItem('highscore') || '0'}`
    );
    score.setOrigin(1, 0);
    score.setFill('#ffffff');
    score.setFontFamily('"Press Start 2P"');
    score.setFontSize(this.cameras.main.width * 0.05);
  }
}
