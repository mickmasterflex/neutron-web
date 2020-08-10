<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Brand Name"></v-text-field>
      <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
      <text-field v-model="alias" field_id="alias" field_label="Alias"></text-field>
      <text-field v-model="website" field_id="website" field_label="Website"></text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      name: '',
      id: '',
      short_description: '',
      alias: '',
      website: ''
    }
  },
  props: {
    brand: Object
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateBrand'
    }),
    setBrand () {
      this.name = this.brand.name
      this.id = this.brand.id
      this.short_description = this.brand.short_description
      this.alias = this.brand.alias
      this.website = this.brand.website
    },
    submitForm () {
      this.update({
        name: this.name,
        id: this.id,
        short_description: this.short_description,
        alias: this.alias,
        website: this.website
      }).catch(error => {
        this.error = error
      })
    }
  },
  watch: {
    brand () {
      this.setBrand()
    }
  },
  created () {
    this.setBrand()
  }
}
</script>
