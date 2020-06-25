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
  },
  async deleteOption ({ commit }, id) {
    await axios.delete(`/options/${id}/`)
      .then(() => {
        commit('REMOVE_OPTION', id)
      })
  }
}

const mutations = {
  SET_CURRENT_OPTIONS: (state, options) => (state.current_options = options),
  SORT_CURRENT_OPTIONS: (state) => (state.current_options = state.current_options.sort((a, b) => (a.order > b.order) ? 1 : -1)),
  UPDATE_OPTION_ORDER: (state, payload) => {
    const index = state.current_options.findIndex(option => option.id === payload.id)
    if (index !== -1) {
      state.current_options[index].order = payload.order
    }
  },
  ADD_OPTION_TO_MODIFIED: (state, modifiedOption) => {
    const index = state.modified_options.findIndex(option => option.id === modifiedOption.id)
    if (index !== -1) {
      state.modified_options.splice(index, 1, modifiedOption)
    } else {
      state.modified_options.unshift(modifiedOption)
    }
  },
  RESET_MODIFIED_OPTIONS: (state) => (state.modified_options = []),
  REMOVE_OPTION: (state, id) => {
    state.current_options = state.current_options.filter(option => option.id !== id)
    state.modified_options = state.modified_options.filter(option => option.id !== id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
