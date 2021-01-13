const state = {
  buyer_groups_loading: false,
  buyer_groups_fetch_loading: false
}

const getters = {
  getBuyerGroupsLoading: state => state.buyer_groups_loading,
  getBuyerGroupsFetchLoading: state => state.buyer_groups_fetch_loading
}

const mutations = {
  SET_BUYER_GROUPS_LOADING: (state) => (state.buyer_groups_loading = true),
  RESET_BUYER_GROUPS_LOADING: (state) => (state.buyer_groups_loading = false),
  SET_BUYER_GROUPS_FETCH_LOADING: (state) => (state.buyer_groups_fetch_loading = true),
  RESET_BUYER_GROUPS_FETCH_LOADING: (state) => (state.buyer_groups_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
