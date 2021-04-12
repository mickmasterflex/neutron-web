const state = {
  tcpa_form_content_type: ['tcpa'],
  additional_form_content_types: []
}

const getters = {
  getAdditionalFormContentTypes: state => state.additional_form_content_types.concat(state.tcpa_form_content_type)
}

export default {
  state,
  getters
}
