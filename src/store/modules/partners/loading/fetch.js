const state = {
  partner_fetch_loading: false,
  partners_fetch_loading: false,
  partner_fetch_loading_text: 'Loading Partner',
  partners_fetch_loading_text: 'Loading Partners'
}

const getters = {
  getPartnerFetchLoading: state => state.partner_fetch_loading,
  getPartnersFetchLoading: state => state.partners_fetch_loading,
  getPartnerFetchLoadingText: state => state.partner_fetch_loading_text,
  getPartnersFetchLoadingText: state => state.partners_fetch_loading_text
}

const mutations = {
  SET_PARTNER_FETCH_LOADING: (state) => (state.partner_fetch_loading = true),
  RESET_PARTNER_FETCH_LOADING: (state) => (state.partner_fetch_loading = false),
  SET_PARTNERS_FETCH_LOADING: (state) => (state.partners_fetch_loading = true),
  RESET_PARTNERS_FETCH_LOADING: (state) => (state.partners_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
