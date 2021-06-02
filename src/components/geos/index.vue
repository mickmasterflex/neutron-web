<template>
  <component :is="panelComponent"></component>
</template>

<script>
import addLocations from '@/components/geos/add-locations'
import removeLocations from '@/components/geos/remove-locations'
import searchLocations from '@/components/geos/search-locations/index'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      panelComponent: addLocations
    }
  },
  props: {
    geo: Number,
    contractType: {
      type: String,
      validator: (value) => {
        return ['buyer', 'offer'].includes(value)
      }
    }
  },
  components: {
    addLocations,
    removeLocations,
    searchLocations
  },
  computed: {
    ...mapGetters({
      addVisible: 'getAddLocationsPanelVisible',
      removeVisible: 'getRemoveAddLocationsPanelVisible',
      searchVisible: 'getSearchAddLocationsPanelVisible'
    })
  },
  methods: {
    ...mapMutations({
      setCurrentGeo: 'SET_CURRENT_GEO',
      resetCurrentGeo: 'RESET_CURRENT_GEO',
      setCurrentGeoContractType: 'SET_CURRENT_GEO_CONTRACT_TYPE',
      resetInherited: 'RESET_INHERITED_LOCATION_CONTRACTS',
      resetCurrentGeoContractType: 'RESET_CURRENT_GEO_CONTRACT_TYPE'
    }),
    ...mapActions({
      showAdd: 'showAddLocationsPanel',
      fetchInheritedLocationContracts: 'fetchInheritedLocationContracts'
    }),
    setPanelComponent (component) {
      this.panelComponent = component
    },
    setGeo () {
      if (this.geo) {
        this.setCurrentGeo(this.geo)
        this.setCurrentGeoContractType(this.contractType)
        this.fetchInheritedLocationContracts(this.geo)
      }
    }
  },
  watch: {
    geo () {
      this.setGeo()
    },
    addVisible () {
      if (this.addVisible) {
        this.setPanelComponent(addLocations)
      }
    },
    removeVisible () {
      if (this.removeVisible) {
        this.setPanelComponent(removeLocations)
      }
    },
    searchVisible () {
      if (this.searchVisible) {
        this.setPanelComponent(searchLocations)
      }
    }
  },
  created () {
    this.showAdd()
    this.setGeo()
  },
  destroyed () {
    this.resetCurrentGeo()
    this.resetCurrentGeoContractType()
    this.resetInherited()
  }
}
</script>
