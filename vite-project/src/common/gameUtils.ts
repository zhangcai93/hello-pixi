import { utils, BaseTexture, Spritesheet } from 'pixi.js';

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const eventEmitter = new utils.EventEmitter();

export function getLocalJsonTexture(json: any, png: any) {
    const baseTexture = BaseTexture.from(png);
    const spritesheet = new Spritesheet(baseTexture, json);

    let textures = {}
    spritesheet.parse(() => {
        textures = spritesheet.textures
    })
    return textures;
}
