export default class TitleScene extends Phaser.Scene {
  create(): void {
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Matter'
    );
    title.setOrigin(0.5, 0.5);
    title.setFill('#ffffff');
    title.setFontFamily("'Press Start 2P'");
    title.setFontSize(50);

    this.matter.world.setBounds();

    this.input.on('pointerdown', pointer => {
      const length = 30;
      const graphics = this.add.graphics({
        x: pointer.x,
        y: pointer.y,
      });
      graphics.fillStyle(0xffffff);
      graphics.fillRect(length * -0.5, length * -0.5, length, length);

      const body = this.matter.add.rectangle(
        graphics.x,
        graphics.y,
        length,
        length,
        {}
      );
      this.matter.add.gameObject(graphics, body);
    });
  }
}
