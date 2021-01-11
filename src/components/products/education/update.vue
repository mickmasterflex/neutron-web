<template>
  <panel-template title="Edit Education Product" :actionTransition="true" :showLoader="loading" :loadingText="loadingText">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="Name" field_label="Name"></v-text-field>
          <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
          <select-field v-model="area_of_interest" :options="areas_of_interest" field_id="area_of_interest" field_label="Area Of Interest"></select-field>
          <select-field v-model="degree_level" :options="degree_levels" field_id="degree_level" field_label="Degree Level"></select-field>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      short_description: '',
      description: '',
      area_of_interest: '',
      degree_level: '',
      product_group: ''
    }
  },
  props: {
    educationProduct: Object
  },
  mixins: [setResponseErrors],
  watch: {
    educationProduct () {
      this.setProduct()
    }
  },
  computed: {
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.educationProduct.name || this.short_description !== this.educationProduct.short_description || this.description !== this.educationProduct.description || this.area_of_interest !== this.educationProduct.area_of_interest || this.degree_level !== this.educationProduct.degree_level || this.product_group !== this.educationProduct.product_group
      } else {
        return false
      }
    },
    ...mapGetters({
      loading: 'getEducationProductFetchLoading',
      loadingText: 'getEducationProductFetchLoadingText',
      areas_of_interest: 'getAreasOfInterest',
      degree_levels: 'getDegreeLevels'
    })
  },
  methods: {
    ...mapActions({
      update: 'updateEducationProduct'
    }),
    setProduct () {
      this.name = this.educationProduct.name
      this.short_description = this.educationProduct.short_description
      this.description = this.educationProduct.description
      this.area_of_interest = this.educationProduct.area_of_interest
      this.degree_level = this.educationProduct.degree_level
      this.product_group = this.educationProduct.product_group
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            short_description: this.short_description,
            description: this.description,
            area_of_interest: this.area_of_interest,
            degree_level: this.degree_level,
            product_group: this.product_group,
            id: this.educationProduct.id
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  created () {
    this.setProduct()
  }
}
</script>
