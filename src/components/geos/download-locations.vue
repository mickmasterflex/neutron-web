<template>
  <button :class="`btn btn-hollow-purple ${loading ? 'cursor-wait disabled' : ''}`" @click="downloadLocations()">
    <font-awesome-icon icon="download"></font-awesome-icon> Download Current Locations
  </button>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      geo: 'getCurrentGeo',
      loading: 'getDownloadLocationsLoading'
    })
  },
  methods: {
    ...mapActions({
      download: 'downloadCurrentLocations'
    }),
    ...mapMutations({
      setLoading: 'SET_DOWNLOAD_LOCATIONS_LOADING'
    }),
    downloadLocations () {
      if (!this.loading) {
        this.setLoading()
        this.download(this.geo)
      }
    }
  }
}
</script>
