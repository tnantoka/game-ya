import * as player from './player.json';
import * as enemy from './enemy.json';
import * as fire from './fire.json';
import { Scene } from 'phaser';

export const addPixelGraphics = (
  scene: Scene,
  key: string,
  options: {
    x: number;
    y: number;
    size: number;
    length: number;
  }
): Phaser.GameObjects.Graphics => {
  const graphics = scene.add.graphics({
    x: options.x - options.size * 0.5,
    y: options.y - options.size * 0.5,
  });
  const data = {
    player,
    enemy,
    fire,
  }[key];
  const dotSize = options.size / options.length;
  for (let i = 0; i < data.length; i++) {
    const x = i % options.length;
    const y = Math.floor(i / options.length);
    const color = data[i];
    if (color) {
      graphics.fillStyle(parseInt(color.replace(/^#/, ''), 16));
      graphics.fillRect(x * dotSize, y * dotSize, dotSize, dotSize);
    }
  }
  return graphics;
};
