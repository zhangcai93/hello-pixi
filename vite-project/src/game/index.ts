import { Application, IApplicationOptions, Loader, InteractionEvent, utils } from 'pixi.js';
import * as Bump from 'pixi-plugin-bump/src/Bump';
import Sky from './sky';
import Bee from './bee';
import Blocks from './blocks'
import {eventEmitter} from '@common/gameUtils'

console.log('utils.EventEmitter=====', eventEmitter)

export default class Game {

    public app: Application;
    public loader: Loader;
    public textures: any | undefined;
    public sky: Sky | undefined;
    public bee: Bee | undefined;
    public blocks: Blocks | undefined;
    public bump: any;
    

    constructor(options: IApplicationOptions) {
        this.app = new Application(options);
        this.app.renderer.backgroundColor = 0xffccff;
        this.fiteToWindow(this.app.renderer.view);

        this.loader = new Loader();
        this.loadResource('src/assets/game.json');

        this.bump = new Bump();
    }

    public mounted(container: HTMLElement) {
        container.appendChild(this.app.renderer.view);
        this.handleEvent();
    }

    public reStart() {
        this.reset();
        this.gamePlay();
    }

    private reset() {
        this.bee!.reset();
        this.blocks!.x = 0;
    }

    private loadResource(name: string) {
        this.loader
            .add(name)
            .load((res) => {
                this.textures = this.loader.resources[name].textures;
                this.setup()
            });
    }

    private setup() {
        this.createSky();
        this.createBlocks();
        this.createBee();

        this.app.ticker.autoStart = false;
        this.app.ticker.add(this.gameLoop.bind(this));
        this.gamePlay();
    }

    private createBee() {
        const beeFrames = [0, 1, 2].map(item => this.textures[`bee-${item}.png`]);
        this.bee = new Bee(beeFrames);
        this.app.stage.addChild(this.bee);
        this.bee.play();
    }

    private createSky() {
        const sky = new Sky(this.textures["clouds.png"], this.app.renderer.width, this.app.renderer.height);
        this.sky = sky;
        this.app.stage.addChild(sky);
    }

    private createBlocks() {
        this.blocks = new Blocks(this.textures['block-green.png'], this.textures["finish.png"]);
        this.app.stage.addChild(this.blocks);
    }

    private gameLoop(delta: number) {
        this.sky?.update(-1);
        this.blocks?.move(-2);
        this.bee?.autoFly();

        this.checkBeeInCanvas();
        this.checkBeeVsBlocks();
    }

    private gamePlay() {
        this.app.ticker.start();
    }

    private gameStop() {
        this.app.ticker.stop();
    }

    private fiteToWindow(canvas: any) {
        let scaleX = window.innerWidth / canvas.width;
        let scaleY = window.innerHeight / canvas.height;

        let transformOriginX = '0';
        let transformOriginY = '0';
        if (scaleX > scaleY) {
            transformOriginX = '50%'
        } else {
            transformOriginY = '50%';
        }
        let scale = Math.min(scaleX, scaleY);
        
        
        canvas.style.transformOrigin = `${transformOriginX} ${transformOriginY}`
        canvas.style.transform = "scale(" + scale + ")";
        canvas.style.display = "block";
        canvas.style.position = "absolute";
    }


    // 碰撞检测: 蜜蜂在画布范围内
    private checkBeeInCanvas() {
        let pixieVsCanvas = this.bump.contain(this.bee, {
            x: 0,
            y: 0,
            width: this.app.renderer.view.width,
            height: this.app.renderer.view.height
        });
        // 碰到画布边界, 动画停止
        if (pixieVsCanvas) {
            this.gameStop();
        }
    }

    // 碰撞检测: 蜜蜂和柱子发生碰撞
    private checkBeeVsBlocks() {
        // const hit = this.blocks!.children.some((block) => this.bump.hitTestRectangle(this.bee, block, true));
        const len = this.blocks!.children.length;
        let hit = false;
        let isFinish = this.blocks!.finish!.getGlobalPosition()?.x <= 256;
        if (isFinish) {
            this.handleGameWin();
            return
        }
        for (let i = 0; i < len; i++) {
            const blockItem = this.blocks!.children[i];
            const test = this.bump.hitTestRectangle(this.bee, blockItem, true);
            if (test) {
                hit = true;
                isFinish = blockItem === this.blocks?.finish;
                break
            }
        }
        if (hit && !isFinish) {
            this.handleGameOver();
        }
    }

    private handleEvent() {
        this.app.stage.interactive = true; //响应交互
        this.app.stage.buttonMode = true; //鼠标变手型
        this.app.stage.on("pointerdown", (event: InteractionEvent) => {
            this.bee!.flyUp();
        })
    }

    private handleGameWin() {
        this.gameStop();
        this.bee!.visible = false;
        eventEmitter.emit('gameWin');
    }

    private handleGameOver() {
        // console.log('handleGameOver=======')
        // window.alert('finish')
        this.gameStop();

        eventEmitter.emit('gameOver');
    }
}