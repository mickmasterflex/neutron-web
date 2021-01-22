import shiftClick from '@/store/modules/contract-relations/bulk-update/shift-click'
import loading from '@/store/modules/contract-relations/bulk-update/loading'
import axios from '@/axios'

const modules = {
  shiftClick,
  loading
}

const state = {
  bulk_update_suppressions: []
}

const getters = {
  getBulkUpdateSuppressionsBuyers: state => {
    return [...new Set(state.bulk_update_suppressions.map((relation) => relation.buyer_contract))]
  },
  getBulkUpdateSuppressionsPartners: state => {
    return [...new Set(state.bulk_update_suppressions.map((relation) => relation.partner_contract))]
  }
}

const actions = {
  async bulkUpdateSuppressions ({ commit, getters }, status) {
    commit('SET_BULK_UPDATE_SUPPRESSIONS_POST_LOADING')
    await axios.post(
      '/bulk-update-suppressions/',
      {
        suppressed: status,
        buyer_contracts: getters.getBulkUpdateSuppressionsBuyers,
        partner_contracts: getters.getBulkUpdateSuppressionsPartners
      })
      .then(response => {
        response.data.forEach(relation => {
          commit('UPDATE_CONTRACT_RELATION_SUPPRESSION', relation)
        })
      })
      .finally(() => {
        commit('RESET_BULK_UPDATE_SUPPRESSIONS')
        commit('RESET_BULK_UPDATE_SUPPRESSIONS_SHIFT_CLICK_INDEX')
        commit('RESET_BULK_UPDATE_SUPPRESSIONS_POST_LOADING')
      })
  }
}

const mutations = {
  ADD_SUPPRESSION_TO_BULK_UPDATE: (state, suppression) => {
    state.bulk_update_suppressions.unshift(suppression)
  },
  RESET_BULK_UPDATE_SUPPRESSIONS: (state) => (state.bulk_update_suppressions = [])
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
