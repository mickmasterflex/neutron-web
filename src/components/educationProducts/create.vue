<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Education Product</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required" field_id="educationProductName" field_label="Education Product Name"></v-text-field>
          <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
          <select-field v-model="area_of_interest" :options="interestOptions" field_id="areaOfInterest" field_label="Area Of Interest"></select-field>
          <select-field v-model="degree_level" :options="degreeLevelOptions" field_id="degreeLevel" field_label="Degree Level"></select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Education Product</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'

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
      }
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateEducationProductModal'
    })
  },
  props: {
    campusId: {
      type: Number,
      required: true
    }
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      create: 'createEducationProduct'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_EDUCATION_PRODUCT_MODAL'
    }),
    close () {
      this.name = ''
      this.short_description = ''
      this.description = ''
      this.area_of_interest = ''
      this.degree_level = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            short_description: this.short_description,
            description: this.description,
            area_of_interest: this.area_of_interest,
            product_group: this.campusId
          }).then(() => {
            this.close()
          })
        }
      })
    }
  }
}
</script>
