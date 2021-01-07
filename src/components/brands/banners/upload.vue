<template>
  <panel-template title="Upload a Banner"
                  :actionTransition="true"
                  :showLoader="brandLoading ? brandLoading : bannersLoading"
                  :loadingText="brandLoadingText ? brandLoadingText : bannersLoadingText">
    <template v-slot:action>
      <button v-show="image" @click="uploadFile()" class="btn btn-green"><font-awesome-icon icon="upload"></font-awesome-icon> Upload</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form">
        <form @submit.prevent="uploadFile()" class="form-horizontal">
          <file-field @input="fileSelected($event)" rules="image" field_id="image" field_label="Banner"></file-field>
          <text-field v-model="alt" :value="altBanner" field_id="alt" field_label="Alt Text"></text-field>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import fileField from '@/components/ui/forms/validation-fields/file-field'

export default {
  data () {
    return {
      image: null,
      alt: ''
    }
  },
  mixins: [setResponseErrors],
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand',
      brandLoading: 'getBrandBannersFetchLoading',
      brandLoadingText: 'getBrandBannersFetchLoadingText',
      bannersLoading: 'getBrandBannersFetchLoading',
      bannersLoadingText: 'getBrandBannersFetchLoadingText'
    }),
    altBanner: function () {
      const defaultAlt = this.brand.name + ' banner'
      this.setAltBanner(defaultAlt)
      return defaultAlt
    }
  },
  methods: {
    ...mapActions({
      uploadBrandBanner: 'uploadBrandBanner'
    }),
    setAltBanner (alt) {
      this.alt = alt
    },
    fileSelected (file) {
      this.image = file
    },
    uploadFile () {
      this.$refs.form.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('image', this.image)
          formData.append('brand', this.brand.id)
          formData.append('alt', this.alt)
          this.uploadBrandBanner(formData).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  components: {
    'file-field': fileField
  }
}
</script>
