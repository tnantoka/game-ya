export default class TitleScene extends Phaser.Scene {
  create(): void {
    this.input.on('pointerdown', pointer => {
      const isobox = this.add.isobox(pointer.x, pointer.y, 50);

      this.matter.world.setBounds();

      this.matter.add.gameObject(isobox, {
        shape: { type: 'rectangle', width: 50, height: 32 },
        render: { sprite: { xOffset: 0.5 } },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Phaser as any).Physics.Matter.Matter.Body.setInertia(
        isobox.body,
        Infinity
      );
    });
  }
}
