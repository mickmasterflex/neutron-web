import downloadLocations from '@/store/modules/geos/download-locations'
import removeLocations from '@/store/modules/geos/remove-locations'
import searchLocations from '@/store/modules/geos/search-locations'
import geoPanels from '@/store/modules/geos/panels'

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
  removeLocations,
  searchLocations,
  geoPanels
}

export default {
  state,
  getters,
  mutations,
  modules
}
