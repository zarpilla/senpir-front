import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import localforage from 'localforage'
const localforage = localStorage

export const useGameStore = defineStore('game', () => {
  const answers = ref([])
  const itinerary = ref("")
  const started = ref(false)

  const canFinish = computed(() => answers.value.length && answers.value.every(a => a !== ""))

  function answer(index, value) {
    const key = `game.answers.${itinerary.value}`
    answers.value[index] = value
    // localforage.setItem(key, JSON.stringify(answers.value))
  }

  const reset = () => {
    // localforage.removeItem(`game.answers.${itinerary.value}`)
    // localforage.removeItem(`game.started.${itinerary.value}`)
    answers.value = []
    itinerary.value = ""
    started.value = false
  }

  // function $reset() {
  //   const key = `game.${itinerary.value}`
  //   localforage.removeItem(key)
  //   answers.value = []
  //   itinerary.value = ""
  // }

  async function start(slug, activities) {
    try {
      started.value = true
      itinerary.value = slug
      console.log('slug, activities', slug, activities)
      const key = `game.answers.${slug}`

      answers.value = activities.map(a => "")


      // const value = localforage.getItem(key)
      // // .then(async (value) => {
      // console.log('localforage value', value)
      // if (value) {
      //   answers.value = JSON.parse(value)
      // } else {
      //   answers.value = activities.map(a => "")
      // }
      // console.log('value', value)
      // //})
      // localforage.setItem(`game.started.${slug}`, 'true')

    } catch (err) {
      console.error('err', err)
    }
    // answers.value = activities.map(a => "")
  }

  return { answers, started, canFinish, answer, start, reset }
}, {
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage },
    ],
  }
})



