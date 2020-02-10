export default class TitleScene extends Phaser.Scene {
  create(): void {
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Hello'
    );
    title.setOrigin(0.5, 0.5);
    title.setFill('#ffffff');
    title.setFontFamily("'Press Start 2P'");
    title.setFontSize(50);
  }
}
