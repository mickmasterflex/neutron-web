import axios from '@/axios'

const state = {
  offers: [],
  current_offer: {},
  show_create_offer_modal: false
}

const getters = {
  getCurrentOffer: state => state.current_offer,
  getOffers: state => state.offers,
  getOffersByBuyer: (state) => (buyerId) => {
    return state.offers.filter(offer => offer.contract === buyerId)
  },
  getShowCreateOfferModal: state => state.show_create_offer_modal
}
const actions = {
  async fetchOffers ({ commit }) {
    await axios.get('/offers/')
      .then(response => {
        commit('SET_OFFERS', response.data)
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
      .then(response => {
        commit('UPDATE_OFFER', response.data)
        commit('SET_CURRENT_OFFER', response.data)
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
  REMOVE_OFFER: (state, id) => (state.offers = state.offers.filter(offer => offer.id !== id)),
  SHOW_CREATE_OFFER_MODAL: (state) => (state.show_create_offer_modal = true),
  CLOSE_CREATE_OFFER_MODAL: (state) => (state.show_create_offer_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
