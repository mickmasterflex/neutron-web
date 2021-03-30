import axios from '@/axios'
import constants from '@/store/modules/deliveries/constants'
import loading from '@/store/modules/deliveries/loading'
import visibility from '@/store/modules/deliveries/visibility'

const modules = {
  constants,
  loading,
  visibility
}

const state = {
  deliveries: [],
  current_delivery: {}
}

const getters = {
  getCurrentDelivery: state => state.current_delivery,
  getDeliveriesByBuyer: (state) => (buyerId) => {
    return state.deliveries.filter(delivery => delivery.buyer_contract === buyerId)
  },
  getDeliveriesByAncestors: (state) => (ancestors) => {
    return state.deliveries.filter(delivery => ancestors.some(ancestor => ancestor.id === delivery.buyer_contract))
  }
}

const actions = {
  async fetchDeliveries ({ commit }) {
    commit('SET_DELIVERIES_FETCH_LOADING')
    await axios.get('/deliveries/')
      .then(response => {
        commit('SET_DELIVERIES', response.data)
        commit('RESET_DELIVERIES_FETCH_LOADING')
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
  REMOVE_DELIVERY: (state, id) => (state.deliveries = state.deliveries.filter(delivery => delivery.id !== id)),
  RESET_CURRENT_DELIVERY: (state) => (state.current_delivery = {}),
  SET_CURRENT_DELIVERY: (state, delivery) => (state.current_delivery = delivery),
  SET_DELIVERIES: (state, deliveries) => (state.deliveries = deliveries),
  UPDATE_DELIVERY: (state, updatedDelivery) => {
    const index = state.deliveries.findIndex(delivery => delivery.id === updatedDelivery.id)
    if (index !== -1) {
      state.deliveries.splice(index, 1, updatedDelivery)
    }
  }
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
