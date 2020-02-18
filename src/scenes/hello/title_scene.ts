export default class TitleScene extends Phaser.Scene {
  create(): void {
    const title = this.add.text(this.cameras.main.centerX, 60, 'Hello');
    title.setOrigin(0.5, 0.5);
    title.setFill('#ffffff');
    title.setFontFamily("'Press Start 2P'");
    title.setFontSize(50);

    [
      'ippatsu-ya',
      'color-wheel',
      'hello-matter',
      'color-wheel-matter',
      'hello-isobox',
    ].forEach((game, i) => {
      const menu = this.add.text(this.cameras.main.centerX, 120 + i * 40, game);
      menu.setOrigin(0.5, 0.5);
      menu.setFill('#ffffff');
      menu.setFontFamily("'Press Start 2P'");
      menu.setFontSize(15);

      menu.setInteractive().on('pointerdown', () => {
        const debug = location.search.includes('debug=true');
        location.href = `/?scene=${game}&debug=${debug}`;
      });
    });
  }
}
