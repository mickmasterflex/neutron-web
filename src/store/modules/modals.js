const state = {
  changes_in_modal_unsaved: false
}

const getters = {
  getChangesInModalUnsaved: state => state.changes_in_modal_unsaved
}

const mutations = {
  TOGGLE_CHANGES_IN_MODAL_UNSAVED: (state, bool) => (state.changes_in_modal_unsaved = bool)
}

export default {
  state,
  getters,
  mutations
}
