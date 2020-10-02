import geoPanels from '@/store/modules/geos/panels'
import downloadLocations from '@/store/modules/geos/download-locations'

const state = {
  current_geo: null
}

const getters = {
  getCurrentGeo: state => state.current_geo
}

const mutations = {
  SET_CURRENT_GEO: (state, geo) => (state.current_geo = geo),
  RESET_CURRENT_GEO: (state) => (state.current_geo = null)
}

const modules = {
  downloadLocations,
  geoPanels
}

export default {
  state,
  getters,
  mutations,
  modules
}
