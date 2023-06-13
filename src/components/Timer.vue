<script setup>
import { useGameStore } from '../stores/game'
import { ref, watch } from 'vue'


const props = defineProps({  
  activities: {
    type: Array[Object],
    required: true
  }
})

const gameStore = useGameStore();
const activity = ref(null);

const counting = ref(false);

const timeLeft = ref(0);

const onCountdownEnd = () => {
  alert('temps!')
}

// @progress="onCountdownProgress"
const onCountdownProgress = (progress) => {
  // console.log('progress', progress)
}

watch(() => gameStore.point, (newValue) => {
  if (newValue && newValue.startsWith('activity-')) {
    const id = newValue.split('-')[1]
    activity.value = props.activities.find(a => a.id.toString() === id.toString())
    const index = props.activities.findIndex(a => a.id.toString() === id.toString())
    console.log('index', index)
    if (activity.value.timer && gameStore.answers[index] === "") {
      console.log('start timer!', activity.value.timer)      
      counting.value = false

      setTimeout(() => {
        timeLeft.value = activity.value.timer
        counting.value = true
      }, 500)
      
      
    } else {
      counting.value = false
    }
  } else {
    activity.value = null
    counting.value = false
    console.log('end timer!')
    
    // timeleft.value = 0
  }
})

</script>

<template>
  <div class="timer" v-if="activity && activity.timer">
    <vue-countdown v-if="counting" :time="timeLeft * 1000" @end="onCountdownEnd" v-slot="{ days, hours, minutes, seconds }">
      Queden： {{ minutes }} minuts, {{ seconds }} segons.
    </vue-countdown>
  </div>
</template>

<style scoped>
</style>
