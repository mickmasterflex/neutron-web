import axios from '@/axios'
import brandLogos from '@/store/modules/brands/logos'
import brandBanners from '@/store/modules/brands/banners'
import loading from '@/store/modules/brands/loading'
import visibility from '@/store/modules/brands/visibility'

const state = {
  brands: [],
  current_brand: {}
}

const getters = {
  getAllBrands: state => state.brands,
  getCurrentBrand: state => state.current_brand,
  getAllBrandsCount: (state) => {
    return state.brands.length
  }
}

const actions = {
  async fetchBrands ({ commit }) {
    commit('SET_BRANDS_FETCH_LOADING')
    await axios.get('/brands/')
      .then(response => {
        commit('SET_BRANDS', response.data)
        commit('RESET_BRANDS_FETCH_LOADING')
      })
  },
  async fetchCurrentBrand ({ commit }, id) {
    commit('SET_BRAND_FETCH_LOADING')
    await axios.get(`/brands/${id}/`)
      .then(response => {
        commit('SET_CURRENT_BRAND', response.data)
        commit('RESET_BRAND_FETCH_LOADING')
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
  REMOVE_BRAND: (state, id) => (state.brands = state.brands.filter(brand => brand.id !== id))
}

const modules = {
  loading,
  visibility,
  brandLogos,
  brandBanners
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
