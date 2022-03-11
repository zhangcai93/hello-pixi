# Vue 3 + Typescript + Vite + pixiJs

## 功能概述
小精灵冒险(Learn Pixi.js 一书中最后一个案例)

- 点击屏幕让小精灵会向上飞起来;
- 如果她撞到柱子上，会弹窗提示`gameOver`, 点击弹窗蒙层关闭弹窗&重新开始游戏;
- 帮助她通过柱子的间隙到达终点，界面会显示一个巨大 Finish 标志&弹窗提示`gameWin`。

### 游戏区-pixi渲染
- `AnimatedSprite`小精灵动画
- `TilingSprite`无限滚动背景天空效果
- `InteractionEvent`交互事件处理
- `utils.EventEmitter`事件管理(类似node的事件系统)

### 弹窗-html+css
监听pixi渲染的游戏区`EventEmitter`派发出来的事件, 展示对应的`gameOver`/`gameWin`弹窗;

```js
eventEmitter.on('gameOver', () => {
    Dialog.show('GameOver', {
        props: {
            onClose: () => {
                game.reStart();
            }
        }
    })
})
```

## Other
[ts编译报错](https://github.com/pixijs/pixijs/issues/8182)
[加载本地json问题](https://github.com/pixijs/pixijs/issues/4223)