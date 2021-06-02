import axios from '@/axios'
import loading from '@/store/modules/product-groups/campuses/logos/loading'

const state = {
  current_campus_logos: []
}

const getters = {
  getCurrentCampusLogos: state => state.current_campus_logos
}

const actions = {
  async fetchCurrentCampusLogos ({ commit }, campus) {
    commit('SET_CAMPUS_LOGOS_FETCH_LOADING')
    await axios.get(`/campus-logos/campus/${campus}/`)
      .then(response => {
        commit('SET_CURRENT_CAMPUS_LOGOS', response.data)
        commit('RESET_CAMPUS_LOGOS_FETCH_LOADING')
      })
  },
  async uploadCampusLogo ({ commit }, logo) {
    await axios.post('/campus-logos/', logo)
      .then(response => {
        commit('ADD_CAMPUS_LOGOS', response.data)
      })
  },
  async deleteCampusLogo ({ commit }, id) {
    await axios.delete(`/campus-logos/${id}/`)
      .then(() => {
        commit('REMOVE_CAMPUS_LOGO', id)
      })
  }
}

const mutations = {
  SET_CURRENT_CAMPUS_LOGOS: (state, logos) => (state.current_campus_logos = logos),
  ADD_CAMPUS_LOGOS: (state, logos) => (state.current_campus_logos.unshift(logos)),
  REMOVE_CAMPUS_LOGO: (state, id) => (state.current_campus_logos = state.current_campus_logos.filter(logo => logo.id !== id))
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
