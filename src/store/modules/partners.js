import axios from '@/axios'

const state = {
  partners: []
}
const getters = {
  allPartners: state => state.partners,
  allPartnersCount: (state) => {
    return state.partners.length
  },
  getPartnersByClient: (state) => (clientId) => {
    return state.partners.filter(partner => partner.client === clientId)
  },
  getPartnerById: (state) => (id) => {
    return state.partners.find(partner => partner.id === id)
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
        commit('createPartner', response.data)
      })
  },
  async updatePartnerContract ({ commit }, updatedPartner) {
    await axios.put(`/partners/${updatedPartner.id}/`, updatedPartner)
      .then(() => {
        commit('updatePartner', updatedPartner)
      })
  },
  async deletePartnerContract ({ commit }, id) {
    await axios.delete(`/partners/${id}/`)
      .then(() => {
        commit('deletePartner', id)
      })
  }
}
const mutations = {
  setPartners: (state, partners) => (state.partners = partners),
  createPartner: (state, partner) => state.partners.unshift(partner),
  updatePartner: (state, updatedPartner) => {
    const index = state.partners.findIndex(partner => partner.id === updatedPartner.id)
    if (index !== -1) {
      state.partners.splice(index, 1, updatedPartner)
    }
  },
  deletePartner: (state, id) => (state.partners = state.partners.filter(partner => partner.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
