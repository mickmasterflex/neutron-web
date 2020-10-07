<template>
  <geo-panel contentTab="search">
    <template #action>
      <button v-show="locations.length" @click="searchLocations()" class="btn btn-green"><font-awesome-icon icon="search"></font-awesome-icon> Search Locations</button>
    </template>
    <template #content>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="searchLocations()">
            <v-textarea-field field_id="locations" ref="locationField" field_label="Locations" rules="required" v-model="locations" placeholder="Enter multiple postal codes, or abbreviated states. Separate by return or comma. ie: 84104, UT, 90210, UT, TX"></v-textarea-field>
          </form>
        </validation-observer>
        <div class="field-group" v-if="results.found">
          <label class="field-label">Search Results</label>
          <results-list></results-list>
        </div>
      </div>
    </template>
  </geo-panel>
</template>

<script>
import geoPanel from '@/components/geos/geo-panel'
import resultsList from '@/components/geos/search-locations/results-list'
import { mapActions, mapGetters } from 'vuex'
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
      results: 'getLocationsSearchResults'
    })
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      search: 'searchLocations'
    }),
    searchLocations () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.search({
            geo: this.geo,
            locations: this.locations.toLowerCase()
          })
        }
      })
    },
    enterKeyAction () {
      if (document.activeElement === this.$refs.locationField.$refs.field.$refs.field) {
        this.searchLocations()
      }
    }
  },
  components: {
    'geo-panel': geoPanel,
    'results-list': resultsList
  }
}
</script>
