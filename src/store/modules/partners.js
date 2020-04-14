import axios from '@/axios'

const state = {
  partners: []
}
const getters = {
  allPartners: state => state.partners,
  getPartnersByClient: (state) => (clientId) => {
    return state.partners.filter(partner => partner.client === clientId)
  }
}

const actions = {
  async getPartners ({ commit }) {
    await axios.get('/partners/')
      .then(response => {
        commit('setPartners', response.data)
      })
  },
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
const mutations = {
  setPartners: (state, partners) => (state.partners = partners)
}

export default {
  state,
  getters,
  actions,
  mutations
}
