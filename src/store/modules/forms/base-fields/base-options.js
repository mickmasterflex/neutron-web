import axios from '@/axios'

const state = {
  modified_base_options: []
}

const getters = {
  getModifiedBaseOptions: state => state.modified_base_options
}

const actions = {
  async createBaseOption ({ commit }, option) {
    await axios.post('/base-options/', option)
  },
  async updateModifiedBaseOptions ({ commit }) {
    await state.modified_base_options.forEach(option => {
      axios.put(`/base-options/${option.id}/`, option)
    })
    commit('RESET_MODIFIED_BASE_OPTIONS')
  },
  async deleteBaseOption ({ commit }, id) {
    await axios.delete(`/base-options/${id}/`, id)
  }
}

const mutations = {
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
