import axios from '@/axios'

const state = {
  campaigns: [],
  current_campaign: {}
}

const getters = {
  getCurrentCampaign: state => state.current_campaign,
  getCampaignsByPartner: (state) => (partnerId) => {
    return state.campaigns.filter(campaign => campaign.contract === partnerId)
  }
}
const actions = {
  async fetchCampaign ({ commit }) {
    await axios.get('/campaigns/')
      .then(response => {
        commit('SET_CAMPAIGNS', response.data)
      })
  },
  async fetchCurrentOffer ({ commit }, id) {
    await axios.get(`/offers/${id}/`)
      .then(response => {
        commit('SET_CURRENT_OFFER', response.data)
      })
  },
  async createOffer ({ commit }, offer) {
    await axios.post('/offers/', offer)
      .then(response => {
        commit('ADD_OFFER', response.data)
      })
  },
  async updateOffer ({ commit }, updatedOffer) {
    await axios.put(`/offers/${updatedOffer.id}/`, updatedOffer)
      .then(() => {
        commit('UPDATE_OFFER', updatedOffer)
        commit('SET_CURRENT_OFFER', updatedOffer)
      })
  },
  async deleteOffer ({ commit }, id) {
    await axios.delete(`/offers/${id}/`)
      .then(() => {
        commit('REMOVE_OFFER', id)
      })
  }
}

const mutations = {
  SET_OFFERS: (state, offers) => (state.offers = offers),
  SET_CURRENT_OFFER: (state, offer) => (state.current_offer = offer),
  ADD_OFFER: (state, offer) => state.offers.unshift(offer),
  UPDATE_OFFER: (state, updatedOffer) => {
    const index = state.offers.findIndex(offer => offer.id === updatedOffer.id)
    if (index !== -1) {
      state.offers.splice(index, 1, updatedOffer)
    }
  },
  REMOVE_OFFER: (state, id) => (state.offers = state.offers.filter(offer => offer.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
