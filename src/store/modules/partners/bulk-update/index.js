import axios from '@/axios'
import visibility from '@/store/modules/partners/bulk-update/visibility'
import loading from '@/store/modules/partners/bulk-update/loading'

const modules = {
  loading,
  visibility
}

const state = {
  bulk_update_partners: []
}

const getters = {
  getBulkUpdatePartners: state => state.bulk_update_partners
}

const actions = {
  async bulkUpdatePartnerStatus ({ commit, getters }, status) {
    commit('SET_BULK_UPDATE_PARTNER_STATUS_POST_LOADING')
    await axios.post(
      '/update-status/partners/',
      { status: status, contracts: state.bulk_update_partners })
      .then(response => {
        response.data.forEach(partner => {
          const updatedPartner = { ...getters.getPartnerById(partner.id) }
          updatedPartner.status = partner.status
          commit('UPDATE_PARTNER', updatedPartner)
        })
      })
      .finally(() => {
        commit('RESET_BULK_UPDATE_PARTNERS')
        commit('RESET_BULK_UPDATE_PARTNER_STATUS_POST_LOADING')
      })
  }
}

const mutations = {
  ADD_PARTNER_TO_BULK_UPDATE: (state, partner) => {
    state.bulk_update_partners.unshift(partner)
  },
  REMOVE_PARTNER_FROM_BULK_UPDATE: (state, partner) => {
    state.bulk_update_partners = state.bulk_update_partners.filter(b => b !== partner)
  },
  RESET_BULK_UPDATE_PARTNERS: (state) => (state.bulk_update_partners = [])
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
