import axios from "axios";

const get = async (url) => {
  if (navigator.onLine) {
    const response = await axios.get(url); // fetch(url);
  } else {
    const response = await Promise.resolve(true)
  }
  
}

export default { get }
