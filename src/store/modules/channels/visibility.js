
const state = {
  show_create_channel_form: false,
  show_update_channel_form: false
}

const getters = {
  getShowCreateChannelForm: state => state.show_create_channel_form,
  getShowUpdateChannelForm: state => state.show_update_channel_form
}

const mutations = {
  SHOW_CREATE_CHANNEL_FORM: (state) => (state.show_create_channel_form = true),
  CLOSE_CREATE_CHANNEL_FORM: (state) => (state.show_create_channel_form = false),
  SHOW_UPDATE_CHANNEL_FORM: (state) => (state.show_update_channel_form = true),
  CLOSE_UPDATE_CHANNEL_FORM: (state) => (state.show_update_channel_form = false)
}

export default {
  state,
  getters,
  mutations
}
