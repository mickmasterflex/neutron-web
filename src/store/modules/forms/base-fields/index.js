import baseTextFields from '@/store/modules/forms/base-fields/base-text-fields'
import baseOptionFields from '@/store/modules/forms/base-fields/base-option-fields'
import baseOptions from '@/store/modules/forms/base-fields/base-options'

const modules = {
  baseTextFields,
  baseOptionFields,
  baseOptions
}

const state = {
  base_fields: [],
  show_create_base_field_modal: false
}

const getters = {
  getBaseFields: state => state.base_fields,
  getBaseFieldCount: state => state.base_fields.length,
  getShowCreateBaseFieldModal: state => state.show_create_base_field_modal
}

const actions = {
  async fetchBaseFields ({ commit, dispatch }) {
    await dispatch('fetchBaseTextFields')
    await dispatch('fetchBaseOptionFields')
    commit('SET_BASE_FIELDS')
  }
}

const mutations = {
  SET_BASE_FIELDS: (state) => (state.base_fields = state.baseTextFields.base_text_fields.concat(state.baseOptionFields.base_option_fields)),
  SHOW_CREATE_BASE_FIELD_MODAL: (state) => (state.show_create_base_field_modal = true),
  CLOSE_CREATE_BASE_FIELD_MODAL: (state) => (state.show_create_base_field_modal = false)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
