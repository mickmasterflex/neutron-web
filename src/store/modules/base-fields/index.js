import baseTextFields from '@/store/modules/base-fields/base-text-fields'
import baseOptionFields from '@/store/modules/base-fields/base-option-fields'
import baseOptions from '@/store/modules/base-fields/base-options'

const modules = {
  baseTextFields,
  baseOptionFields,
  baseOptions
}

const state = {
  base_fields: []
}

const getters = {
  getBaseFields: state => state.base_fields
}

const actions = {
  async fetchBaseFields ({ commit, dispatch }) {
    await dispatch('fetchBaseTextFields')
    await dispatch('fetchBaseOptionFields')
    commit('SET_BASE_FIELDS')
  }
}

const mutations = {
  SET_BASE_FIELDS: (state) => (state.base_fields = state.baseTextFields.base_text_fields.concat(state.baseOptionFields.base_option_fields))
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
