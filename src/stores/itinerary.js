import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import service from "@/service/index";
import query from '../utils/query'

// const route = query.getParameterByName('route')
const route = query.getSlugFromHash()


export const useItineraryStore = defineStore('itinerary', () => {
  const data = ref({})
  const itineraries = ref([])
  const slug = ref("")

  // function setItinerary(value) {
  //   data.value = value
  // }

  function setSlug(value) {
    slug.value = value
  }


  function getFromStorage(slug) {
    console.log('from storage')
    const key = `itinerary.${slug}`
    const value = localStorage.getItem(key)        
    const store = JSON.parse(value)
    if (store && store.data && store.data.value) {
      return store.data.value
    }
    return 
  }

  function getAllFromStorage() {
    console.log('from storage all')
    const key = `itineraries`
    const value = localStorage.getItem(key)        
    const store = JSON.parse(value)
    if (store && store.data && store.data.value) {
      return store.data.value
    }
    return 
  }

  async function loadItineraries() {
    try {
      if (navigator.onLine) {
        const query = `itineraries?populate=image&populate=image_preview&populate=character&populate=map&populate=audio&populate=answer_image&populate=answer_audio&populate=activities&populate=activities.image&populate=activities.audio&populate=activities.answer_image&populate=activities.answer_audio&populate=activities.options&populate=activities.options.image&populate=activities.options.audio`
        const { data } = await service({ requiresAuth: false }).get(query)

        if (data.data && data.data.length) {
          itineraries.value = data.data
        } else {
          itineraries.value = getAllFromStorage()
        }

        localStorage.setItem('itineraries', JSON.stringify(itineraries.value))

        return itineraries.value

      } else {
        itineraries.value = getAllFromStorage()
        return itineraries.value
      }
    }
    catch (err) {
      console.warn('err', err)
      itineraries.value = getAllFromStorage()
      return itineraries.value
    }
  }

  async function loadItinerary(slug) {
    const allItineraries = await loadItineraries()    
    const it = allItineraries.find(i => i.attributes.slug === slug)    
    data.value = it
    return it
    
    

    const key = `itinerary.${slug}`
    try {
      console.log('from api', navigator.onLine)
      if (navigator.onLine) {
        const query = `itineraries?filters[slug][$eq]=${slug}&populate=image&populate=image_preview&populate=character&populate=map&populate=audio&populate=answer_image&populate=answer_audio&populate=activities&populate=activities.image&populate=activities.audio&populate=activities.answer_image&populate=activities.answer_audio&populate=activities.options&populate=activities.options.image&populate=activities.options.audio`
        const { data } = await service({ requiresAuth: false }).get(query)

        if (data.data && data.data.length) {
          this.data.value = data.data[0]
        } else {
          this.data.value = getFromStorage()
        }

        localStorage.setItem(key, JSON.stringify(this.data.value))

        console.log('this.data.value', this.data.value)
        return this.data.value

      } else {
        this.data.value = getFromStorage(slug)
        return this.data.value
      }
    }
    catch (err) {
      console.warn('err', err)
      this.data.value = getFromStorage(slug)
      return this.data.value
    }



  }

  return { data, slug, itineraries, setSlug, loadItinerary, loadItineraries }
}, {
  persist: {
    enabled: false,
    strategies: [
      { storage: localStorage },
    ],
  }
})



