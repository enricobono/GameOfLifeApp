export const useMapStore = defineStore('post', () => {
  const {$api} = useNuxtApp()

  async function postMap(rows, cols, border) {
    return await $api.post('/maps', {rows: rows, cols: cols, border: border})
  }

  return {
    createMap: postMap
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}
