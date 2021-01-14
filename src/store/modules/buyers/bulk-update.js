import axios from '@/axios'

const state = {
  bulk_update_buyers: []
}

const getters = {
  getBulkUpdateBuyers: state => state.bulk_update_buyers
}

const actions = {
  async bulkUpdateBuyerStatus (status) {
    await axios.post('/update-status/buyers/', { status: status, contracts: state.bulk_update_buyers })
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
  state,
  getters,
  actions,
  mutations
}
