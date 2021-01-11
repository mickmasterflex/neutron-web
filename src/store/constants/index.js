import verticals from '@/store/constants/verticals'

const state = {
  phone_types: ['home', 'work', 'mobile', 'fax']
}

const getters = {
  getPhoneTypes: state => state.phone_types
}

const modules = {
  verticals
}

export default {
  state,
  getters,
  modules
}
