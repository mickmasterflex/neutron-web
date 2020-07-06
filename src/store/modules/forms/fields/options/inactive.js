import axios from '@/axios'

const state = {
  inactive_options: []
}

const getters = {
  getInactiveOptions: state => state.inactive_options
}

const actions = {
  async addInactiveOption ({ commit }, option) {
    await axios.post('/options/', option)
      .then(response => {
        commit('REMOVE_OPTION_FROM_INACTIVE', option.base_option.id)
        commit('ADD_OPTION_TO_CURRENT_OPTIONS', response.data)
      })
      .catch(e => {
        window.console.log(e.response.data)
      })
  }
}

const mutations = {
  SET_INACTIVE_OPTIONS: (state, options) => (state.inactive_options = options),
  ADD_OPTION_TO_INACTIVE: (state, activeOption) => {
    const index = state.inactive_options.findIndex(option => option.id === activeOption.id)
    const inactiveOption = {
      base_field: activeOption.base_option.field,
      label: activeOption.label,
      value: activeOption.base_option.value,
      base_option: activeOption.base_option.id
    }
    if (index !== -1) {
      state.inactive_options.splice(index, 1, inactiveOption)
    } else {
      state.inactive_options.unshift(inactiveOption)
    }
  },
  REMOVE_OPTION_FROM_INACTIVE: (state, baseOptionId) => {
    state.inactive_options = state.inactive_options.filter(option => option.base_option.id !== baseOptionId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
