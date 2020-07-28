const state = {
  toast_messages: []
}

const getters = {
  getToastMessages: state => state.toast_messages
}

const mutations = {
  ADD_TOAST: (state, toast) => (state.toast_messages.push(toast)),
  REMOVE_TOAST: (state, toastId) => (state.toast_messages = state.toast_messages.filter(toast => toast.id !== toastId))
}

export default {
  state,
  getters,
  mutations
}
