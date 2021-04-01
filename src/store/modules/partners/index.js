import axios from '@/axios'
import bulkUpdate from '@/store/modules/partners/bulk-update'
import visibility from '@/store/modules/partners/visibility'
import loading from '@/store/modules/partners/loading'

const modules = {
  bulkUpdate,
  loading,
  visibility
}

const state = {
  partners: [],
  current_partner: {}
}

const getters = {
  getAllPartners: state => state.partners,
  getCurrentPartner: state => state.current_partner,
  getPartnersByClient: (state) => (clientId) => {
    return state.partners.filter(partner => partner.client === clientId)
  },
  getParentlessPartnersByClient: (state) => (clientId) => {
    return state.partners.filter(partner => partner.client === clientId).filter(partner => partner.parent === null)
  },
  getCurrentPartnerSiblings: (state, getters) => {
    if (state.current_partner.client) {
      const siblings = getters.getPartnersByClient(state.current_partner.client)
      const index = siblings.findIndex(partner => partner.id === state.current_partner.id)
      if (index !== -1) {
        siblings.splice(index, 1)
      }
      return siblings
    }
  },
  getPartnersByParent: (state) => (partnerId) => {
    return state.partners.filter(partner => partner.parent === partnerId)
  },
  getPartnerById: (state) => (partnerId) => {
    return state.partners.filter(partner => partner.id === partnerId)[0]
  }
}

const actions = {
  async fetchPartners ({ commit }) {
    commit('SET_PARTNERS_FETCH_LOADING')
    await axios.get('/partners/')
      .then(response => {
        commit('SET_PARTNERS', response.data)
        commit('RESET_PARTNERS_FETCH_LOADING')
      })
  },
  async fetchCurrentPartner ({ commit }, id) {
    commit('SET_PARTNER_FETCH_LOADING')
    await axios.get(`/partners/${id}/`)
      .then(response => {
        commit('SET_CURRENT_PARTNER', response.data)
        commit('SET_CURRENT_CONTRACT_ANCESTORS', response.data.ancestors)
        commit('RESET_PARTNER_FETCH_LOADING')
      })
  },
  async createPartner ({ commit, getters }, partner) {
    await axios.post('/partners/', partner)
      .then(response => {
        commit('ADD_PARTNER', response.data)
        const parent = getters.getPartnerById(response.data.parent)
        if (parent) {
          parent.children.push(response.data.id)
          commit('UPDATE_PARTNER', parent)
        }
      })
  },
  async updatePartner ({ commit }, updatedPartner) {
    await axios.put(`/partners/${updatedPartner.id}/`, updatedPartner)
      .then(response => {
        commit('UPDATE_PARTNER', response.data)
        commit('SET_CURRENT_PARTNER', response.data)
        commit('SET_CURRENT_CONTRACT_ANCESTORS', response.data.ancestors)
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
  RESET_CURRENT_PARTNER: (state) => (state.current_partner = {}),
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
  modules,
  state,
  getters,
  actions,
  mutations
}
