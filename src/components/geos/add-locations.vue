<template>
  <geo-panel contentTab="add">
    <template #action>
      <button v-show="locations.length" @click="addLocations()" class="btn btn-green"><font-awesome-icon icon="plus"></font-awesome-icon> Add Locations</button>
    </template>
    <template #content>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="addLocations()">
            <v-textarea-field field_id="locations" ref="locationField" field_label="Locations" rules="required" v-model="locations"></v-textarea-field>
            <checkbox-single field_id="nuke_replace" field_label="Nuke & Replace" v-model="nuke_replace"></checkbox-single>
          </form>
        </validation-observer>
      </div>
    </template>
  </geo-panel>
</template>

<script>
import geoPanel from '@/components/geos/geo-panel'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      locations: '',
      nuke_replace: false
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
      add: 'addLocations'
    }),
    resetForm () {
      this.locations = ''
      this.nuke_replace = false
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    addLocations () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.add({
            geo: this.geo,
            locations: this.locations,
            nuke_replace: this.nuke_replace
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
        this.addLocations()
      }
    }
  },
  components: {
    'geo-panel': geoPanel
  }
}
</script>
