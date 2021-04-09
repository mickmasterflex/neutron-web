import axios from '@/axios'
import types from './types'
import visibility from './visibility'

const modules = {
  types,
  visibility
}

const state = {

}

const getters = {

}

const actions = {
  async createAdditionalFormContent ({ commit }, content) {
    await axios.post('/additional-form-content/', content)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'additional_form_content_tcpa' })
      })
  },
  async deleteAdditionalFormContent ({ commit }, contentId) {
    await axios.delete(`/additional-form-content/${contentId}/`)
      .then(response => {
        commit('REMOVE_FIELD', { id: contentId, type: 'additional_form_content_tcpa' })
      })
  }
}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
