
const state = {
  lead_fetch_loading: false,
  lead_fetch_loading_text: 'Loading Lead Data'
}

const getters = {
  getLeadFetchLoading: state => state.lead_fetch_loading,
  getLeadFetchLoadingText: state => state.lead_fetch_loading_text
}

const mutations = {
  SET_LEAD_FETCH_LOADING: (state) => (state.lead_fetch_loading = true),
  RESET_LEAD_FETCH_LOADING: (state) => (state.lead_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
