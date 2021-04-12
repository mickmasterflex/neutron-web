
const state = {
  additional_form_content_put_loading: false,
  additional_form_content_put_loading_text: 'Updating Additional Content'
}

const getters = {
  getAdditionalFormContentPutLoading: state => state.additional_form_content_put_loading,
  getAdditionalFormContentPutLoadingText: state => state.additional_form_content_put_loading_text
}

const mutations = {
  SET_ADDITIONAL_FORM_CONTENT_PUT_LOADING: (state) => (state.additional_form_content_put_loading = true),
  RESET_ADDITIONAL_FORM_CONTENT_PUT_LOADING: (state) => (state.additional_form_content_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
