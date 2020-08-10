<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Education Product</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Education Product Name"></v-text-field>
          <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
          <select-field v-model="area_of_interest" :options="interestOptions" field_id="area_of_interest" field_label="Area Of Interest"></select-field>
          <select-field v-model="degree_level" :options="degreeLevelOptions" field_id="degree_level" field_label="Degree Level"></select-field>
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
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      name: '',
      short_description: '',
      description: '',
      area_of_interest: '',
      interestOptions: {
        arts: { name: 'Arts', id: 1 },
        businessAndManagement: { name: 'Business & Management', id: 2 },
        computersAndTechnology: { name: 'Computers & Technology', id: 3 },
        criminalJusticeAndLegal: { name: 'Criminal Justice & Legal', id: 4 },
        culinary: { name: 'Culinary', id: 5 },
        educationAndTeaching: { name: 'Education & Teaching', id: 6 },
        hospitalityAndTravel: { name: 'Hospitality & Travel', id: 7 },
        liberalArts: { name: 'Liberal Arts', id: 8 },
        nursingAndHealthCare: { name: 'Nursing & Health Care', id: 9 },
        psychologyAndHumanServices: { name: 'Psychology & Human Services', id: 10 },
        religion: { name: 'Religion', id: 11 },
        scienceAndMath: { name: 'Science And Math', id: 12 },
        tradesAndVocationalEducation: { name: 'Trades & Vocational Education', id: 13 }
      },
      degree_level: '',
      degreeLevelOptions: {
        unknown: { name: 'Unknown', id: 1 },
        certificate: { name: 'Certificate', id: 2 },
        associates: { name: 'Associates', id: 3 },
        diploma: { name: 'Diploma', id: 4 },
        bachelors: { name: 'Bachelors', id: 5 },
        masters: { name: 'Masters', id: 6 },
        doctorate: { name: 'Doctorate', id: 7 }
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
      type: Number
    }
  },
  mixins: [enterKeyListener, setResponseErrors],
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
            degree_level: this.degree_level,
            product_group: this.campusId
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
