import axios from '@/axios'

const state = {
  products: []
}
const getters = {
  getAllProducts: (state) =>
    state.products
}

const actions = {
  async fetchProducts ({ commit }) {
    await axios.get('/products/')
      .then(response => {
        commit('SET_PRODUCTS', response.data)
      })
  }
}
const mutations = {
  SET_PRODUCTS: (state, products) => (state.products = products)
}
export default {
  state,
  getters,
  actions,
  mutations
}
