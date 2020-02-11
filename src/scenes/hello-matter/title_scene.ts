export default class TitleScene extends Phaser.Scene {
  preload(): void {
    if (!this.textures.list['box']) {
      const texture = this.game.textures.createCanvas('box', 30, 30);
      texture.context.fillStyle = 'rgba(255, 255, 255, 1)';
      texture.context.fillRect(0, 0, texture.width, texture.height);
      texture.refresh();
    }
  }
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
      this.matter.add.sprite(pointer.x, pointer.y, 'box');
    });
  }
}
