
const get = async (url) => {
  if (navigator.onLine) {
    const response = await fetch(url);
  } else {
    const response = await Promise.resolve(true)
  }
  
}

export default { get }
