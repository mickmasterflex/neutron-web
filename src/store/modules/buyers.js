import axios from '@/axios'

const state = {
  buyers: [],
  current_buyer: {},
  show_create_buyer_modal: false
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
  getParentlessBuyersByClient: (state) => (clientId) => {
    return state.buyers.filter(buyer => buyer.client === clientId).filter(buyer => buyer.parent === null)
  },
  getBuyerSiblings: (state, getters) => {
    const siblings = getters.getBuyersByClient(state.current_buyer.client)
    const index = siblings.findIndex(buyer => buyer.id === state.current_buyer.id)
    if (index !== -1) {
      siblings.splice(index, 1)
    }
    return siblings
  },
  getBuyersByParent: (state) => (buyerId) => {
    return state.buyers.filter(buyer => buyer.parent === buyerId)
  },
  getShowCreateBuyerModal: state => state.show_create_buyer_modal
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
        commit('SET_CURRENT_FORM', response.data.form)
        commit('SORT_CURRENT_FORM_FIELDS')
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
      .then(response => {
        commit('UPDATE_BUYER', response.data)
        commit('SET_CURRENT_BUYER', response.data)
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
  REMOVE_BUYER: (state, id) => (state.buyers = state.buyers.filter(buyer => buyer.id !== id)),
  SHOW_CREATE_BUYER_MODAL: (state) => (state.show_create_buyer_modal = true),
  CLOSE_CREATE_BUYER_MODAL: (state) => (state.show_create_buyer_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
