
const state = {
  offer_fetch_loading: false,
  offers_fetch_loading: false,
  offer_fetch_loading_text: 'Loading Offer',
  offers_fetch_loading_text: 'Loading Offers'
}

const getters = {
  getOfferFetchLoading: state => state.offer_fetch_loading,
  getOffersFetchLoading: state => state.offers_fetch_loading,
  getOfferFetchLoadingText: state => state.offer_fetch_loading_text,
  getOffersFetchLoadingText: state => state.offers_fetch_loading_text
}

const mutations = {
  SET_OFFER_FETCH_LOADING: (state) => (state.offer_fetch_loading = true),
  SET_OFFERS_FETCH_LOADING: (state) => (state.offers_fetch_loading = true),
  RESET_OFFER_FETCH_LOADING: (state) => (state.offer_fetch_loading = false),
  RESET_OFFERS_FETCH_LOADING: (state) => (state.offers_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
