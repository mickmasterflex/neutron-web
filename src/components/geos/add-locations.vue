<template>
  <geo-panel contentTab="add" loadingText="Adding Locations">
    <template #action>
      <button v-show="locations.length || csv" @click="addLocations()" class="btn btn-green"><font-awesome-icon icon="plus"></font-awesome-icon> Add Locations</button>
    </template>
    <template #content>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="addLocations()">
            <location-field ref="locationField" :field_disabled="csv" v-model="locations"></location-field>
            <div class="ml-label-width">
              <p class="italic text-gray-500" style="max-width: 400px">Enter locations using the form above or by uploading a properly formatted CSV file. <a href="https://s3-us-west-1.amazonaws.com/neutron.neutroninteractive.com/resources/geos/geos-example.csv" class="text-link">Example CSV</a></p>
            </div>
            <file-field @input="fileSelected($event)" rules="ext:csv" field_id="csv" field_label="CSV Upload" button_text="Select a CSV" icon="file-csv" :field_disabled="!!locations.length"></file-field>
            <div class="field-group ml-label-width">
              <checkbox-field field_id="nuke_replace"
                              v-model="nuke_replace"
                              class="font-bold bg-white p-2 w-64 rounded shadow border border-gray-300"
                              checkedColor="red"
                              :label_class="nuke_replace ? 'text-red-500' : 'text-gray-800'">
                Nuke & Replace Existing
              </checkbox-field>
            </div>
          </form>
        </validation-observer>
      </div>
    </template>
  </geo-panel>
</template>

<script>
import geoPanel from '@/components/geos/geo-panel'
import fileField from '@/components/ui/forms/validation-fields/file-field'
import locationField from '@/components/geos/locations-field'
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
            formData.append('locations', this.locations.toLowerCase().replace(/ /g, ''))
          }
          formData.append('geos', this.geo)
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
      if (document.activeElement === this.$refs.locationField.$refs.locationField.$refs.field.$refs.field) {
        this.addLocations()
      }
    }
  },
  components: {
    'geo-panel': geoPanel,
    'file-field': fileField,
    'location-field': locationField
  }
}
</script>
