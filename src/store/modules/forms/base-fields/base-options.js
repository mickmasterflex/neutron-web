import axios from '@/axios'

const state = {
  modified_base_options: [],
  current_base_options: [],
  unsaved_base_option_changes_in_modal: false
}

const getters = {
  getCurrentBaseOptions: state => state.current_base_options,
  getUnsavedBaseOptionChangesInModal: state => state.unsaved_base_option_changes_in_modal
}

const actions = {
  async createBaseOption ({ commit }, option) {
    await axios.post('/base-options/', option)
      .then(response => {
        commit('ADD_BASE_OPTION', response.data)
      })
  },
  async updateModifiedBaseOptions ({ commit }) {
    await state.modified_base_options.forEach(option => {
      axios.put(`/base-options/${option.id}/`, option, { showSuccessToast: false })
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
  ADD_BASE_OPTION_TO_MODIFIED: (state, modifiedOption) => {
    const index = state.modified_base_options.findIndex(option => option.id === modifiedOption.id)
    if (index !== -1) {
      state.modified_base_options.splice(index, 1, modifiedOption)
    } else {
      state.modified_base_options.unshift(modifiedOption)
    }
  },
  UPDATE_BASE_OPTION_ORDER: (state, payload) => {
    const index = state.current_base_options.findIndex(option => option.id === payload.id)
    if (index !== -1) {
      state.current_base_options[index].order = payload.order
    }
  },
  RESET_MODIFIED_BASE_OPTIONS: (state) => (state.modified_base_options = []),
  SET_CURRENT_BASE_OPTIONS: (state, options) => (state.current_base_options = options),
  SORT_CURRENT_BASE_OPTIONS: (state) => (state.current_base_options = state.current_base_options.sort((a, b) => (a.order > b.order) ? 1 : -1)),
  ADD_BASE_OPTION: (state, option) => (state.current_base_options.push(option)),
  REMOVE_BASE_OPTION: (state, id) => {
    state.current_base_options = state.current_base_options.filter(option => option.id !== id)
    state.modified_base_options = state.modified_base_options.filter(option => option.id !== id)
  },
  RESET_CURRENT_BASE_OPTIONS: (state) => (state.current_base_options = []),
  SET_UNSAVED_BASE_OPTION_CHANGES: (state) => (state.unsaved_base_option_changes_in_modal = true),
  RESET_UNSAVED_BASE_OPTION_CHANGES: (state) => (state.unsaved_base_option_changes_in_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
