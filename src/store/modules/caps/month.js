
const state = {
  current_month_caps: null
}

const getters = {
  getCurrentMonthCaps: state => state.current_month_caps
}

const mutations = {
  SET_CURRENT_MONTH_CAPS: (state, caps) => (state.current_month_caps = caps)
}

export default {
  state,
  getters,
  mutations
}
