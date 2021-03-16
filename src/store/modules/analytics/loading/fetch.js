
const state = {
  analytics_fetch_loading: false,
  analytics_fetch_csv_loading: false,
  analytics_fetch_loading_text: 'Loading'
}

const getters = {
  getAnalyticsFetchLoading: state => state.analytics_fetch_loading,
  getAnalyticsFetchCSVLoading: state => state.analytics_fetch_csv_loading,
  getAnalyticsFetchLoadingText: state => state.analytics_fetch_loading_text
}

const mutations = {
  SET_ANALYTICS_FETCH_LOADING: (state) => (state.analytics_fetch_loading = true),
  RESET_ANALYTICS_FETCH_LOADING: (state) => (state.analytics_fetch_loading = false),
  SET_ANALYTICS_FETCH_CSV_LOADING: (state) => (state.analytics_fetch_csv_loading = true),
  RESET_ANALYTICS_FETCH_CSV_LOADING: (state) => (state.analytics_fetch_csv_loading = false),
  SET_ANALYTICS_FETCH_LOADING_TEXT: (state, text) => (state.analytics_fetch_loading_text = text)
}

export default {
  state,
  getters,
  mutations
}
