<script setup lang="ts">
import {defineEmits} from 'vue';
import Dialog from '@components/Dialog/index';

const emit = defineEmits<{
    (e: 'close', id: number): void
}>()

function handleMaskClick() {
    emit('close', 1);
}

</script>

<template>
    <div class="dialog-base">
        <div
            class="mask"
            @click="handleMaskClick"
        />
        <div
            class="dialog-content"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.dialog-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    /* background: #fff; */
}

.dialog-close {
    width: 50px;
    height: 50px;
    line-height: 1em;
    border-radius: 50%;
    background: chocolate;
    text-align: center;
    color: #fff;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #000;
    opacity: 0.2;
    z-index: 999;
}

</style>
