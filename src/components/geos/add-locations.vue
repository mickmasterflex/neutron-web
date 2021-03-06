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
              <p class="italic text-gray-500" style="max-width: 400px">Enter locations using the form above or by uploading a properly formatted CSV file. <a href="https://s3-us-west-1.amazonaws.com/neutron.neutroninteractive.com/resources/geos/geos-example.csv" class="text-link whitespace-no-wrap">Example CSV</a></p>
            </div>
            <file-field @input="fileSelected($event)" rules="ext:csv" field_id="csv" field_label="CSV Upload" button_text="Select a CSV" icon="file-csv" :field_disabled="!!locations.length"></file-field>
            <div class="field-group ml-label-width">
              <checkbox-field field_id="nuke_replace"
                              :value="nuke_replace"
                              @click="check()"
                              :style-as-field="true"
                              checkedColor="red"
                              :label_class="nuke_replace ? 'text-red-500' : 'text-gray-800'"
                              label="Nuke & Replace Existing"
              ></checkbox-field>
            </div>
            <div v-if="nuke_replace" class="text-red-500 ml-label-width">
              <ul class="list-disc">
                <li>All recruitment locations will be removed from this {{ currentGeoContractType }}.</li>
                <li>Recruitment location inheritance will be deactivated for this {{ currentGeoContractType }}.</li>
              </ul>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
      geo: 'getCurrentGeo',
      currentGeoContractType: 'getCurrentGeoContractType',
      currentBuyer: 'getCurrentBuyer',
      currentOffer: 'getCurrentOffer'
    }),
    contract () {
      switch (this.currentGeoContractType) {
        case 'buyer':
          return this.currentBuyer
        case 'offer':
          return this.currentOffer
        default:
          throw new Error('current_geo_contract_type is not set')
      }
    }
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      runAddLocations: 'addLocations'
    }),
    ...mapMutations({
      setCurrentBuyer: 'SET_CURRENT_BUYER',
      updateBuyer: 'UPDATE_BUYER',
      setCurrentOffer: 'SET_CURRENT_OFFER',
      updateOffer: 'UPDATE_OFFER'
    }),
    check () {
      this.nuke_replace = !this.nuke_replace
    },
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
    async toggleContractGeoInheritance () {
      const updatedContract = { ...this.contract }
      updatedContract.toggle_geo_inheritance = false
      switch (this.currentGeoContractType) {
        case 'buyer':
          this.setCurrentBuyer(updatedContract)
          this.updateBuyer(updatedContract)
          break
        case 'offer':
          this.setCurrentOffer(updatedContract)
          this.updateOffer(updatedContract)
          break
        default:
          throw new Error('current_geo_contract_type is not set')
      }
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
          this.runAddLocations(formData).then(() => {
            if (this.nuke_replace) {
              this.toggleContractGeoInheritance()
            }
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
