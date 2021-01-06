
const state = {
  user_fetch_loading: false,
  users_fetch_loading: false,
  user_fetch_loading_text: 'Loading User Data',
  users_fetch_loading_text: 'Loading Users'
}

const getters = {
  getUserFetchLoading: state => state.user_fetch_loading,
  getUsersFetchLoading: state => state.users_fetch_loading,
  getUserFetchLoadingText: state => state.user_fetch_loading_text,
  getUsersFetchLoadingText: state => state.users_fetch_loading_text
}

const mutations = {
  SET_USERS_FETCH_LOADING: (state) => (state.users_fetch_loading = true),
  RESET_USERS_FETCH_LOADING: (state) => (state.users_fetch_loading = false),
  SET_USER_FETCH_LOADING: (state) => (state.user_fetch_loading = true),
  RESET_USER_FETCH_LOADING: (state) => (state.user_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
