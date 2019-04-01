export default {
  setStorageInfo (key,value){
    window.localStorage.setItem("todos",JSON.stringify(value))
  },
  getStorageInfo (key){
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  }
}
