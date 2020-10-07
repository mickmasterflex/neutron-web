<template>
  <geo-panel contentTab="add">
    <template #action>
      <button v-show="locations.length || csv" @click="addLocations()" class="btn btn-green"><font-awesome-icon icon="plus"></font-awesome-icon> Add Locations</button>
    </template>
    <template #content>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="addLocations()">
            <v-textarea-field field_id="locations" ref="locationField" field_label="Locations" v-model="locations" :field_disabled="csv" placeholder="Enter multiple postal codes, or abbreviated states. Separate by return or comma. ie: 84104, UT, 90210, UT, TX"></v-textarea-field>
            <file-field @input="fileSelected($event)" rules="ext:csv" field_id="csv" field_label="CSV Upload" button_text="Select a CSV" icon="file-csv" :field_disabled="!!locations.length"></file-field>
            <checkbox-single field_id="nuke_replace" field_label="Nuke & Replace" v-model="nuke_replace"></checkbox-single>
          </form>
        </validation-observer>
      </div>
    </template>
  </geo-panel>
</template>

<script>
import geoPanel from '@/components/geos/geo-panel'
import fileField from '@/components/ui/forms/validation-fields/file-field'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      locations: '',
      csv: null,
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
    fileSelected (file) {
      this.csv = file
    },
    resetForm () {
      this.locations = ''
      this.nuke_replace = false
      this.csv = null
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    addLocations () {
      this.$refs.form.validate().then(success => {
        if (success) {
          const formData = new FormData()
          if (this.csv) {
            formData.append('csv_file', this.csv)
          } else {
            formData.append('locations', this.locations.toLowerCase())
          }
          formData.append('geo', this.geo)
          formData.append('nuke_replace', this.nuke_replace)
          this.add(formData).then(() => {
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
    'geo-panel': geoPanel,
    'file-field': fileField
  }
}
</script>
