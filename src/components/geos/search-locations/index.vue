<template>
  <geo-panel contentTab="search" loadingText="Searching Locations">
    <template #action>
      <button v-show="locations.length" @click="searchLocations()" class="btn btn-green"><font-awesome-icon icon="search"></font-awesome-icon> Search Locations</button>
    </template>
    <template #content>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="searchLocations()">
            <location-field rules="required" ref="locationField" v-model="locations"></location-field>
          </form>
        </validation-observer>
        <div class="field-group" v-if="results">
          <label class="field-label field-label-top">Search Results</label>
          <results-list></results-list>
        </div>
      </div>
    </template>
  </geo-panel>
</template>

<script>
import geoPanel from '@/components/geos/geo-panel'
import resultsList from '@/components/geos/search-locations/results-list'
import locationField from '@/components/geos/locations-field'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'

export default {
  data () {
    return {
      locations: ''
    }
  },
  computed: {
    ...mapGetters({
      geo: 'getCurrentGeo',
      results: 'getLocationsSearchResults',
      searchVisible: 'getSearchAddLocationsPanelVisible'
    })
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      search: 'searchLocations'
    }),
    ...mapMutations({
      resetResults: 'RESET_LOCATIONS_SEARCH_RESULTS'
    }),
    searchLocations () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.search({
            geo: this.geo,
            locations: this.locations.toLowerCase().replace(/ /g, '')
          })
        }
      })
    },
    enterKeyAction () {
      if (document.activeElement === this.$refs.locationField.$refs.locationField.$refs.field.$refs.field) {
        this.searchLocations()
      }
    }
  },
  destroyed () {
    this.resetResults()
  },
  components: {
    'geo-panel': geoPanel,
    'results-list': resultsList,
    'location-field': locationField
  }
}
</script>
