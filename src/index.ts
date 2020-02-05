import 'phaser';
import * as WebFont from 'webfontloader';

import TitleScene from './scenes/title_scene';
import PlayScene from './scenes/play_scene';

const config: Phaser.Types.Core.GameConfig = {
  width: 320,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [TitleScene, PlayScene],
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

WebFont.load({
  google: {
    families: ['Press Start 2P'],
  },
  fontactive: () => {
    new Game(config);
  },
});
