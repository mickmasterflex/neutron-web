import axios from '@/axios'
import educationProducts from '@/store/modules/products/education-products'
import loading from '@/store/modules/products/loading'

const modules = {
  loading,
  educationProducts
}

const state = {
  products: []
}

const getters = {
  getAllProducts: (state) =>
    state.products
}

const actions = {
  async fetchProducts ({ commit }) {
    commit('SET_PRODUCTS_FETCH_LOADING')
    await axios.get('/products/')
      .then(response => {
        commit('RESET_PRODUCTS_FETCH_LOADING')
        commit('SET_PRODUCTS', response.data)
      })
  }
}

const mutations = {
  SET_PRODUCTS: (state, products) => (state.products = products)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
