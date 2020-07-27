<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="educationProductName" field_label="Education Product Name"></v-text-field>
      <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
      <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
      <select-field v-model="area_of_interest" :options="interestOptions" field_id="areaOfInterest" field_label="Area Of Interest"></select-field>
      <select-field v-model="degree_level" :options="degreeLevelOptions" field_id="degreeLevel" field_label="Degree Level"></select-field>
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
      description: '',
      area_of_interest: '',
      degree_level: ''
    }
  },
  props: {
    educationProduct: Object
  },
  watch: {
    educationProduct: function () {
      this.name = this.educationProduct.name
      this.short_description = this.educationProduct.short_description
      this.description = this.educationProduct.description
      this.area_of_interest = this.educationProduct.area_of_interest
      this.degree_level = this.educationProduct.degree_level
    }
  },
  methods: {
    ...mapActions({
      update: 'updateEducationProduct'
    }),
    submitForm () {
      this.update({
        name: this.name,
        short_description: this.short_description,
        description: this.description,
        area_of_interest: this.area_of_interest,
        id: this.educationProduct.id
      })
    }
  }
}
</script>
