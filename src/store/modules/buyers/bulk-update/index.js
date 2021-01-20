import axios from '@/axios'
import visibility from '@/store/modules/buyers/bulk-update/visibility'
import loading from '@/store/modules/buyers/bulk-update/loading'

const modules = {
  loading,
  visibility
}

const state = {
  bulk_update_buyers: []
}

const getters = {
  getBulkUpdateBuyers: state => state.bulk_update_buyers
}

const actions = {
  async bulkUpdateBuyerStatus ({ commit, getters }, status) {
    commit('SET_BULK_UPDATE_BUYER_STATUS_POST_LOADING')
    await axios.post(
      '/update-status/buyers/',
      { status: status, contracts: state.bulk_update_buyers })
      .then(response => {
        response.data.forEach(buyer => {
          const updatedBuyer = { ...getters.getBuyerById(buyer.id) }
          updatedBuyer.status = buyer.status
          commit('UPDATE_BUYER', updatedBuyer)
        })
      })
      .finally(() => {
        commit('RESET_BULK_UPDATE_BUYERS')
        commit('RESET_BULK_UPDATE_BUYER_STATUS_POST_LOADING')
      })
  }
}

const mutations = {
  ADD_BUYER_TO_BULK_UPDATE: (state, buyer) => {
    state.bulk_update_buyers.unshift(buyer)
  },
  REMOVE_BUYER_FROM_BULK_UPDATE: (state, buyer) => {
    state.bulk_update_buyers = state.bulk_update_buyers.filter(b => b !== buyer)
  },
  RESET_BULK_UPDATE_BUYERS: (state) => (state.bulk_update_buyers = [])
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
