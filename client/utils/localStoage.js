export default {
    get(key) {
      // const time = new Date().getTime()
      const obj = localStorage.getItem(key)
      // const objJson = null
      if (!obj) {
        return false
      }
  
      return JSON.parse(obj)
      // objJson = JSON.parse(obj)
      // return objJson.time && (time - objJson.time) < (1000 * 60 * 60 * 24) ? objJson.data : false
    },
    set(key, val) {
      if (key && val) {
        const obj = {
          time: new Date().getTime(),
          data: val
        }
        localStorage.setItem(key, JSON.stringify(obj))
      }
    },
    remove(key) {
      localStorage.removeItem(key)
    },
    clear() {
      localStorage.clear()
    }
  }
  