<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'


const gameStore = useGameStore();

const canFinish = computed(() => gameStore.canFinish || gameStore.answers[gameStore.answers.length - 1] !== '')
</script>

<template>
  <div class="next">
    <div @click="gameStore.setPoint(canFinish ? 'end' : 'start')">
        <button>
          {{ !canFinish ? 'SEGUEIX' : 'ACABA' }}
        </button>
      </div>
  </div>
</template>

<style scoped>
</style>
