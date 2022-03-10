import { AnimatedSprite, Texture, FrameObject } from 'pixi.js'

export default class Bee extends AnimatedSprite {
    private vy: number;

    constructor(textures: Texture[] | FrameObject[], autoUpdate?: boolean) {
        super(textures, autoUpdate)

        this.vy = 0;
        this.reset();
    }

    public autoFly() {
        this.vy -= 0.05;
        this.position.y -= this.vy;
    }

    public flyUp() {
        this.vy += 1.5;
    }

    public reset() {
        this.vy = 0;
        this.position.set(232, 32);
    }
}