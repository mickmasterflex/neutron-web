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
        // commit('createPartner')
      })
  },
  async updatePartnerContract ({ commit }, updatedPartner) {
    await axios.put(`/partners/${updatedPartner.id}/`, updatedPartner)
      .then(response => {
        commit('updatePartner', updatedPartner)
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
  setPartners: (state, partners) => (state.partners = partners),
  updatePartner: (state, updatedPartner) => {
    const index = state.partners.findIndex(partner => partner.id === updatedPartner.id)
    if (index !== -1) {
      state.partners.splice(index, 1, updatedPartner)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
