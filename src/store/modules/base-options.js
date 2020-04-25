import axios from '@/axios'

const state = {
  base_options: []
  // current_base_options: []
}

const getters = {
  // getOptionsByField: (state) => (fieldId) => {
  //   return state.base_options.filter(option => option.field_id === fieldId)
  // },
  // getCurrentBaseOptions: state => state.current_base_options
}

const actions = {
  // async fetchBaseOptions ({ commit }) {
  //   await axios.get('/base-options/')
  //     .then(response => {
  //       commit('SET_BASE_OPTIONS', response.data)
  //     })
  // },
  // async fetchOptionsByField ({ commit }, fieldId) {
  //   await axios.get(`/base-options/?field=${fieldId}`)
  //     .then(response => {
  //       commit('SET_CURRENT_BASE_OPTIONS', response.data)
  //     })
  // },
  // async createBaseOption ({ commit }, option) {
  //   await axios.get('/base-options/', option)
  //     .then(response => {
  //       commit('CREATE_BASE_OPTION', response.data)
  //     })
  // },
  async updateBaseOption ({ commit }, option) {
    await axios.put(`/base-options/${option.id}/`, option)
      .then(response => {
        commit('UPDATE_BASE_OPTION')
      })
      .catch(error => {
        console.log(error)
      })
  }
}
const mutations = {
  // SET_BASE_OPTIONS: (state, options) => (state.options = options),
  // SET_CURRENT_BASE_OPTIONS: (state, options) => (state.current_base_options = options),
  // RESET_CURRENT_BASE_OPTIONS: (state) => (state.current_base_options = []),
  // CREATE_BASE_OPTION: (state, option) => state.base_options.unshift(option),
  UPDATE_BASE_OPTION: (state, updatedOption) => {
    const index = state.base_options.findIndex(option => option.id === updatedOption.id)
    if (index !== -1) {
      state.base_options.splice(index, 1, updatedOption)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
