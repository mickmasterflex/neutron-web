const state = {
  base_field_checkbox: 'checkbox',
  base_field_text: 'text',
  base_field_textarea: 'textarea',
  base_field_select: 'select',
  base_field_radio: 'radio'
}

const getters = {
  getAllBaseFieldTypes: state => [
    state.base_field_checkbox,
    state.base_field_text,
    state.base_field_textarea,
    state.base_field_select,
    state.base_field_radio
  ],
  getBaseBooleanFieldTypes: state => [
    state.base_field_checkbox
  ],
  getBaseTextFieldTypes: state => [
    state.base_field_text,
    state.base_field_textarea
  ],
  getBaseOptionFieldTypes: state => [
    state.base_field_select,
    state.base_field_radio
  ]
}

export default {
  state,
  getters
}
