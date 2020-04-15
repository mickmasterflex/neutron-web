import axios from '@/axios'

const state = {
  buyers: []
}
const getters = {
  getAllBuyers: state => state.buyers,
  getAllBuyersCount: (state) => {
    return state.buyers.length
  },
  getBuyersByClient: (state) => (clientId) => {
    return state.buyers.filter(buyer => buyer.client === clientId)
  },
  getBuyerById: (state) => (id) => {
    return state.buyers.find(buyer => buyer.id === id)
  }
}

const actions = {
  async fetchBuyers ({ commit }) {
    await axios.get('/buyers/')
      .then(response => {
        commit('setBuyers', response.data)
      })
  },
  async createBuyerContract ({ commit }, buyer) {
    await axios.post('/buyers/', buyer)
      .then(response => {
        commit('createBuyers', response.data)
      })
  },
  async updateBuyerContract ({ commit }, updatedBuyer) {
    await axios.put(`/buyers/${updatedBuyer.id}/`, updatedBuyer)
      .then(() => {
        commit('updateBuyers', updatedBuyer)
      })
  },
  async deleteBuyerContract ({ commit }, id) {
    await axios.delete(`/buyers/${id}/`)
      .then(() => {
        commit('deleteBuyers', id)
      })
  }
}
const mutations = {
  setBuyers: (state, buyers) => (state.buyers = buyers),
  createBuyer: (state, buyer) => state.buyers.unshift(buyer),
  updateBuyer: (state, updatedBuyer) => {
    const index = state.buyers.findIndex(buyer => buyer.id === updatedBuyer.id)
    if (index !== -1) {
      state.buyers.splice(index, 1, updatedBuyer)
    }
  },
  deleteBuyer: (state, id) => (state.buyers = state.buyers.filter(buyer => buyer.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
