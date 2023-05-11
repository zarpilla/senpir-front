import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import service from "@/service/index";
import localforage from 'localforage'

export const useItineraryStore = defineStore('itinerary', () => {
  const data = ref({})
  // const doubleCount = computed(() => count.value * 2)

  function setItinerary(value) {
    data.value = value
  }

  async function loadItinerary() {

    const query = 'itineraries?slug=gorg-de-malatosca&populate=image&populate=image_preview&populate=map&populate=audio&populate=answer_image&populate=activities&populate=activities.image&populate=activities.audio&populate=activities.answer_image&populate=activities.answer_audio&populate=activities.options&populate=activities.options.image&populate=activities.options.audio'
    localforage.getItem('itinerary').then(async (value) => {
      // This code runs once the value has been loaded
      // from the offline store.
      console.log('idb', value)

      if (value) {
        this.data.value = JSON.parse(value)
      } else {
        console.log('from api')
        const { data } = await service({ requiresAuth: false }).get(query)
        if (data.data && data.data.length) {
          this.data.value = data.data[0]
        }
      }

      localforage.setItem('itinerary', JSON.stringify(this.data.value))

    }).catch(async (err) => {
      // This code runs if there were any errors
      console.log("err");
      console.log(err);
      console.log('from api')
      const { data } = await service({ requiresAuth: false }).get(query)
      if (data.data && data.data.length) {
        this.data.value = data.data[0]
        localforage.setItem('itinerary', JSON.stringify(this.data.value))
      }
      
    });

  }

  return { data, setItinerary, loadItinerary }
})



