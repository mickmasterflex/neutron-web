import axios from '@/axios'
import bulkUpdate from '@/store/modules/offers/bulk-update'
import loading from '@/store/modules/offers/loading'
import visibility from '@/store/modules/offers/visibility'

const modules = {
  bulkUpdate,
  loading,
  visibility
}

const state = {
  offers: [],
  current_offer: {}
}

const getters = {
  getCurrentOffer: state => state.current_offer,
  getOffersByBuyer: (state) => (buyerId) => {
    return state.offers.filter(offer => offer.parent === buyerId)
  },
  getOffersByProduct: (state) => (productId) => {
    return state.offers.filter(offer => offer.offer_data.product_id === productId)
  },
  getOfferById: (state) => (offerId) => {
    return state.offers.filter(offer => offer.id === offerId)[0]
  },
  getOfferByCapParentId: (state) => (capParentId) => {
    return state.offers.find(offer => offer.caps.id === capParentId)
  }
}

const actions = {
  async fetchOffers ({ commit }) {
    commit('SET_OFFERS_FETCH_LOADING')
    await axios.get('/offer-contracts/')
      .then(response => {
        commit('SET_OFFERS', response.data)
        commit('RESET_OFFERS_FETCH_LOADING')
      })
  },
  async fetchCurrentOffer ({ commit }, id) {
    commit('SET_OFFER_FETCH_LOADING')
    await axios.get(`/offer-contracts/${id}/`)
      .then(response => {
        commit('SET_CURRENT_OFFER', response.data)
        commit('SET_CURRENT_CLIENT_DATA', response.data.client_data)
        commit('SET_CURRENT_ANCESTORS', response.data.buyer_ancestors)
        commit('SET_CURRENT_FORM', response.data.form)
        commit('SORT_CURRENT_FORM_FIELDS')
      })
      .finally(() => {
        commit('RESET_OFFER_FETCH_LOADING')
      })
  },
  async createOffer ({ commit, getters }, offer) {
    await axios.post('/offer-contracts/', offer)
      .then(response => {
        commit('ADD_OFFER', response.data)
        const parent = getters.getBuyerById(response.data.parent)
        if (parent) {
          parent.offer_contracts.push(response.data.id)
          commit('UPDATE_BUYER', parent)
        }
      })
  },
  async updateOffer ({ commit }, updatedOffer) {
    await axios.put(`/offer-contracts/${updatedOffer.id}/`, updatedOffer)
      .then(response => {
        commit('UPDATE_OFFER', response.data)
        commit('SET_CURRENT_OFFER', response.data)
        commit('SET_CURRENT_ANCESTORS', response.data.buyer_ancestors)
      })
  },
  async deleteOffer ({ commit }, id) {
    await axios.delete(`/offer-contracts/${id}/`)
      .then(() => {
        commit('REMOVE_OFFER', id)
      })
  }
}

const mutations = {
  SET_OFFERS: (state, offers) => (state.offers = offers),
  SET_CURRENT_OFFER: (state, offer) => (state.current_offer = offer),
  RESET_CURRENT_OFFER: (state, offer) => (state.current_offer = {}),
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
  modules,
  state,
  getters,
  actions,
  mutations
}
