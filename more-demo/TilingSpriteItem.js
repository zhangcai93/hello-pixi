class TilingSpriteItem extends PIXI.TilingSprite {

    constructor(texturePath, width, height) {
        const texture = PIXI.Texture.from(texturePath);
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