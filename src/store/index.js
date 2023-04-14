import { createStore } from 'vuex'

export default createStore({
  state: {
    products: {}, // Will be loaded dynamically and store when the API would be UP.
    cart: {},
    display: {
      products: localStorage.getItem('display-products')
    },
    user: {
      firstName: 'Jane',
      lastName: 'DOE',
      role: 'Administrateur'
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
