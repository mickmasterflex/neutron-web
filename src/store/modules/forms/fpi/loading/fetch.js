const state = {
  fetch_fpi_loading: false,
  fetch_fpi_downloading: false,
  fetch_fpi_loading_text: 'Loading FPI'
}

const getters = {
  getFetchFpiLoading: state => state.fetch_fpi_loading,
  getFetchFpiDownloading: state => state.fetch_fpi_downloading,
  getFetchFpiLoadingText: state => state.fetch_fpi_loading_text
}

const mutations = {
  SET_FETCH_FPI_LOADING: state => (state.fetch_fpi_loading = true),
  RESET_FETCH_FPI_LOADING: state => (state.fetch_fpi_loading = false),
  SET_FETCH_FPI_DOWNLOADING: state => (state.fetch_fpi_downloading = true),
  RESET_FETCH_FPI_DOWNLOADING: state => (state.fetch_fpi_downloading = false)
}

export default {
  state,
  getters,
  mutations
}
