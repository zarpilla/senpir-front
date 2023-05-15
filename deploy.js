require('dotenv').config();
const axios = require("axios");


const getAllItineraries = async () => {
    const url = `${process.env.VITE_API_URL}itineraries`
    const response = await axios.get(url);
    const itineraries = response.data.data
    // console.log('response', response.data.data)
    for (var i = 0; i < itineraries.length; i++) {
        const itinerary = itineraries[i]
        console.log('itinerary', itinerary.attributes.slug)
    }
    
}


getAllItineraries()