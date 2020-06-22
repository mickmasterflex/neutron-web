<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="brandName" field_label="Brand Name"></v-text-field>
      <v-text-area v-model="short_description" rules="required|alpha_dash" field_id="short_description" field_label="ShortDescription"></v-text-area>
      <text-field v-model="alias" rules="required" field_id="alias" field_label="Alias"></text-field>
      <text-field v-model="website" rules="required" field_id="website" field_label="Wesbite"></text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      short_description: '',
      alias: '',
      website: ''
    }
  },
  props: {
    brand: Object
  },
  watch: {
    brand: function () {
      this.name = this.brand.name
      this.short_description = this.brand.short_description
      this.alias = this.brand.alias
      this.website = this.brand.website
    }
  },
  methods: {
    ...mapActions({
      update: 'updateBrand'
    }),
    submitForm () {
      this.update({
        name: this.name,
        short_description: this.short_description,
        alias: this.alias,
        website: this.website
      })
    }
  }
}
</script>
