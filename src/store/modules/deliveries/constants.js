
const state = {
  delivery_types: ['HttpPostDelivery'],
  parsers: ['Proton']
}

const getters = {
  getDeliveryTypes: state => state.delivery_types,
  getParsers: state => state.parsers
}

export default {
  state,
  getters
}
