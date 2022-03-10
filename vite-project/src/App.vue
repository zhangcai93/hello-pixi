<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Game from '@components/Game.vue'
import demo from '@components/demo.vue'

</script>

<template>
    <div class="index">
        <Game />
    </div>
</template>

<style>
@import '@css/reset.css';

#app {
    /* min-height: 100vh; */
    /* width: 100vw; */
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.index {
    /* width: 100%; */
    /* height: 100vh; */
    background: lightgoldenrodyellow;
}
</style>
