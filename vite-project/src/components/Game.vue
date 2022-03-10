<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Game from '../game/index';
import {eventEmitter} from '@common/gameUtils';
import Dialog from '@components/Dialog/index';

// let showDialog = ref(false);
const gameOption = {
    width: 910,
    height: 512,
    antialias: true
}
const game = new Game(gameOption)

onMounted(() => {
    const gameArea: HTMLElement = document.querySelector('.game');
    game.mounted(gameArea);

    eventEmitter.on('gameOver', () => {
        Dialog.show('GameOver', {
            props: {
                onClose: () => {
                    game.reStart();
                    console.log('onDialogClose==========GameOver')
                }
            }
        })
    })

    eventEmitter.on('gameWin', () => {
        Dialog.show('GameWin')
    })    
})

function pop() {
    console.log('click pop')
}

</script>

<template>
    <div class="game" @click="pop"></div>
</template>

<style scoped>
.game {
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
}
</style>
