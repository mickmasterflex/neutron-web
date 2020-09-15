import axios from '@/axios'
import dayCaps from '@/store/modules/caps/day'
import monthCaps from '@/store/modules/caps/month'

const modules = {
  dayCaps,
  monthCaps
}

const state = {
  current_cap_parent: null
}

const getters = {
  getCurrentCapParent: state => state.current_cap_parent
}

const actions = {
  async fetchCurrentCaps ({ commit }, parent) {
    const url = `/caps-calendar/${parent.type}/${parent.id}/`
    await axios.get(url)
      .then(response => {
        commit('SET_CURRENT_CAP_PARENT', response.data.parent)
        commit('SET_CURRENT_DAY_CAPS', response.data.day_caps)
      })
  }
}

const mutations = {
  SET_CURRENT_CAP_PARENT: (state, parent) => (state.current_cap_parent = parent),
  RESET_CURRENT_CAP_PARENT: (state) => (state.current_cap_parent = null)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
