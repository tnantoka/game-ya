import 'phaser';
import * as WebFont from 'webfontloader';
import * as queryString from 'query-string';

import Hello from './scenes/hello';
import IppatsuYa from './scenes/ippatsu-ya';
import ColorWheel from './scenes/color-wheel';

const qs = queryString.parse(location.search);

const scene =
  {
    'ippatsu-ya': IppatsuYa,
    'color-wheel': ColorWheel,
  }[qs.scene as string] || Hello;
const debug = qs.debug === 'true';

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
      debug,
    },
    matter: {
      gravity: { y: 1 },
      debug,
    },
  },
  // scene,
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
    // new Game(config);
    const game = new Game(config);
    [...scene].forEach(sceneClass => {
      game.scene.add(sceneClass.name, new sceneClass(config));
    });
    game.scene.start(scene[0].name);
  },
});
