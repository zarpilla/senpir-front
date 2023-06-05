import axios from "axios";

const get = async (url) => {
  if (navigator.onLine) {
    const response = await axios.get(url, {
      responseType: "stream"}); // fetch(url);
  } else {
    const response = await Promise.resolve(true)
  }
  
}

export default { get }
