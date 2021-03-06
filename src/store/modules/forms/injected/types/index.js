import axios from '@/axios'
import visibility from './visibility'
import loading from './loading'

const modules = {
  visibility,
  loading
}

const state = {
  injected_field_types: [],
  current_injected_field_type: null
}
const getters = {
  getCurrentInjectedFieldType: state => state.current_injected_field_type,
  getInjectedFieldTypes: state => state.injected_field_types,
  getInjectedFieldTypeById: (state) => (id) => state.injected_field_types.find(type => type.id === id),
  getInjectedFieldTypesCount: state => state.injected_field_types.length
}

const actions = {
  async fetchInjectedFieldTypes ({ commit }) {
    commit('SET_INJECTED_FIELD_TYPES_FETCH_LOADING')
    await axios.get('/injected-field-types/')
      .then(response => {
        commit('SET_INJECTED_FIELD_TYPES', response.data)
        commit('RESET_INJECTED_FIELD_TYPES_FETCH_LOADING')
      })
  },
  async createInjectedFieldType ({ commit }, injectedFieldType) {
    commit('SET_INJECTED_FIELD_TYPES_POST_LOADING')
    await axios.post('/injected-field-types/', injectedFieldType)
      .then(response => {
        commit('ADD_INJECTED_FIELD_TYPE', response.data)
        commit('RESET_INJECTED_FIELD_TYPES_POST_LOADING')
      })
  },
  async updateInjectedFieldType ({ commit }, updatedInjectedFieldType) {
    commit('SET_INJECTED_FIELD_TYPES_PUT_LOADING')
    await axios.put(`/injected-field-types/${updatedInjectedFieldType.id}/`, updatedInjectedFieldType)
      .then(response => {
        commit('UPDATE_INJECTED_FIELD_TYPE', response.data)
        commit('SET_CURRENT_INJECTED_FIELD_TYPE', response.data)
        commit('RESET_INJECTED_FIELD_TYPES_PUT_LOADING')
      })
  },
  async deleteInjectedFieldType ({ commit }, id) {
    await axios.delete(`/injected-field-types/${id}/`)
      .then(() => {
        commit('REMOVE_INJECTED_FIELD_TYPE', id)
      })
  }
}

const mutations = {
  SET_INJECTED_FIELD_TYPES: (state, injectedFieldTypes) => (state.injected_field_types = injectedFieldTypes),
  SET_CURRENT_INJECTED_FIELD_TYPE: (state, injectedFieldType) => (state.current_injected_field_type = injectedFieldType),
  RESET_CURRENT_INJECTED_FIELD_TYPE: (state) => (state.current_injected_field_type = null),
  ADD_INJECTED_FIELD_TYPE: (state, injectedFieldType) => state.injected_field_types.unshift(injectedFieldType),
  UPDATE_INJECTED_FIELD_TYPE: (state, updatedInjectedFieldType) => {
    const index = state.injected_field_types.findIndex(injectedFieldType => injectedFieldType.id === updatedInjectedFieldType.id)
    if (index !== -1) {
      state.injected_field_types.splice(index, 1, updatedInjectedFieldType)
    }
  },
  REMOVE_INJECTED_FIELD_TYPE: (state, id) => (state.injected_field_types = state.injected_field_types.filter(injectedFieldType => injectedFieldType.id !== id))
}
export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
