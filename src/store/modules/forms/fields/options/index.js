import axios from '@/axios'
import inactiveOptions from '@/store/modules/forms/fields/options/inactive.js'

const modules = {
  inactiveOptions
}

const state = {
  current_options: [],
  modified_options: [],
  unsaved_option_changes_in_modal: false
}

const getters = {
  getCurrentOptions: state => state.current_options,
  getUnsavedOptionChangesInModal: state => state.unsaved_option_changes_in_modal
}

const actions = {
  async updateModifiedOptions ({ commit }) {
    await state.modified_options.forEach(option => {
      axios.put(`/options/${option.id}/`, option, { showSuccessToast: false })
    })
    commit('RESET_MODIFIED_OPTIONS')
  },
  async deleteOption ({ commit }, option) {
    await axios.delete(`/options/${option.id}/`)
      .then(() => {
        commit('REMOVE_OPTION', option.id)
        commit('ADD_OPTION_TO_INACTIVE', option)
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
  ADD_OPTION_TO_CURRENT_OPTIONS: (state, newOption) => {
    const index = state.current_options.findIndex(option => option.id === newOption.id)
    if (index !== -1) {
      state.current_options.splice(index, 1, newOption)
    } else {
      state.current_options.push(newOption)
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
  RESET_CURRENT_OPTIONS: (state) => (state.current_options = []),
  REMOVE_OPTION: (state, id) => {
    state.current_options = state.current_options.filter(option => option.id !== id)
    state.modified_options = state.modified_options.filter(option => option.id !== id)
  },
  SET_UNSAVED_OPTION_CHANGES: (state) => (state.unsaved_option_changes_in_modal = true),
  RESET_UNSAVED_OPTION_CHANGES: (state) => (state.unsaved_option_changes_in_modal = false)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
