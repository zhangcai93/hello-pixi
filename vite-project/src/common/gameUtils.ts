import { utils } from 'pixi.js';

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const eventEmitter = new utils.EventEmitter()
