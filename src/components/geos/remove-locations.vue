<template>
  <geo-panel contentTab="remove">
    <template #action>
      <button v-show="locations.length" @click="removeLocations()" class="btn btn-red"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Remove Locations</button>
    </template>
    <template #content>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="removeLocations()">
            <location-field ref="locationField" v-model="locations"></location-field>
          </form>
        </validation-observer>
      </div>
    </template>
  </geo-panel>
</template>

<script>
import geoPanel from '@/components/geos/geo-panel'
import locationField from '@/components/geos/locations-field'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      locations: ''
    }
  },
  computed: {
    ...mapGetters({
      geo: 'getCurrentGeo'
    })
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      remove: 'removeLocations'
    }),
    resetForm () {
      this.locations = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    removeLocations () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.remove({
            geo: this.geo,
            locations: this.locations.toLowerCase()
          }).then(() => {
            this.resetForm()
          }).catch(error => {
            this.error = error
          })
        }
      })
    },
    enterKeyAction () {
      if (document.activeElement === this.$refs.locationField.$refs.locationField.$refs.field.$refs.field) {
        this.removeLocations()
      }
    }
  },
  components: {
    'geo-panel': geoPanel,
    'location-field': locationField
  }
}
</script>
