import { createStore } from 'vuex'

export default createStore({
  state: {
    products: {}, // Will be loaded dynamically and store when the API would be UP.
    cart: {},
    display: {
      products: localStorage.getItem('display-products')
    },
    user: {
      userName: 'loic.maes',
      firstName: 'Loïc',
      lastName: 'MAES',
      role: 'Bénévole'
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
