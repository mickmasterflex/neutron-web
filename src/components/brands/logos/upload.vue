<template>
  <div class="well well-light">
    Upload a Logo
    <validation-observer v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(uploadFile)">
        <div>
          <input type="file" @change="onSelectedFile" ref="fileInput" style="display: none">
          <span class="btn btn-turquoise" @click="$refs.fileInput.click()">
            <font-awesome-icon icon="plus"></font-awesome-icon> Select a File
          </span>
          <span v-if="selectedFile">{{selectedFile.name}}</span>
        </div>
        <text-field v-model="alt" field_id="alt" field_label="Alt Text"></text-field>
        <button class="btn btn-green" :disabled="!selectedFile">Upload</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedFile: null,
      alt: ''
    }
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand'
    })
  },
  methods: {
    ...mapActions({
      uploadBrandLogo: 'uploadBrandLogo'
    }),
    onSelectedFile (e) {
      this.selectedFile = e.target.files[0]
    },
    uploadFile () {
      this.$refs.form.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('image', this.selectedFile)
          formData.append('brand', this.brand.id)
          formData.append('alt', this.alt)
          this.uploadBrandLogo(formData).catch(e => {
            window.console.log(e.response)
          })
        }
      })
    }
  }
}
</script>
