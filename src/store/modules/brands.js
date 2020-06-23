import axios from '@/axios'

const state = {
  brands: [],
  current_brand: {},
  show_create_brand_modal: false
}

const getters = {
  getAllBrands: state => state.brands,
  getCurrentBrand: state => state.current_brand,
  getAllBrandsCount: (state) => {
    return state.brands.length
  },
  getShowCreateBrandModal: state => state.show_create_brand_modal
}

const actions = {
  async fetchBrands ({ commit }) {
    await axios.get('/brands/')
      .then(response => {
        commit('SET_BRANDS', response.data)
      })
  },
  async fetchCurrentBrand ({ commit }, id) {
    await axios.get(`/brands/${id}/`)
      .then(response => {
        commit('SET_CURRENT_BRAND', response.data)
      })
  },
  async createBrand ({ commit }, brand) {
    await axios.post('/brands/', brand)
      .then(response => {
        commit('ADD_BRAND', response.data)
      })
  },
  async updateBrand ({ commit }, updatedBrand) {
    await axios.put(`/brands/${updatedBrand.id}/`, updatedBrand)
      .then(response => {
        commit('UPDATE_BRAND', response.data)
        commit('SET_CURRENT_BRAND', response.data)
      })
  },
  async deleteBrand ({ commit }, id) {
    await axios.delete(`/brands/${id}/`)
      .then(() => {
        commit('REMOVE_BRAND', id)
      })
  }
}

const mutations = {
  SET_BRANDS: (state, brands) => (state.brands = brands),
  SET_CURRENT_BRAND: (state, brand) => (state.current_brand = brand),
  ADD_BRAND: (state, brand) => state.brands.unshift(brand),
  UPDATE_BRAND: (state, updatedBrand) => {
    const index = state.brands.findIndex(brand => brand.id === updatedBrand.id)
    if (index !== -1) {
      state.brands.splice(index, 1, updatedBrand)
    }
  },
  REMOVE_BRAND: (state, id) => (state.brands = state.brands.filter(brand => brand.id !== id)),
  SHOW_CREATE_BRAND_MODAL: (state) => (state.show_create_brand_modal = true),
  CLOSE_CREATE_BRAND_MODAL: (state) => (state.show_create_brand_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
