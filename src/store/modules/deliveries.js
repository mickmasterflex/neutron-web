import axios from '@/axios'

const state = {
  deliveries: [],
  show_create_delivery_modal: false
}

const getters = {
  // getDeliveries: state => state.deliveries
  getDeliveries: function (state) {
    return state.deliveries
  }
  // getDeliveriesByBuyer: (state) => (buyerId) => {
  //   return state.deliveries.filter(delivery => delivery.buyer_contract === buyerId)
  // }
}

const actions = {
  async fetchDeliveries ({ commit }) {
    await axios.get('/deliveries/')
      .then(response => {
        commit('SET_DELIVERIES', response.data)
      })
  }
}

const mutations = {
  SET_DELIVERIES: (state, deliveries) => (state.deliveries = deliveries)
}

export default {
  state,
  getters,
  actions,
  mutations
}
