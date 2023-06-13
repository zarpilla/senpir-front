import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import service from "@/service/index";
import query from '../utils/query'

const route = query.getParameterByName('route')


export const useItineraryStore = defineStore('itinerary.' + route, () => {
  const data = ref({})
  const slug = ref("")

  // function setItinerary(value) {
  //   data.value = value
  // }

  function setSlug(value) {
    slug.value = value
  }


  function getFromStorage() {
    console.log('from storage')
    const key = `itinerary.${route}`
    const value = localStorage.getItem(key)        
    const store = JSON.parse(value)
    if (store && store.data && store.data.value) {
      return store.data.value
    }
    return 
  }

  async function loadItinerary() {
    const itinerary = slug.value
    const key = `itinerary.${route}`
    try {
      console.log('from api', navigator.onLine)
      if (navigator.onLine) {
        const query = `itineraries?filters[slug][$eq]=${itinerary}&populate=image&populate=image_preview&populate=character&populate=map&populate=audio&populate=answer_image&populate=answer_audio&populate=activities&populate=activities.image&populate=activities.audio&populate=activities.answer_image&populate=activities.answer_audio&populate=activities.options&populate=activities.options.image&populate=activities.options.audio`
        const { data } = await service({ requiresAuth: false }).get(query)

        if (data.data && data.data.length) {
          this.data.value = data.data[0]
        } else {
          this.data.value = getFromStorage()
        }

        return this.data.value

      } else {
        this.data.value = getFromStorage()
        return this.data.value
      }
    }
    catch (err) {
      console.warn('err', err)
      this.data.value = getFromStorage()
      return this.data.value
    }



  }

  return { data, slug, setSlug, loadItinerary }
}, {
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage },
    ],
  }
})



