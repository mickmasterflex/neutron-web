import axios from '@/axios'
import campusLogos from '@/store/modules/product-groups/campuses/logos'
import campusBanners from '@/store/modules/product-groups/campuses/banners'
import loading from '@/store/modules/product-groups/campuses/loading'
import visibility from '@/store/modules/product-groups/campuses/visibility'

const state = {
  campuses: [],
  current_campus: {}
}

const getters = {
  getCurrentCampus: state => state.current_campus,
  getCampusesByBrand: (state) => (brandId) => {
    return state.campuses.filter(campus => campus.brand === brandId)
  }
}

const actions = {
  async fetchCampuses ({ commit }) {
    commit('SET_CAMPUSES_FETCH_LOADING')
    await axios.get('/campuses/')
      .then(response => {
        commit('SET_CAMPUSES', response.data)
        commit('RESET_CAMPUSES_FETCH_LOADING')
      })
  },
  async fetchCurrentCampus ({ commit }, id) {
    commit('SET_CAMPUS_FETCH_LOADING')
    await axios.get(`/campuses/${id}/`)
      .then(response => {
        commit('SET_CURRENT_CAMPUS', response.data)
        commit('RESET_CAMPUS_FETCH_LOADING')
      })
  },
  async createCampus ({ commit }, campus) {
    await axios.post('/campuses/', campus)
      .then(response => {
        commit('ADD_CAMPUS', response.data)
      })
  },
  async updateCampus ({ commit }, updatedCampus) {
    await axios.put(`/campuses/${updatedCampus.id}/`, updatedCampus)
      .then(response => {
        commit('UPDATE_CAMPUS', response.data)
        commit('SET_CURRENT_CAMPUS', response.data)
      })
  },
  async deleteCampus ({ commit }, id) {
    await axios.delete(`/campuses/${id}/`)
      .then(() => {
        commit('REMOVE_CAMPUS', id)
      })
  }
}

const mutations = {
  SET_CAMPUSES: (state, campuses) => (state.campuses = campuses),
  SET_CURRENT_CAMPUS: (state, campus) => (state.current_campus = campus),
  RESET_CURRENT_CAMPUS: (state) => (state.current_campus = {}),
  ADD_CAMPUS: (state, campus) => state.campuses.unshift(campus),
  UPDATE_CAMPUS: (state, updatedCampus) => {
    const index = state.campuses.findIndex(campus => campus.id === updatedCampus.id)
    if (index !== -1) {
      state.campuses.splice(index, 1, updatedCampus)
    }
  },
  REMOVE_CAMPUS: (state, id) => (state.campuses = state.campuses.filter(campus => campus.id !== id))
}

const modules = {
  loading,
  visibility,
  campusLogos,
  campusBanners
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
