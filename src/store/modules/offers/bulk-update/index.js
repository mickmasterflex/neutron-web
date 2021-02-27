import axios from '@/axios'
import shiftClick from '@/store/modules/offers/bulk-update/shift-click'
import visibility from '@/store/modules/offers/bulk-update/visibility'
import loading from '@/store/modules/offers/bulk-update/loading'

const modules = {
  shiftClick,
  loading,
  visibility
}

const state = {
  bulk_update_offers: []
}

const getters = {
  getBulkUpdateOffers: state => [...new Set(state.bulk_update_offers)]
}

const actions = {
  async bulkUpdateOfferStatus ({ commit, getters }, status) {
    commit('SET_BULK_UPDATE_OFFER_STATUS_POST_LOADING')
    await axios.post(
      '/update-status/offers/',
      { status: status, contracts: state.bulk_update_offers })
      .then(response => {
        response.data.forEach(offer => {
          const updatedOffer = { ...getters.getOfferById(offer.id) }
          updatedOffer.status = offer.status
          commit('UPDATE_OFFER', updatedOffer)
        })
      })
      .finally(() => {
        commit('RESET_BULK_UPDATE_OFFERS')
        commit('RESET_BULK_UPDATE_OFFERS_SHIFT_CLICK_INDEX')
        commit('RESET_BULK_UPDATE_OFFER_STATUS_POST_LOADING')
      })
  }
}

const mutations = {
  ADD_OFFER_TO_BULK_UPDATE: (state, offer) => {
    state.bulk_update_offers.unshift(offer)
  },
  REMOVE_OFFER_FROM_BULK_UPDATE: (state, offer) => {
    state.bulk_update_offers = state.bulk_update_offers.filter(b => b !== offer)
  },
  RESET_BULK_UPDATE_OFFERS: (state) => (state.bulk_update_offers = [])
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
