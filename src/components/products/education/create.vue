<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Education Product</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Education Product Name"></v-text-field>
          <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
          <v-select-field v-model="area_of_interest" :options="areas_of_interest" field_id="area_of_interest" field_label="Area Of Interest"></v-select-field>
          <v-select-field v-model="degree_level" :options="degree_levels" field_id="degree_level" field_label="Degree Level"></v-select-field>
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
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

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
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateEducationProductModal',
      areas_of_interest: 'getAreasOfInterest',
      degree_levels: 'getDegreeLevels'
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
