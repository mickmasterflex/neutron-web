import axios from '@/axios'

const state = {
  inherited_location_contracts: []
}

const getters = {
  getInheritedLocationContracts: state => state.inherited_location_contracts
}

const actions = {
  async fetchInheritedLocationContracts ({ commit }, geo) {
    await axios.get(`/geo-get-inherited-location-contracts/?geo=${geo}`)
      .then(response => {
        commit('SET_INHERITED_LOCATION_CONTRACTS', response.data)
      })
  }
}

const mutations = {
  SET_INHERITED_LOCATION_CONTRACTS: (state, contracts) => (state.inherited_location_contracts = contracts),
  RESET_INHERITED_LOCATION_CONTRACTS: (state) => (state.inherited_location_contracts = {})
}

export default {
  state,
  getters,
  actions,
  mutations
}
