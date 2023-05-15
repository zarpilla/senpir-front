<script setup>
import Picture from './Picture.vue'
import { computed, ref, watch } from 'vue'
import { useGameStore } from '../stores/game'
import { VueDraggableNext } from 'vue-draggable-next'

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

const answers = ref(props.activity.options.map(o => o.option_code || o.id))

const shuffleArray = (array) => {
  const array2 = [...array]
  for (let i = array2.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array2[i], array2[j]] = [array2[j], array2[i]];
  }
  return array2
}

const unsorted = ref([...shuffleArray([...props.activity.options])])

const unsortedAnswers = computed(() => (unsorted.value.map(o => o.option_code || o.id)))

//console.log('unsorted', unsorted)

// console.log('props.activity.options', shuffleArray([...props.activity.options]))
// console.log('unsorted', unsorted)

const answerOk = computed(() => answers.value.every((val, idx) => val === unsortedAnswers.value[idx]))

const onMoveCallback = (evt, originalEvent) => {
  if (answerOk.value) {
   return false 
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
    <h2>Opcions</h2>

    <div class="activity-options" v-if="checked">
      <!-- <div class="activity-option" :class="checked[i] ? 'active' : 'x'" v-for="(option, i) in unsorted" :key="option.id"
        @click="checkOption(i)">
        <h3>{{ option.name }}</h3>
        <Picture :image="option.image"></Picture>
        <div>{{ option.description }}</div>
      </div> -->
      <VueDraggableNext class="activity-options" v-model="unsorted" :move="onMoveCallback">
        <transition-group>
          <div v-for="(element, i) in unsorted" :key="unsorted.id">
            <h3>{{ element.name }}</h3>
            <Picture :image="element.image"></Picture>
            <div>{{ element.description }}</div>
          </div>
        </transition-group>
      </VueDraggableNext>
    </div>
    <h2>Resposta</h2>
    <div>{{ activity.answer_text }}</div>
    <Picture :image="activity.answer_image"></Picture>
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
}
</style>
