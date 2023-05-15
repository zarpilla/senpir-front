import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const answers = ref([])
  
  const canFinish = computed(() => answers.value.length && answers.value.every(a => a !== ""))

  function answer(index, value) {
    answers.value[index] = value
  }

  async function start(activities) {
    answers.value = activities.map(a => "")
  }

  return { answers, canFinish, answer, start }
})



