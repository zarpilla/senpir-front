import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import service from "@/service/index";
import query from '../utils/query'

const route = query.getParameterByName('route')

export const useGameStore = defineStore('game.' + route, () => {
  const answers = ref([])
  const itinerary = ref("")
  const started = ref(false)
  const point = ref("start")

  const canFinish = computed(() => answers.value.length && answers.value.every(a => a !== ""))

  function answer(index, value) {
    answers.value[index] = value
  }

  function setPoint(value) {
    point.value = value
  }

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  

  const reset = () => {    
    answers.value = []
    itinerary.value = ""
    started.value = false
    point.value = "start"
  }

  async function start(slug, activities, id) {
    try {
      console.log('id, slug, activities', {id, slug, activities})
      started.value = true
      itinerary.value = slug
      const key = `game.answers.${slug}`

      answers.value = activities.map(a => "") 

      let dt = new Date()      
      const uidKey = 'uid.' + slug + '.' + dt.toISOString().split('T')[0]      
      var uid = localStorage.getItem(uidKey)
      if (!uid) {
        uid = uuidv4()
        localStorage.setItem(uidKey, uid)
        const { data } = await service({ requiresAuth: false }).post(`plays`, { data: { start: new Date(), user: uid, itinerary: id } })
        console.log('data', data)
        var uid = localStorage.setItem('play.' + slug, data.data.id)
      }

    } catch (err) {
      console.error('err', err)
    }
  }

  return { answers, started, canFinish, point, answer, start, reset, setPoint }
}, {
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage },
    ],
  }
})



