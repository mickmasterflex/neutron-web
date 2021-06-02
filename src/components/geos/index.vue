<template>
  <div>
    <add-locations v-show="addVisible"></add-locations>
    <remove-locations v-show="removeVisible"></remove-locations>
    <search-locations v-show="searchVisible"></search-locations>
  </div>
</template>

<script>
import addLocations from '@/components/geos/add-locations'
import removeLocations from '@/components/geos/remove-locations'
import searchLocations from '@/components/geos/search-locations/index'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
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
    'add-locations': addLocations,
    'remove-locations': removeLocations,
    'search-locations': searchLocations
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
      resetCurrentGeoContractType: 'RESET_CURRENT_GEO_CONTRACT_TYPE'
    }),
    ...mapActions({
      fetchInheritedLocationContracts: 'fetchInheritedLocationContracts'
    }),
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
    }
  },
  created () {
    this.setGeo()
  },
  destroyed () {
    this.resetCurrentGeo()
    this.resetCurrentGeoContractType()
  }
}
</script>
