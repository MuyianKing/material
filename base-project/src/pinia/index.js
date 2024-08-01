import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import store from '@utils/storage'
import { PROJECT_PREFIX } from '../utils/app'

const pinia = createPinia()
pinia.use(createPersistedState({
  key: id => `${PROJECT_PREFIX}_${id.toString().split().map(item => item.toUpperCase()).join()}_STORAGE`,
  storage: {
    getItem: (key) => {
      const value = store.get(key)
      return JSON.stringify(value)
    },
    setItem: (key, value) => store.set(key, value),
  },
}))

export default pinia
