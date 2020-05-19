import axios from '@/axios'

const state = {
  current_options: [],
  modified_options: []
}

const getters = {
  getCurrentOptions: state => state.current_options
}

const actions = {
  async updateModifiedOptions ({ commit }) {
    await state.modified_options.forEach(option => {
      axios.put(`/options/${option.id}/`, option)
    })
    commit('RESET_MODIFIED_OPTIONS')
  }
}

const mutations = {
  SET_CURRENT_OPTIONS: (state, options) => (state.current_options = options),
  ADD_OPTION_TO_MODIFIED: (state, modifiedOption) => {
    const index = state.modified_options.findIndex(option => option.id === modifiedOption.id)
    if (index !== -1) {
      state.modified_options.splice(index, 1, modifiedOption)
    } else {
      state.modified_options.unshift(modifiedOption)
    }
  },
  RESET_MODIFIED_OPTIONS: (state) => {
    state.modified_options = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
