import axios from '@/axios'

const state = {
  partners: []
}
const getters = {}

const actions = {
  async createPartnerContract ({ commit }, partner) {
    await axios.post('/partners/', partner)
      .then(response => {
        // commit('createPartner')
      })
  },
  async updatePartnerContract ({ commit }, updatedPartner) {
    await axios.put(`/partners/${updatedPartner.id}/`, updatedPartner)
      .then(response => {
        // commit('updatePartner')
      })
  },
  async deletePartnerContract ({ commit }, id) {
    await axios.delete(`/partners/${id}/`)
      .then(response => {
        // commit('removePartner')
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
