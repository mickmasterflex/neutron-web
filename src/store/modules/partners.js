import axios from '@/axios'

const state = {
  partners: [],
  current_partner: {}
}
const getters = {
  getAllPartners: state => state.partners,
  getCurrentPartner: state => state.current_partner,
  getAllPartnersCount: (state) => {
    return state.partners.length
  },
  getPartnersByClient: (state) => (clientId) => {
    return state.partners.filter(partner => partner.client === clientId)
  },
  getPartnerSiblings: (state, getters) => {
    const siblings = getters.getPartnersByClient(state.current_partner.client)
    const index = siblings.findIndex(partner => partner.id === state.current_partner.id)
    if (index !== -1) {
      siblings.splice(index, 1)
    }
    return siblings
  }
}

const actions = {
  async fetchPartners ({ commit }) {
    await axios.get('/partners/')
      .then(response => {
        commit('SET_PARTNERS', response.data)
      })
  },
  async fetchCurrentPartner ({ commit }, id) {
    await axios.get(`/partners/${id}/`)
      .then(response => {
        commit('SET_CURRENT_PARTNER', response.data)
      })
  },
  async createPartner ({ commit }, partner) {
    await axios.post('/partners/', partner)
      .then(response => {
        commit('ADD_PARTNER', response.data)
      })
  },
  async updatePartner ({ commit }, updatedPartner) {
    await axios.put(`/partners/${updatedPartner.id}/`, updatedPartner)
      .then(response => {
        commit('UPDATE_PARTNER', response.data)
        commit('SET_CURRENT_PARTNER', response.data)
      })
  },
  async deletePartner ({ commit }, id) {
    await axios.delete(`/partners/${id}/`)
      .then(() => {
        commit('REMOVE_PARTNER', id)
      })
  }
}
const mutations = {
  SET_PARTNERS: (state, partners) => (state.partners = partners),
  SET_CURRENT_PARTNER: (state, partner) => (state.current_partner = partner),
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
