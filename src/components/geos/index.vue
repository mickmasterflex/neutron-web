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
import { mapGetters } from 'vuex'

export default {
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
  }
}
</script>
