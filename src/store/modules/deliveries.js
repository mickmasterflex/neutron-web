import axios from '@/axios'

const state = {
  deliveries: [],
  show_create_delivery_modal: false,
  show_update_delivery_modal: false,
  current_delivery: {}
}

const getters = {
  getCurrentDelivery: state => state.current_delivery,
  getDeliveriesByBuyer: (state) => (buyerId) => {
    return state.deliveries.filter(delivery => delivery.buyer_contract === buyerId)
  },
  getShowCreateDeliveryModal: state => state.show_create_delivery_modal,
  getShowUpdateDeliveryModal: state => state.show_update_delivery_modal
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
        commit('REMOVE_DELIVERY', id)
      })
  },
  async updateDelivery ({ commit }, updatedDelivery) {
    await axios.put(`/deliveries/${updatedDelivery.id}/`, updatedDelivery)
      .then(response => {
        commit('UPDATE_DELIVERY', response.data)
      })
  }
}

const mutations = {
  ADD_DELIVERY: (state, delivery) => state.deliveries.unshift(delivery),
  CLOSE_CREATE_DELIVERY_MODAL: (state) => (state.show_create_delivery_modal = false),
  CLOSE_UPDATE_DELIVERY_MODAL: (state) => (state.show_update_delivery_modal = false),
  REMOVE_DELIVERY: (state, id) => (state.deliveries = state.deliveries.filter(delivery => delivery.id !== id)),
  RESET_CURRENT_DELIVERY: (state) => (state.current_delivery = {}),
  SET_CURRENT_DELIVERY: (state, delivery) => (state.current_delivery = delivery),
  SET_DELIVERIES: (state, deliveries) => (state.deliveries = deliveries),
  SHOW_CREATE_DELIVERY_MODAL: (state) => (state.show_create_delivery_modal = true),
  SHOW_UPDATE_DELIVERY_MODAL: (state) => (state.show_update_delivery_modal = true),
  UPDATE_DELIVERY: (state, updatedDelivery) => {
    const index = state.deliveries.findIndex(delivery => delivery.id === updatedDelivery.id)
    if (index !== -1) {
      state.deliveries.splice(index, 1, updatedDelivery)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
