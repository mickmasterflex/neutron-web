
const state = {
  lead_put_loading: false,
  lead_put_loading_text: 'Updating Lead'
}

const getters = {
  getLeadPutLoading: state => state.lead_put_loading,
  getLeadPutLoadingText: state => state.lead_put_loading_text
}

const mutations = {
  SET_LEAD_PUT_LOADING: (state) => (state.lead_put_loading = true),
  RESET_LEAD_PUT_LOADING: (state) => (state.lead_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
