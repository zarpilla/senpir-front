<script setup>
import { useGameStore } from '../stores/game'


const gameStore = useGameStore();

</script>

<template>
  <div class="next">
    <div @click="gameStore.setPoint(gameStore.canFinish ? 'end' : 'start')">
        <button>
          {{ !gameStore.canFinish ? 'SEGUEIX' : 'ACABA' }}
        </button>
      </div>
  </div>
</template>

<style scoped>
</style>
