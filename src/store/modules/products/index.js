import axios from '@/axios'
import educationProducts from '@/store/modules/products/education'
import loading from '@/store/modules/products/loading'

const modules = {
  loading,
  educationProducts
}

const state = {
  products: []
}

const getters = {
  getAllProducts: state => state.products,
  getProductById: state => id => state.products.find(product => product.id === id),
  getProductsByProductGroup: (state) => (productGroupId) => (
    state.products.filter(p => p.product_group === productGroupId)
  )
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
