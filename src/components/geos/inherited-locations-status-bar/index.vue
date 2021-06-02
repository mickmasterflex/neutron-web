<template>
  <div>
    <inherits-locations :show="inheritsLocations && hasInheritedLocations"/>
    <inheritance-disabled :show="!inheritsLocations"/>
  </div>
</template>

<script>
import inheritsLocations from '@/components/geos/inherited-locations-status-bar/inherits-locations'
import inheritanceDisabled from '@/components/geos/inherited-locations-status-bar/inheritance-disabled'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentGeoContractType: 'getCurrentGeoContractType',
      inheritedLocationContracts: 'getInheritedLocationContracts',
      currentBuyer: 'getCurrentBuyer',
      currentOffer: 'getCurrentOffer'
    }),
    hasInheritedLocations () {
      return this.inheritedLocationContracts.length > 0
    },
    inheritsLocations () {
      return this.currentContract.toggle_geo_inheritance
    },
    currentContract () {
      switch (this.currentGeoContractType) {
        case 'buyer':
          return this.currentBuyer
        case 'offer':
          return this.currentOffer
        default:
          return { toggle_geo_inheritance: true }
      }
    }
  },
  components: {
    'inherits-locations': inheritsLocations,
    'inheritance-disabled': inheritanceDisabled
  }
}
</script>
