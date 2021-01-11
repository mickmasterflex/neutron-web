import axios from '@/axios'
import loading from '@/store/modules/campuses/banners/loading'

const state = {
  current_campus_banners: []
}

const getters = {
  getCurrentCampusBanners: state => state.current_campus_banners
}

const actions = {
  async fetchCurrentCampusBanners ({ commit }, campus) {
    commit('SET_CAMPUS_BANNERS_FETCH_LOADING')
    await axios.get(`/campus-banners/campus/${campus}/`)
      .then(response => {
        commit('SET_CURRENT_CAMPUS_BANNERS', response.data)
        commit('RESET_CAMPUS_BANNERS_FETCH_LOADING')
      })
  },
  async uploadCampusBanner ({ commit }, banner) {
    await axios.post('/campus-banners/', banner)
      .then(response => {
        commit('ADD_CAMPUS_BANNER', response.data)
      })
  },
  async deleteCampusBanner ({ commit }, id) {
    await axios.delete(`/campus-banners/${id}/`)
      .then(() => {
        commit('REMOVE_CAMPUS_BANNER', id)
      })
  }
}

const mutations = {
  SET_CURRENT_CAMPUS_BANNERS: (state, banners) => (state.current_campus_banners = banners),
  ADD_CAMPUS_BANNER: (state, banner) => (state.current_campus_banners.unshift(banner)),
  REMOVE_CAMPUS_BANNER: (state, id) => (state.current_campus_banners = state.current_campus_banners.filter(banner => banner.id !== id))
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
