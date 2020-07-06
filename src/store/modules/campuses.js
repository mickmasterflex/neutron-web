import axios from '@/axios'

const state = {
  campuses: [],
  current_campus: {},
  show_create_campus_modal: false
}

const getters = {
  getAllCampuses: state => state.campuses,
  getCurrentCampus: state => state.current_campus,
  getCampusesByBrand: (state) => (brandId) => {
    return state.campuses.filter(campaign => campaign.brand === brandId)
  },
  getAllCampusesCount: (state) => {
    return state.campuses.length
  },
  getShowCreateCampusModal: state => state.show_create_campus_modal
}

const actions = {
  async fetchCampuses ({ commit }) {
    await axios.get('/campuses/')
      .then(response => {
        commit('SET_CAMPUSES', response.data)
      })
  },
  async fetchCurrentCampus ({ commit }, id) {
    await axios.get(`/campuses/${id}/`)
      .then(response => {
        commit('SET_CURRENT_CAMPUS', response.data)
      })
  },
  async createCampus ({ commit }, campus) {
    await axios.post('/campuses/', campus)
      .then(response => {
        commit('ADD_CAMPUS', response.data)
      }).catch(error => {
        window.console.log(error)
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
  ADD_CAMPUS: (state, campus) => state.campuses.unshift(campus),
  UPDATE_CAMPUS: (state, updatedCampus) => {
    const index = state.campuses.findIndex(campus => campus.id === updatedCampus.id)
    if (index !== -1) {
      state.campuses.splice(index, 1, updatedCampus)
    }
  },
  REMOVE_CAMPUS: (state, id) => (state.campuses = state.campuses.filter(campus => campus.id !== id)),
  SHOW_CREATE_CAMPUS_MODAL: (state) => (state.show_create_campus_modal = true),
  CLOSE_CREATE_CAMPUS_MODAL: (state) => (state.show_create_campus_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
