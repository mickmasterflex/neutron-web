
const state = {
  campaign_fetch_loading: false,
  campaigns_fetch_loading: false,
  campaign_fetch_loading_text: 'Loading Campaign Data',
  campaigns_fetch_loading_text: 'Loading Campaigns'
}

const getters = {
  getCampaignFetchLoading: state => state.campaign_fetch_loading,
  getCampaignsFetchLoading: state => state.campaigns_fetch_loading,
  getCampaignFetchLoadingText: state => state.campaign_fetch_loading_text,
  getCampaignsFetchLoadingText: state => state.campaigns_fetch_loading_text
}

const mutations = {
  SET_CAMPAIGNS_FETCH_LOADING: (state) => (state.campaigns_fetch_loading = true),
  RESET_CAMPAIGNS_FETCH_LOADING: (state) => (state.campaigns_fetch_loading = false),
  SET_CAMPAIGN_FETCH_LOADING: (state) => (state.campaign_fetch_loading = true),
  RESET_CAMPAIGN_FETCH_LOADING: (state) => (state.campaign_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
