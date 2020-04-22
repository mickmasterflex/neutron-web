import axios from '@/axios'

const state = {
  buyers: [],
  current_buyer: {}
}

const getters = {
  getAllBuyers: state => state.buyers,
  getCurrentBuyer: state => state.current_buyer,
  getAllBuyersCount: (state) => {
    return state.buyers.length
  },
  getBuyersByClient: (state) => (clientId) => {
    return state.buyers.filter(buyer => buyer.client === clientId)
  },
  getBuyerSiblings: (state, getters) => {
    const siblings = getters.getBuyersByClient(state.current_buyer.client)
    const index = siblings.findIndex(buyer => buyer.id === state.current_buyer.id)
    if (index !== -1) {
      siblings.splice(index, 1)
    }
    return siblings
  }
}

const actions = {
  async fetchBuyers ({ commit }) {
    await axios.get('/buyers/')
      .then(response => {
        commit('SET_BUYERS', response.data)
      })
  },
  async fetchCurrentBuyer ({ commit }, id) {
    await axios.get(`/buyers/${id}/`)
      .then(response => {
        commit('SET_CURRENT_BUYER', response.data)
      })
  },
  async createBuyer ({ commit }, buyer) {
    await axios.post('/buyers/', buyer)
      .then(response => {
        commit('ADD_BUYER', response.data)
      })
  },
  async updateBuyer ({ commit }, updatedBuyer) {
    await axios.put(`/buyers/${updatedBuyer.id}/`, updatedBuyer)
      .then(() => {
        commit('UPDATE_BUYER', updatedBuyer)
        commit('SET_CURRENT_BUYER', updatedBuyer)
      })
  },
  async deleteBuyer ({ commit }, id) {
    await axios.delete(`/buyers/${id}/`)
      .then(() => {
        commit('REMOVE_BUYER', id)
      })
  }
}
const mutations = {
  SET_BUYERS: (state, buyers) => (state.buyers = buyers),
  SET_CURRENT_BUYER: (state, buyer) => (state.current_buyer = buyer),
  ADD_BUYER: (state, buyer) => state.buyers.unshift(buyer),
  UPDATE_BUYER: (state, updatedBuyer) => {
    const index = state.buyers.findIndex(buyer => buyer.id === updatedBuyer.id)
    if (index !== -1) {
      state.buyers.splice(index, 1, updatedBuyer)
    }
  },
  REMOVE_BUYER: (state, id) => (state.buyers = state.buyers.filter(buyer => buyer.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
