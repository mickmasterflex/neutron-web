import axios from '@/axios'

const state = {
  base_options: [],
  modified_base_options: []
}

const getters = {
  getModifiedBaseOptions: state => state.modified_base_options
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
      .then(() => {
        commit('UPDATE_BASE_OPTION')
      })
  },
  async updateModifiedBaseOptions ({ commit, dispatch }) {
    state.modified_base_options.forEach(option => {
      dispatch('updateBaseOption', option)
    })
    commit('RESET_MODIFIED_BASE_OPTIONS')
  },
  async deleteBaseOption ({ commit }, id) {
    await axios.delete(`/base-options/${id}/`, id)
      .then(() => {
        commit('REMOVE_BASE_OPTION', id)
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
  },
  ADD_BASE_OPTION_TO_MODIFIED: (state, modifiedOption) => {
    const index = state.modified_base_options.findIndex(option => option.id === modifiedOption.id)
    if (index !== -1) {
      state.modified_base_options.splice(index, 1, modifiedOption)
    } else {
      state.modified_base_options.unshift(modifiedOption)
    }
  },
  RESET_MODIFIED_BASE_OPTIONS: (state) => {
    state.modified_base_options = []
  },
  REMOVE_BASE_OPTION: (state, id) => (state.base_options = state.base_options.filter(option => option.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
