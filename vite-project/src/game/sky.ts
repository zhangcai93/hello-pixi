import { TilingSprite, Texture } from 'pixi.js';

export default class Sky extends TilingSprite {
    constructor(texture: Texture, width?: number, height?: number) {
        super(texture, width, height)
        this.position.x = 0;
        this.position.y = 0;
        this.tilePosition.x = 0;
        this.tilePosition.y = 0;
    }

    update(vx = 0, vy = 0) {
        this.tilePosition.x += vx;
        this.tilePosition.y += vy;
    }
}
