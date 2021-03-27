
const state = {
  lead_search_loading: false,
  lead_search_loading_text: 'Searching for leads'
}

const getters = {
  getLeadSearchLoading: state => state.lead_search_loading,
  getLeadSearchLoadingText: state => state.lead_search_loading_text
}

const mutations = {
  SET_LEAD_SEARCH_LOADING: (state) => (state.lead_search_loading = true),
  RESET_LEAD_SEARCH_LOADING: (state) => (state.lead_search_loading = false)
}

export default {
  state,
  getters,
  mutations
}
