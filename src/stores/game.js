import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import service from "@/service/index";
import query from '../utils/query'

const route = query.getSlugFromHash()

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
    //window.location.hash = value;
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

  async function startActivities(activities) {
    answers.value = activities.map(a => "") 
  }
  async function start(slug, itineraryId) {
    try {
      started.value = true
      itinerary.value = slug
            
      const uidKey = 'uid'      
      var uid = localStorage.getItem(uidKey)
      if (!uid) {
        uid = uuidv4()
        localStorage.setItem(uidKey, uid)
      }

      let dt = new Date()
      const uidDateKey = 'uid.' + route + '.' + dt.toISOString().split('T')[0]      
      var uidDate = localStorage.getItem(uidDateKey)

      if (!uidDate) {        
        const { data } = await service({ requiresAuth: false }).post(`plays`, { data: { start: new Date(), user: uid, itinerary: itineraryId } })
        
        localStorage.setItem(uidDateKey, dt.toISOString())

        localStorage.setItem('play.' + slug, data.data.id)
      }

    } catch (err) {
      console.error('err', err)
    }
  }

  async function finish(username) {
    const key = 'play.' + route
    const playId = localStorage.getItem(key)
    const { data } = await service({ requiresAuth: false }).put(`plays/${playId}`, { data: { end: new Date(), username: username } })

  }

  return { answers, started, canFinish, point, answer, start, startActivities, reset, setPoint, finish }
}, {
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage },
    ],
  }
})



