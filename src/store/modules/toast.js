const state = {
  toasts: []
}

const getters = {
  getToasts: state => state.toasts
}

const mutations = {
  ADD_TOAST: (state, toast) => (state.toasts.push(toast)),
  REMOVE_TOAST: (state, toastId) => (state.toasts = state.toasts.filter(toast => toast.id !== toastId))
}

export default {
  state,
  getters,
  mutations
}
