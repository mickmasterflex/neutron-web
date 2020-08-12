<template>
  <div class="well well-light">
    Upload a Logo
    <validation-observer v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(uploadFile)">
        <div>
          <validation-provider rules="image" vid="image" name="image" v-slot="{ errors }" ref="provider">
            <input type="file" @change="onSelectedFile" ref="fileInput" style="display: none"/>
            <span>{{ errors[0] }}</span>
          </validation-provider>
          <span class="btn btn-turquoise" @click="$refs.fileInput.click()">
            <font-awesome-icon icon="image"></font-awesome-icon> Select a File
          </span>
          <span v-if="selectedFile" class="text-gray-900"><font-awesome-icon icon="check-circle" class="text-green-600"></font-awesome-icon> {{selectedFile.name}}</span>
        </div>
        <text-field v-model="alt" field_id="alt" field_label="Alt Text"></text-field>
        <button class="btn btn-green" :disabled="!selectedFile">Upload</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      selectedFile: null,
      alt: ''
    }
  },
  mixins: [setResponseErrors],
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand'
    })
  },
  methods: {
    ...mapActions({
      uploadBrandLogo: 'uploadBrandLogo'
    }),
    async onSelectedFile (e) {
      const { valid } = await this.$refs.provider.validate(e)

      if (valid) {
        this.selectedFile = e.target.files[0]
      }
    },
    uploadFile () {
      this.$refs.form.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('image', this.selectedFile)
          formData.append('brand', this.brand.id)
          formData.append('alt', this.alt)
          this.uploadBrandLogo(formData).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
