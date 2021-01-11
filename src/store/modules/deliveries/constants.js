
const state = {
  delivery_types: ['HttpPostDelivery']
}

const getters = {
  getDeliveryTypes: state => state.delivery_types
}

export default {
  state,
  getters
}
