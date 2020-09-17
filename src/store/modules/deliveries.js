import axios from '@/axios'

const state = {
  deliveries: [],
  show_create_delivery_modal: false
}

const getters = {
  getDeliveries: state => state.deliveries,
  getDeliveriesByBuyer: (state) => (buyerId) => {
    return state.deliveries.filter(delivery => delivery.buyer_contract === buyerId)
  },
  getShowCreateDeliveryModal: state => state.show_create_delivery_modal
}

const actions = {
  async fetchDeliveries ({ commit }) {
    await axios.get('/deliveries/')
      .then(response => {
        commit('SET_DELIVERIES', response.data)
      })
  },
  async createDelivery ({ commit }, delivery) {
    await axios.post('/deliveries/', delivery)
      .then(response => {
        commit('ADD_DELIVERY', response.data)
      })
  },
  async deleteDelivery ({ commit }, id) {
    await axios.delete(`/deliveries/${id}/`)
      .then(() => {
        commit('DELETE_DELIVERY', id)
      })
  }
}

const mutations = {
  ADD_DELIVERY: (state, delivery) => state.deliveries.unshift(delivery),
  CLOSE_CREATE_DELIVERY_MODAL: (state) => (state.show_create_delivery_modal = false),
  DELETE_DELIVERY: (state, id) => (state.deliveries = state.deliveries.filter(delivery => delivery.id !== id)),
  SET_DELIVERIES: (state, deliveries) => (state.deliveries = deliveries),
  SHOW_CREATE_DELIVERY_MODAL: (state) => (state.show_create_delivery_modal = true)
}

export default {
  state,
  getters,
  actions,
  mutations
}
