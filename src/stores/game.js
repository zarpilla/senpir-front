import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import service from "@/service/index";
// import query from '../utils/query'

// const route = query.getSlugFromHash()

export const useGameStore = defineStore('game', () => {

  const games = ref([])
  // const answers = ref([])
  // const itinerary = ref("")
  // const started = ref(false)
  // const point = ref("start")

  // const canFinish = computed(() => answers.value.length && answers.value.every(a => a !== ""))

  function answer(slug, index, value) {

    if (localStorage.getItem('games')) {
      games.value = JSON.parse(localStorage.getItem('games'))
    }
    const game = games.value.find(g => g.slug === slug)
    const gameIndex = games.value.findIndex(g => g.slug === slug)

    game.answers[index] = value

    console.log('games.value 0', games.value)

    localStorage.setItem('games', JSON.stringify(games.value))
    games.value[gameIndex] = game
    console.log('games.value 1', games.value)
    
    
  }

  function setPoint(value) {
    // point.value = value
    //window.location.hash = value;
  }

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  

  const reset = () => {    
    // answers.value = []
    // itinerary.value = ""
    // started.value = false
    // point.value = "start"
  }

  // async function startActivities(slug, activities) {
  //   answers.value = activities.map(a => "") 
  // }
  async function start(itinerary) {
    try {
      if (localStorage.getItem('games')) {
        games.value = JSON.parse(localStorage.getItem('games'))
      }      

      const uidKey = 'uid'      
      var uid = localStorage.getItem(uidKey)
      if (!uid) {
        uid = uuidv4()
        localStorage.setItem(uidKey, uid)
      }

      let dt = new Date()
      const uidDateKey = 'uid.' + itinerary.attributes.slug + '.' + dt.toISOString().split('T')[0]      
      var uidDate = localStorage.getItem(uidDateKey)

      var playId = 0
      if (!uidDate) {        
        const { data } = await service({ requiresAuth: false }).post(`plays`, { data: { start: new Date(), user: uid, itinerary: itinerary.id } })
        
        localStorage.setItem(uidDateKey, dt.toISOString())

        localStorage.setItem('play.' + itinerary.attributes.slug, data.data.id)

        playId = data.data.id
      }

      console.log('games.value', games.value)
      const game = games.value.find(g => g.slug === itinerary.attributes.slug)

      if (!game) {
        const answers = itinerary.attributes.activities.map(a => "") 
        games.value.push({ slug: itinerary.attributes.slug, answers, started: true, playId: playId })
      } else {
        game.playId = playId
      }

      
      localStorage.setItem('games', JSON.stringify(games.value))

      return games.value
      

    } catch (err) {
      console.error('err', err)
    }
  }

  async function finish(slug, username) {

    if (localStorage.getItem('games')) {
      games.value = JSON.parse(localStorage.getItem('games'))
    }
    const game = games.value.find(g => g.slug === slug)

    const { data } = await service({ requiresAuth: false }).put(`plays/${game.playId}`, { data: { end: new Date(), username: username } })

  }

  function getGame(slug) {

    if (localStorage.getItem('games')) {
      games.value = JSON.parse(localStorage.getItem('games'))
    }
    return games.value.find(g => g.slug === slug)

  }

  return { games, answer, start, reset, setPoint, finish, getGame }
}, {
  persist: {
    enabled: false,
    strategies: [
      { storage: localStorage },
    ],
  }
})



