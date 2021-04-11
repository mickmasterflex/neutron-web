const state = {
  current_ancestors: []
}

const getters = {
  getCurrentAncestors: state => state.current_ancestors,
  getCurrentAncestorsIds: state => state.current_ancestors.map(a => a.id),
  getAncestorById: state => id => state.current_ancestors.find(ancestor => ancestor.id === id)
}

const mutations = {
  SET_CURRENT_ANCESTORS: (state, ancestors) => (state.current_ancestors = ancestors)
}

export default {
  state,
  getters,
  mutations
}
