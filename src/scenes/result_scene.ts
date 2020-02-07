export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Result',
    });
  }

  create(): void {
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Game Over'
    );
    title.setOrigin(0.5, 0.5);
    title.setFill('#ffffff');
    title.setFontFamily('"Press Start 2P"');
    title.setFontSize(this.cameras.main.width * 0.1);

    this.input.on('pointerdown', () => {
      console.log('piyo');
      this.scene.start('Play');
    });
  }
}
