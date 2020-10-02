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
import searchLocations from '@/components/geos/search-locations'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    geo: Number
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
      setCurrentGeo: 'SET_CURRENT_GEO'
    })
  },
  watch: {
    geo () {
      if (this.geo) {
        this.setCurrentGeo(this.geo)
      }
    }
  }
}
</script>
