import axios from '@/axios'

const state = {
  current_brand_banners: []
}

const getters = {
  getCurrentBrandBanners: state => state.current_brand_banners
}

const actions = {
  async fetchCurrentBrandBanners ({ commit }, brand) {
    await axios.get(`/brand-banners/brand/${brand}/`)
      .then(response => {
        commit('SET_CURRENT_BRAND_BANNERS', response.data)
      })
  },
  async uploadBrandBanner ({ commit }, banner) {
    await axios.post('/brand-banners/', banner)
      .then(response => {
        commit('ADD_BRAND_BANNERS', response.data)
      })
  },
  async deleteBrandBanner ({ commit }, id) {
    await axios.delete(`/brand-banners/${id}/`)
      .then(() => {
        commit('REMOVE_BRAND_BANNER', id)
      })
  }
}

const mutations = {
  SET_CURRENT_BRAND_BANNERS: (state, banners) => (state.current_brand_banners = banners),
  ADD_BRAND_BANNERS: (state, banners) => (state.current_brand_banners.unshift(banners)),
  REMOVE_BRAND_BANNER: (state, id) => (state.current_brand_banners = state.current_brand_banners.filter(banner => banner.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
