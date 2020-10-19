<template>
  <button :class="`btn btn-hollow-purple ${loading ? 'cursor-wait disabled' : ''}`" @click="downloadLocations()">
    <font-awesome-icon v-if="!loading" icon="download"></font-awesome-icon>
    <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon>
    {{ buttonCopy }}
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      geo: 'getCurrentGeo',
      loading: 'getDownloadLocationsLoading'
    }),
    buttonCopy () {
      if (this.loading) {
        return ' Downloading Current Locations'
      } else {
        return ' Download Current Locations'
      }
    }
  },
  methods: {
    ...mapActions({
      download: 'downloadCurrentLocations'
    }),
    downloadLocations () {
      if (!this.loading) {
        this.download(this.geo)
      }
    }
  }
}
</script>
