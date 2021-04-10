
const state = {
  additional_form_content_post_loading: false,
  additional_form_content_post_loading_text: 'Creating Additional Content'
}

const getters = {
  getAdditionalFormContentPostLoading: state => state.additional_form_content_post_loading,
  getAdditionalFormContentPostLoadingText: state => state.additional_form_content_post_loading_text
}

const mutations = {
  SET_ADDITIONAL_FORM_CONTENT_POST_LOADING: (state) => (state.additional_form_content_post_loading = true),
  RESET_ADDITIONAL_FORM_CONTENT_POST_LOADING: (state) => (state.additional_form_content_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
