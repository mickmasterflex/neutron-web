<template>
  <panel-template title="Upload a Banner" :actionTransition="true">
    <template v-slot:action>
      <button v-show="image" @click="uploadFile()" class="btn btn-green"><font-awesome-icon icon="upload"></font-awesome-icon> Upload</button>
    </template>
    <template v-slot:content>
      <validation-observer v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(uploadFile)" class="form-horizontal">
          <file-field @input="fileSelected($event)" rules="image" field_id="image" field_label="Banner"></file-field>
          <text-field v-model="alt" field_id="alt" field_label="Alt Text"></text-field>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'
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
      brand: 'getCurrentBrand'
    })
  },
  watch: {
    brand () {
      this.alt = this.brand.name + ' banner'
    }
  },
  methods: {
    ...mapActions({
      uploadBrandBanner: 'uploadBrandBanner'
    }),
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
