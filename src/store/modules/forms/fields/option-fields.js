import axios from '@/axios'

const state = {}
const getters = {}

const actions = {
  async deleteOptionField ({ commit }, id) {
    await axios.delete(`/option-fields/${id}/`)
      .then(() => {
        commit('REMOVE_FIELD', id)
      })
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
