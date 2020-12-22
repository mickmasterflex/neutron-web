
const state = {
  show_create_campaign_modal: false
}

const getters = {
  getShowCreateCampaignModal: state => state.show_create_campaign_modal
}

const mutations = {
  SHOW_CREATE_CAMPAIGN_MODAL: (state) => (state.show_create_campaign_modal = true),
  CLOSE_CREATE_CAMPAIGN_MODAL: (state) => (state.show_create_campaign_modal = false)
}

export default {
  state,
  getters,
  mutations
}
