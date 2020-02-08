import 'phaser';
import * as WebFont from 'webfontloader';

import IppatsuYa from './scenes/ippatsu-ya';
import Hello from './scenes/hello';

const scene = { 'ippatsu-ya': IppatsuYa }[location.search.slice(1)] || Hello;

const config: Phaser.Types.Core.GameConfig = {
  width: 320,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene,
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
