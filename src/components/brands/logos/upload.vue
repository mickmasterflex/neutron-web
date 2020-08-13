<template>
  <div class="well well-light">
    <validation-observer v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(uploadFile)" class="form-horizontal">
        <file-field @input="fileSelected($event)" rules="image" field_id="image" field_label="Upload a Logo"></file-field>
        <text-field v-model="alt" field_id="alt" field_label="Alt Text"></text-field>
        <button class="btn btn-green" :disabled="!image">Upload</button>
      </form>
    </validation-observer>
  </div>
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
      this.alt = this.brand.name + ' logo'
    }
  },
  methods: {
    ...mapActions({
      uploadBrandLogo: 'uploadBrandLogo'
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
          this.uploadBrandLogo(formData).catch(error => {
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
