export default class TitleScene extends Phaser.Scene {
  private text1: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Title',
    });
  }

  create(): void {
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Start'
    );
    title.setOrigin(0.5, 0.5);
    title.setFill('#ffffff');
    title.setFontFamily('"Press Start 2P"');
    title.setFontSize(this.cameras.main.width * 0.1);

    this.input.on('pointerdown', () => {
      this.scene.start('Play');
    });
  }
}
