import dayCaps from '@/store/modules/caps/day'

const modules = {
  dayCaps
}

const state = {
  current_caps: []
}

const getters = {
  getCurrentCaps: state => state.current_caps
}

const mutations = {
  SET_CURRENT_CAPS: (state, caps) => (state.current_caps = caps),
  RESET_CURRENT_CAPS: (state) => (state.current_caps = [])
}

export default {
  modules,
  state,
  getters,
  mutations
}
