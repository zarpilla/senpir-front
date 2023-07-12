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

    localStorage.setItem('games', JSON.stringify(games.value))
    games.value[gameIndex] = game
    
    
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
  async function start(itinerary, play) {
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

      if (!uidDate && play) {
        const { data } = await service({ requiresAuth: false }).post(`plays`, { data: { start: new Date(), user: uid, itinerary: itinerary.id } })
        
        localStorage.setItem(uidDateKey, dt.toISOString())
      }

      const game = games.value.find(g => g.slug === itinerary.attributes.slug)

      if (!game) {
        const answers = itinerary.attributes.activities.map(a => "") 
        games.value.push({ slug: itinerary.attributes.slug, answers, started: true })
      }

      localStorage.setItem('games', JSON.stringify(games.value))
      
      return games.value
      

    } catch (err) {
      console.error('err', err)
    }
  }

  async function finish(itineraryId, slug, username) {

    const uidKey = 'uid'      
    var uid = localStorage.getItem(uidKey)
    if (!uid) {
      uid = uuidv4()
      localStorage.setItem(uidKey, uid)
    }

    localStorage.setItem('uid.username', username)    

    let dt = new Date()
    const uidDateKey = 'uid.finish.' + slug + '.' + dt.toISOString().split('T')[0]      
    var uidDate = localStorage.getItem(uidDateKey)

    if (!uidDate) {        
      const { data } = await service({ requiresAuth: false }).post(`plays`, { data: { end: new Date(), user: uid, itinerary: itineraryId, username: username } })
      
      localStorage.setItem(uidDateKey, dt.toISOString())
    }
    
  }


  async function loadGallery() {
    try {
      if (navigator.onLine) {

        var uid = localStorage.getItem('uid')

        const query = `plays?filters[user][$eq]=${uid}&filters[end][$notNull]=true&populate=itinerary&populate=itinerary.character&sort=itinerary.order`
        const { data } = await service({ requiresAuth: false }).get(query)

        return data.data
      }
    }
    catch (err) {
      console.warn('err', err)
      return []
    }
  }

  function getGame(slug) {

    if (localStorage.getItem('games')) {
      games.value = JSON.parse(localStorage.getItem('games'))
    }
    return games.value.find(g => g.slug === slug)

  }

  return { games, answer, start, reset, setPoint, finish, getGame, loadGallery }
}, {
  persist: {
    enabled: false,
    strategies: [
      { storage: localStorage },
    ],
  }
})



