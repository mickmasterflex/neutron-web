const state = {
  fetch_fpi_loading: false,
  fetch_fpi_loading_text: 'Loading FPI'
}

const getters = {
  getFetchFpiLoading: state => state.fetch_fpi_loading,
  getFetchFpiLoadingText: state => state.fetch_fpi_loading_text
}

const mutations = {
  SET_FETCH_FPI_LOADING: state => (state.fetch_fpi_loading = true),
  RESET_FETCH_FPI_LOADING: state => (state.fetch_fpi_loading = false)
}

export default {
  state,
  getters,
  mutations
}
