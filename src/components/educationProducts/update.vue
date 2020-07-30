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
      interestOptions: {
        arts: { name: 'arts', id: 'arts' },
        businessAndManagement: { name: 'businessAndManagement', id: 'businessAndManagement' },
        computersAndTechnology: { name: 'computersAndTechnology', id: 'computersAndTechnology' },
        criminalJusticeAndLegal: { name: 'criminalJusticeAndLegal', id: 'criminalJusticeAndLegal' },
        culinary: { name: 'culinary', id: 'culinary' },
        educationAndTeaching: { name: 'educationAndTeaching', id: 'educationAndTeaching' },
        hospitalityAndTravel: { name: 'hospitalityAndTravel', id: 'hospitalityAndTravel' },
        liberalArts: { name: 'liberalArts', id: 'liberalArts' },
        nursingAndHealthCare: { name: 'nursingAndHealthCare', id: 'nursingAndHealthCare' },
        psychologyAndHumanServices: { name: 'psychologyAndHumanServices', id: 'psychologyAndHumanServices' },
        religion: { name: 'religion', id: 'religion' },
        scienceAndMath: { name: 'scienceAndMath', id: 'scienceAndMath' },
        tradesAndVocationalEducation: { name: 'tradesAndVocationalEducation', id: 'tradesAndVocationalEducation' }
      },
      degree_level: '',
      degreeLevelOptions: {
        unknown: { name: 'unknown', id: 'unknown' },
        certificate: { name: 'certificate', id: 'certificate' },
        associates: { name: 'associates', id: 'associates' },
        diploma: { name: 'diploma', id: 'diploma' },
        bachelors: { name: 'bachelors', id: 'bachelors' },
        masters: { name: 'masters', id: 'masters' },
        doctorate: { name: 'doctorate', id: 'doctorate' }
      },
      product_group: ''
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
      this.product_group = this.educationProduct.product_group
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
        product_group: this.product_group,
        id: this.educationProduct.id
      })
    }
  }
}
</script>
