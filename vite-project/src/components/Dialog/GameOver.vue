<script lang="ts" setup>
import Wrapper from './wrapper';
</script>

<template>
    <Wrapper>
        <div class="game-over">
            Game Over
        </div>
    </Wrapper>
</template>

<style scoped>
.game-over {
    background: darksalmon;
    border-radius: 50px;
    padding: 50px;
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    color: black;
}
</style>