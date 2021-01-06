import axios from '@/axios'
import loading from '@/store/modules/brands/logos/loading'

const state = {
  current_brand_logos: []
}

const getters = {
  getCurrentBrandLogos: state => state.current_brand_logos
}

const actions = {
  async fetchCurrentBrandLogos ({ commit }, brand) {
    commit('SET_BRAND_LOGOS_FETCH_LOADING')
    await axios.get(`/brand-logos/brand/${brand}/`)
      .then(response => {
        commit('SET_CURRENT_BRAND_LOGOS', response.data)
        commit('RESET_BRAND_LOGOS_FETCH_LOADING')
      })
  },
  async uploadBrandLogo ({ commit }, logo) {
    await axios.post('/brand-logos/', logo)
      .then(response => {
        commit('ADD_BRAND_LOGOS', response.data)
      })
  },
  async deleteBrandLogo ({ commit }, id) {
    await axios.delete(`/brand-logos/${id}/`)
      .then(() => {
        commit('REMOVE_BRAND_LOGO', id)
      })
  }
}

const mutations = {
  SET_CURRENT_BRAND_LOGOS: (state, logos) => (state.current_brand_logos = logos),
  ADD_BRAND_LOGOS: (state, logos) => (state.current_brand_logos.unshift(logos)),
  REMOVE_BRAND_LOGO: (state, id) => (state.current_brand_logos = state.current_brand_logos.filter(logo => logo.id !== id))
}

const modules = {
  loading
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
