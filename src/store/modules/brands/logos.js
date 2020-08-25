import axios from '@/axios'

const state = {
  current_brand_logos: []
}

const getters = {
  getCurrentBrandLogos: state => state.current_brand_logos
}

const actions = {
  async fetchCurrentBrandLogos ({ commit }, brand) {
    await axios.get(`/brand-logos/brand=${brand}/`)
      .then(response => {
        commit('SET_CURRENT_BRAND_LOGOS', response.data)
      })
  },
  async uploadBrandLogo ({ commit }, logo) {
    await axios.post('/brand-logos/', logo)
      .then(response => {
        commit('ADD_LOGOS', response.data)
      })
  },
  async deleteBrandLogo ({ commit }, id) {
    await axios.delete(`/brand-logos/${id}/`)
      .then(() => {
        commit('REMOVE_LOGO', id)
      })
  }
}

const mutations = {
  SET_CURRENT_BRAND_LOGOS: (state, logos) => (state.current_brand_logos = logos),
  ADD_LOGOS: (state, logos) => (state.current_brand_logos.unshift(logos)),
  REMOVE_LOGO: (state, id) => (state.current_brand_logos = state.current_brand_logos.filter(logo => logo.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
