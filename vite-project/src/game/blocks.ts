import { Container, Sprite, Texture } from 'pixi.js';
import { randomInt } from '@common/gameUtils'


// 柱子的数量
const numberOfPillars = 10;
// 每一个砖块的高度
const blockHeight = 64;
// 一个柱子最多可以有的砖块数(canvas画布高度为512)
const maxBlockNum = 512 / blockHeight;
// 柱子之间的间隔
const margin = 384

export default class Blocks extends Container {

    public finish: Sprite | undefined;

    constructor(textrue: Texture, finishTexture: Texture) {
        super()
        this.createBlocks(textrue);
        this.createFinishBlock(finishTexture)
    }

    private createBlocks(textrue: Texture) {
        let gapSize = 4;

        // 循环，形成numberOfPillars根柱子
        for (let i = 0; i < numberOfPillars; i++) {

            // 随机确定单个柱子每一个砖块的间隙
            let startGapNumber = randomInt(0, maxBlockNum - gapSize);

            // 每隔五根柱子就减少一个间隙 
            if (i > 0 && i % 5 === 0) gapSize -= 1;

            // 如果不在柱子的间隙内，就创建一个砖块放入柱子
            for (let j = 0; j < maxBlockNum; j++) {
                if (j < startGapNumber || j > startGapNumber + gapSize - 1) {
                    let block = new Sprite(textrue);

                    // 每根柱子之间间隔384像素，第一根柱子的x位置为512
                    block.x = i * margin + 512;
                    block.y = j * blockHeight;
                    this.addChild(block);
                }
            }
        }
    }

    private createFinishBlock(textrue: Texture) {
        const { x, width } = this.getBounds();
        this.finish = new Sprite(textrue);
        this.finish.x = x + width + margin;
        this.finish.y = 192;

        this.addChild(this.finish);
    }

    public move(x = 0) {
        this.x += x
    }
}