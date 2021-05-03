import axios from '@/axios'

const state = {
  current_alternate_ids: []
}

const getters = {
  getCurrentAlternateIds: state => state.current_alternate_ids
}

const actions = {
  async updateAlternateIdStatus ({ commit }, updatedAltId) {
    await axios.post('/update-alternate-id-status/', updatedAltId)
      .then(response => {
        commit('UPDATE_ALTERNATE_ID', response.data)
      })
  }
}

const mutations = {
  SET_CURRENT_ALTERNATE_IDS: (state, altIds) => (state.current_alternate_ids = altIds),
  RESET_CURRENT_ALTERNATE_IDS: (state) => (state.current_alternate_ids = []),
  UPDATE_ALTERNATE_ID: (state, updatedAltId) => {
    const index = state.current_alternate_ids.findIndex(altId => altId.id === updatedAltId.id)
    if (index !== -1) {
      state.current_alternate_ids.splice(index, 1, updatedAltId)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
