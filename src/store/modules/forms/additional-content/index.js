import axios from '@/axios'
import types from './types'
import loading from './loading'
import visibility from './visibility'

const modules = {
  types,
  loading,
  visibility
}

const state = {
  current_additional_form_content: {}
}

const getters = {
  getCurrentAdditionalFormContent: state => state.current_additional_form_content
}

const actions = {
  async createAdditionalFormContent ({ commit }, content) {
    commit('SET_ADDITIONAL_FORM_CONTENT_POST_LOADING')
    await axios.post('/additional-form-content/', content)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'additional_form_content_tcpa' })
      }).finally(() => {
        commit('RESET_ADDITIONAL_FORM_CONTENT_POST_LOADING')
      })
  },
  async updateAdditionalFormContent ({ commit }, content) {
    commit('SET_ADDITIONAL_FORM_CONTENT_PUT_LOADING')
    await axios.put(`/additional-form-content/${content.id}/`, content)
      .then(response => {
        commit('UPDATE_FIELD', { data: response.data, type: 'additional_form_content_tcpa' })
      }).finally(() => {
        commit('RESET_ADDITIONAL_FORM_CONTENT_PUT_LOADING')
      })
  },
  async deleteAdditionalFormContent ({ commit }, contentId) {
    await axios.delete(`/additional-form-content/${contentId}/`)
      .then(() => {
        commit('REMOVE_FIELD', { id: contentId, type: 'additional_form_content_tcpa' })
      })
  }
}

const mutations = {
  SET_CURRENT_ADDITIONAL_FORM_CONTENT: (state, content) => (state.current_additional_form_content = content),
  RESET_CURRENT_ADDITIONAL_FORM_CONTENT: (state) => (state.current_additional_form_content = {})
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
