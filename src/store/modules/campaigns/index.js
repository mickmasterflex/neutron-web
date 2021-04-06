import axios from '@/axios'
import loading from '@/store/modules/campaigns/loading'
import visibility from '@/store/modules/campaigns/visibility'

const modules = {
  loading,
  visibility
}

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
  async fetchCampaigns ({ commit }) {
    commit('SET_CAMPAIGNS_FETCH_LOADING')
    await axios.get('/campaigns/')
      .then(response => {
        commit('SET_CAMPAIGNS', response.data)
        commit('RESET_CAMPAIGNS_FETCH_LOADING')
      })
  },
  async fetchCurrentCampaign ({ commit }, id) {
    commit('SET_CAMPAIGN_FETCH_LOADING')
    await axios.get(`/campaigns/${id}/`)
      .then(response => {
        commit('SET_CURRENT_CAMPAIGN', response.data)
        commit('SET_CURRENT_ANCESTORS', response.data.partner_ancestors)
        commit('RESET_CAMPAIGN_FETCH_LOADING')
      })
  },
  async createCampaign ({ commit, getters }, campaign) {
    await axios.post('/campaigns/', campaign)
      .then(response => {
        commit('ADD_[CAMPAIGN', response.data)
        const parent = getters.getPartnerById(response.data.contract)
        if (parent) {
          parent.campaigns.push(response.data.id)
          commit('UPDATE_PARTNER', parent)
        }
      })
  },
  async updateCampaign ({ commit }, updatedCampaign) {
    await axios.put(`/campaigns/${updatedCampaign.id}/`, updatedCampaign)
      .then(response => {
        commit('UPDATE_CAMPAIGN', response.data)
        commit('SET_CURRENT_CAMPAIGN', response.data)
      })
  },
  async deleteCampaign ({ commit }, id) {
    await axios.delete(`/campaigns/${id}/`)
      .then(() => {
        commit('REMOVE_CAMPAIGN', id)
      })
  }
}

const mutations = {
  SET_CAMPAIGNS: (state, campaigns) => (state.campaigns = campaigns),
  SET_CURRENT_CAMPAIGN: (state, campaign) => (state.current_campaign = campaign),
  RESET_CURRENT_CAMPAIGN: (state) => (state.current_campaign = {}),
  ADD_CAMPAIGN: (state, campaign) => state.campaigns.unshift(campaign),
  UPDATE_CAMPAIGN: (state, updatedCampaign) => {
    const index = state.campaigns.findIndex(campaign => campaign.id === updatedCampaign.id)
    if (index !== -1) {
      state.campaigns.splice(index, 1, updatedCampaign)
    }
  },
  REMOVE_CAMPAIGN: (state, id) => (state.campaigns = state.campaigns.filter(campaign => campaign.id !== id))
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
