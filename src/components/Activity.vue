<script setup>
import Picture from './Picture.vue'
import Audio from './Audio.vue'
import { computed, ref, watch } from 'vue'
import { useGameStore } from '../stores/game'

const props = defineProps({
  activity: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const gameStore = useGameStore();

const checked = ref(props.activity.options.map(o => false))

const answers = ref(props.activity.options.map(o => o.answer))

const answerOk = computed(() => answers.value.every((val, idx) => val === checked.value[idx]))

const checkOption = (i) => {
  if (answerOk.value === false) {
    checked.value[i] = !checked.value[i]
  }

}

watch(answerOk, (newValue) => {
  if (newValue) {
    gameStore.answer(props.index, props.activity.answer_code)
  }
})
</script>

<template>
  <div class="activity" :class="answerOk ? 'correct' : 'x'">
    <h2>{{ activity.name }}</h2>
    <div>{{ activity.description }}</div>
    <Picture :image="activity.image"></Picture>
    <Audio :audio="activity.audio"></Audio>
    <h2>Opcions</h2>

    <div class="activity-options" v-if="checked">
      <div class="activity-option" :class="checked[i] ? 'active' : 'x'" v-for="(option, i) in activity.options"
        :key="option.id" @click="checkOption(i)">
        <h3>{{ option.name }}</h3>
        <Picture :image="option.image"></Picture>
        <Audio :audio="option.audio"></Audio>
        <div>{{ option.description }}</div>
        <div class="mt-1">V/F: {{ option.answer }}</div>
        <!-- {{ option }} -->
      </div>      
    </div>
    <h2>Resposta</h2>
    <div>{{ activity.answer_text }}</div>
    <Picture :image="activity.answer_image"></Picture>
    <Audio :audio="activity.answer_audio"></Audio>
    <h2>Codi Resposta</h2>
    <h1>{{ activity.answer_code }}</h1>

    <!-- <pre>{{ activity }}</pre> -->
  </div>
</template>

<style scoped>
.activity-options {
  display: flex;
}

.active {
  border: 3px solid orange;
}

.correct {
  background: rgba(0, 255, 0, 0.1);
}

.mt-1 {
  margin-top: 1rem;
}

.mt-2 {
  margin-top: 2rem;
}</style>
