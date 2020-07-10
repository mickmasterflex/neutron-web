
const state = {
  error: {},
  errorStatus: null,
  errorData: {},
  formError: ''
}

const getters = {
  getError: state => state.error,
  getErrorStatus: state => state.errorStatus,
  getErrorData: state => state.errorData,
  getFormError: state => state.formError
}

const mutations = {
  SET_ERROR: (state, error) => {
    state.error = error
    state.errorStatus = error.status
    state.errorData = error.data
  },
  SET_FORM_ERROR: (state, error) => {
    state.formError = error
  },
  RESET_ERROR: (state) => {
    state.error = {}
    state.errorStatus = null
    state.errorData = {}
  },
  RESET_FORM_ERROR: (state) => {
    state.formError = ''
  }
}

export default {
  state,
  getters,
  mutations
}
