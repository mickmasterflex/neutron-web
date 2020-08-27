import axios from '@/axios'

const state = {
  current_campus_banners: []
}

const getters = {
  getCurrentCampusBanners: state => state.current_campus_banners
}

const actions = {
  async fetchCurrentCampusBanners ({ commit }, campus) {
    await axios.get(`/campus-banners/campus/${campus}/`)
      .then(response => {
        commit('SET_CURRENT_CAMPUS_BANNERS', response.data)
      })
  },
  async uploadCampusBanner ({ commit }, banner) {
    await axios.post('/campus-banners/', banner)
      .then(response => {
        commit('ADD_CAMPUSES', response.data)
      })
  },
  async deleteCampusBanner ({ commit }, id) {
    await axios.delete(`/campus-banners/${id}/`)
      .then(() => {
        commit('REMOVE_BANNER', id)
      })
  }
}

const mutations = {
  SET_CURRENT_CAMPUS_BANNERS: (state, banners) => (state.current_campus_banners = banners),
  ADD_BANNERS: (state, banners) => (state.current_campus_banners.unshift(banners)),
  REMOVE_BANNER: (state, id) => (state.current_campus_banners = state.current_campus_banners.filter(banner => banner.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
