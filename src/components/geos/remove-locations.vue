<template>
  <geo-panel contentTab="remove">
    <template #action>
      <button v-show="locations.length" @click="removeLocations()" class="btn btn-red"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Remove Locations</button>
    </template>
    <template #content>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="removeLocations()">
            <v-textarea-field ref="locationField" field_label="Locations" rules="required" v-model="locations"></v-textarea-field>
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
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      remove: 'removeLocations'
    }),
    removeLocations () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.remove({
            geo: this.geo,
            locations: this.locations
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
