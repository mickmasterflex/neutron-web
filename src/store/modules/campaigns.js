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
  async fetchCampaigns ({ commit }) {
    await axios.get('/campaigns/')
      .then(response => {
        commit('SET_CAMPAIGNS', response.data)
      })
  },
  async fetchCurrentCampaign ({ commit }, id) {
    await axios.get(`/campaigns/${id}/`)
      .then(response => {
        commit('SET_CURRENT_CAMPAIGN', response.data)
      })
  },
  async createCampaign ({ commit }, campaign) {
    await axios.post('/campaigns/', campaign)
      .then(response => {
        commit('ADD_CAMPAIGN', response.data)
      })
  },
  async updateCampaign ({ commit }, updatedCampaign) {
    await axios.put(`/campaigns/${updatedCampaign.id}/`, updatedCampaign)
      .then(() => {
        commit('UPDATE_CAMPAIGN', updatedCampaign)
        commit('SET_CURRENT_CAMPAIGN', updatedCampaign)
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
  state,
  getters,
  actions,
  mutations
}
