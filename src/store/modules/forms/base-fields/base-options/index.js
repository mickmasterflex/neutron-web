import axios from '@/axios'
import visibility from './visibility'

const modules = {
  visibility
}

const state = {
  modified_base_options: [],
  current_base_options: [],
  current_base_options_field_id: null
}

const getters = {
  getCurrentBaseOptions: state => state.current_base_options,
  getCurrentBaseOptionsFieldId: state => state.current_base_options_field_id,
  getModifiedBaseOptions: state => state.modified_base_options
}

const actions = {
  async createBaseOption ({ commit }, option) {
    await axios.post('/base-options/', option)
      .then(response => {
        commit('ADD_BASE_OPTION', response.data)
        commit('ADD_BASE_OPTION_FIELD_OPTION', response.data)
      })
  },
  async updateModifiedBaseOptions ({ commit }) {
    for (let i = 0; i < state.modified_base_options.length; i++) {
      const option = state.modified_base_options[i]
      await axios.put(`/base-options/${option.id}/`, option, { showSuccessToast: false })
        .then(() => {
          commit('UPDATE_BASE_OPTION_FIELD_OPTION', option)
        })
    }
  },
  async deleteBaseOption ({ commit, getters }, option) {
    await axios.delete(`/base-options/${option.id}/`)
      .then(() => {
        commit('REMOVE_BASE_OPTION', option.id)
        commit('REMOVE_BASE_OPTION_FIELD_OPTION', option)
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
  RESET_CURRENT_BASE_OPTIONS: (state) => (state.current_base_options = []),
  SORT_CURRENT_BASE_OPTIONS: (state) => (state.current_base_options = state.current_base_options.sort((a, b) => (a.order > b.order) ? 1 : -1)),
  SET_CURRENT_BASE_OPTIONS_FIELD_ID: (state, field) => (state.current_base_options_field_id = field),
  RESET_CURRENT_BASE_OPTIONS_FIELD_ID: (state) => (state.current_base_options_field_id = null),
  ADD_BASE_OPTION: (state, option) => (state.current_base_options.push(option)),
  REMOVE_BASE_OPTION: (state, id) => {
    state.current_base_options = state.current_base_options.filter(option => option.id !== id)
    state.modified_base_options = state.modified_base_options.filter(option => option.id !== id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
