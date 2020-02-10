export default class TitleScene extends Phaser.Scene {
  create(): void {
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 50,
      '一発屋'
    );
    title.setOrigin(0.5, 0.5);
    title.setFill('#ffffff');
    title.setFontFamily('"MisakiGothic2nd"');
    title.setFontSize(50);

    const start = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      'Start'
    );
    start.setOrigin(0.5, 0.5);
    start.setFill('#ffffff');
    start.setFontFamily('"Press Start 2P"');
    start.setFontSize(25);

    this.input.on('pointerdown', () => {
      this.scene.start('PlayScene');
    });

    const score = this.add.text(
      this.cameras.main.width - 10,
      10,
      `Score ${localStorage.getItem('highscore') || '0'}`
    );
    score.setOrigin(1, 0);
    score.setFill('#ffffff');
    score.setFontFamily('"Press Start 2P"');
    score.setFontSize(15);
  }
}
