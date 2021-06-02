import addLocations from '@/store/modules/geos/add-locations'
import downloadLocations from '@/store/modules/geos/download-locations'
import removeLocations from '@/store/modules/geos/remove-locations'
import searchLocations from '@/store/modules/geos/search-locations'
import inheritedLocationContracts from '@/store/modules/geos/inherited-location-contracts'
import geoPanels from '@/store/modules/geos/panels/index'

const state = {
  current_geo: null,
  current_geo_contract_type: null
}

const getters = {
  getCurrentGeo: state => state.current_geo,
  getCurrentGeoContractType: state => state.current_geo_contract_type
}

const mutations = {
  SET_CURRENT_GEO: (state, geo) => (state.current_geo = geo),
  RESET_CURRENT_GEO: (state) => (state.current_geo = null),
  SET_CURRENT_GEO_CONTRACT_TYPE: (state, type) => (state.current_geo_contract_type = type),
  RESET_CURRENT_GEO_CONTRACT_TYPE: (state) => (state.current_geo_contract_type = null)
}

const modules = {
  addLocations,
  downloadLocations,
  removeLocations,
  searchLocations,
  inheritedLocationContracts,
  geoPanels
}

export default {
  state,
  getters,
  mutations,
  modules
}
