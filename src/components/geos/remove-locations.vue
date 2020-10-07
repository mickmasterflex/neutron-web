<template>
  <geo-panel contentTab="remove">
    <template #action>
      <button v-show="locations.length" @click="removeLocations()" class="btn btn-red"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Remove Locations</button>
    </template>
    <template #content>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="removeLocations()">
            <v-textarea-field field_id="locations" ref="locationField" field_label="Locations" rules="required" v-model="locations" placeholder="Enter multiple postal codes, or abbreviated states. Separate by return or comma. ie: 84104, UT, 90210, UT, TX"></v-textarea-field>
          </form>
        </validation-observer>
      </div>
    </template>
  </geo-panel>
</template>

<script>
import geoPanel from '@/components/geos/geo-panel'
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
      if (document.activeElement === this.$refs.locationField.$refs.field.$refs.field) {
        this.removeLocations()
      }
    }
  },
  components: {
    'geo-panel': geoPanel
  }
}
</script>
