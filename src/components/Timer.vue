<script setup>
import { useGameStore } from '../stores/game'
import { ref, watch, onUnmounted } from 'vue'


const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const gameStore = useGameStore();
const activity = ref(props.activity);

const counting = ref(false);

const timeLeft = ref(0);

const onCountdownEnd = () => {
  emit('end')
}


const emit = defineEmits(['end'])




// @progress="onCountdownProgress"
const onCountdownProgress = (progress) => {
  // console.log('progress', progress)
}

const manageTimer = () => {
  if (activity.value.timer) {
    counting.value = false

    setTimeout(() => {
      timeLeft.value = props.activity.timer
      counting.value = true
    }, 500)
  } else {
    counting.value = false
    timeLeft.value = 0
  }
}

watch(() => props.activity, (newValue) => {
  if (newValue) {
    activity.value = newValue
  }
  manageTimer()
})

manageTimer()


onUnmounted(() => {
  counting.value = false
})



</script>

<template>
  <div class="timer text-center" v-if="activity && activity.timer">
    <img src="@/assets/images/button.svg" class="spin me-2" alt="" />
    <vue-countdown v-if="counting" :time="timeLeft * 1000" @end="onCountdownEnd"
      v-slot="{ days, hours, minutes, seconds }">
      {{ minutes ? `${minutes} minuts,` : '' }} {{ seconds }} segons.
    </vue-countdown>
  </div>
</template>

<style scoped>
.spin {
  -webkit-animation-name: spin;
    -webkit-animation-duration: 10000ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spin;
    -moz-animation-duration: 10000ms;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -ms-animation-name: spin;
    -ms-animation-duration: 10000ms;
    -ms-animation-iteration-count: infinite;
    -ms-animation-timing-function: linear;
    
    animation-name: spin;
    animation-duration: 10000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
@-moz-keyframes spin {
    from { -moz-transform: rotate(0deg); }
    to { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}

</style>
