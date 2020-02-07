import 'phaser';
import * as WebFont from 'webfontloader';

import TitleScene from './scenes/title_scene';
import PlayScene from './scenes/play_scene';
import ResultScene from './scenes/result_scene';
import BackgroundScene from './scenes/background_scene';

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
      debug: false,
    },
  },
  scene: [BackgroundScene, TitleScene, PlayScene, ResultScene],
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
  custom: {
    families: ['MisakiGothic2nd'],
    urls: ['/assets/fonts.css'],
  },
  active: () => {
    new Game(config);
  },
});
