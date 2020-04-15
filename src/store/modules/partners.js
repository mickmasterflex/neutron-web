import axios from '@/axios'

const state = {
  partners: []
}
const getters = {
  getAllPartners: state => state.partners,
  getAllPartnersCount: (state) => {
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
  async fetchPartners ({ commit }) {
    await axios.get('/partners/')
      .then(response => {
        commit('SET_PARTNERS', response.data)
      })
  },
  async createPartnerContract ({ commit }, partner) {
    await axios.post('/partners/', partner)
      .then(response => {
        commit('ADD_PARTNER', response.data)
      })
  },
  async updatePartnerContract ({ commit }, updatedPartner) {
    await axios.put(`/partners/${updatedPartner.id}/`, updatedPartner)
      .then(() => {
        commit('UPDATE_PARTNER', updatedPartner)
      })
  },
  async deletePartnerContract ({ commit }, id) {
    await axios.delete(`/partners/${id}/`)
      .then(() => {
        commit('REMOVE_PARTNER', id)
      })
  }
}
const mutations = {
  SET_PARTNERS: (state, partners) => (state.partners = partners),
  ADD_PARTNER: (state, partner) => state.partners.unshift(partner),
  UPDATE_PARTNER: (state, updatedPartner) => {
    const index = state.partners.findIndex(partner => partner.id === updatedPartner.id)
    if (index !== -1) {
      state.partners.splice(index, 1, updatedPartner)
    }
  },
  REMOVE_PARTNER: (state, id) => (state.partners = state.partners.filter(partner => partner.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
