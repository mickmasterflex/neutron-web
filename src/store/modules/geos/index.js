import addLocations from '@/store/modules/geos/add-locations'
import downloadLocations from '@/store/modules/geos/download-locations'
import removeLocations from '@/store/modules/geos/remove-locations'
import searchLocations from '@/store/modules/geos/search-locations'
import geoLoading from '@/store/modules/geos/loading'
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
  addLocations,
  downloadLocations,
  removeLocations,
  searchLocations,
  geoLoading,
  geoPanels
}

export default {
  state,
  getters,
  mutations,
  modules
}
