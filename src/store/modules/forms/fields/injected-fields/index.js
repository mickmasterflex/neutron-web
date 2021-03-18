import axios from '@/axios'
import visibility from '@/store/modules/forms/fields/injected-fields/visibility'

const modules = {
  visibility
}

const state = {
  injected_fields: [],
  current_injected_field: null
}
const getters = {
  getCurrentInjectedField: state => state.current_injected_field
}

const actions = {
  async createInjectedField ({ commit }, field) {
    await axios.post('/injected-fields/', field)
      .then(response => {
        commit('ADD_INJECTED_FIELD', response.data)
      })
  },
  async updateInjectedField ({ commit }, updatedField) {
    await axios.put(`/injected-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_INJECTED_FIELD', response.data)
      })
  },
  async deleteInjectedField ({ commit }, id) {
    await axios.delete(`/injected-fields/${id}/`)
      .then(() => {
        commit('REMOVE_INJECTED_FIELD', id)
      })
  }
}

const mutations = {
  ADD_INJECTED_FIELD: (state, field) => state.current_form.injected_fields.push(field),
  UPDATE_FIELD: (state, updatedField) => {
    const index = state.current_form.injected_fields.findIndex(field => field.id === updatedField.id)
    if (index !== -1) {
      state.current_form.injected_fields.splice(index, 1, updatedField)
    }
  },
  REMOVE_INJECTED_FIELD: (state, id) => (state.current_form.injected_fields = state.current_form.injected_fields.filter(field => field.id !== id)),
  SET_CURRENT_INJECTED_FIELD: (state, form) => (state.current_form.injected_fields = form),
  RESET_CURRENT_INJECTED_FIELD: (state) => (state.current_field = null)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
