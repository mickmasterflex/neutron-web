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
        console.log(response)
        console.log(response.data)
        commit('ADD_FIELD', { data: response.data, type: 'additional_form_content_tcpa' })
        // commit('ADD_ADDITIONAL_FORM_CONTENT', response.data)
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
