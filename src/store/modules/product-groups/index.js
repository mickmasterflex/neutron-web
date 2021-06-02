import axios from '@/axios'
import campuses from '@/store/modules/product-groups/campuses'

const modules = {
  campuses
}

const state = {
  product_groups: []
}

const getters = {
  getProductGroupsByBrand: (state) => (brandId) => {
    return state.product_groups.filter(pg => pg.brand === brandId)
  }
}

const actions = {
  async fetchProductGroups ({ commit }) {
    await axios.get('/product-groups/').then(response => {
      commit('SET_PRODUCT_GROUPS', response.data)
    })
  }
}

const mutations = {
  SET_PRODUCT_GROUPS: (state, groups) => {
    state.product_groups = groups
  }
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
