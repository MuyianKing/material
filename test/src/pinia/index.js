import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { PROJECT_PREFIX } from '@hl/utils/es/app'

const pinia = createPinia()
pinia.use(createPersistedState({
  key: id => `${PROJECT_PREFIX}_${id.toString().split().map(item => item.toUpperCase()).join()}_STORAGE`,
  storage: {
    getItem: key => localStorage.getItem(key),
    setItem: (key, value) => localStorage.setItem(key, value),
  },
}))

export default pinia
