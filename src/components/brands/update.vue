<template>
  <form-panel title="Edit Brand" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Brand Name"></v-text-field>
          <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
          <text-field v-model="alias" field_id="alias" field_label="Alias"></text-field>
          <text-field v-model="website" field_id="website" field_label="Website"></text-field>
        </form>
      </validation-observer>
    </template>
  </form-panel>
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
      this.$refs.form.validate().then(success => {
        if (success) {
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
      })
    }
  },
  computed: {
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.brand.name || this.id !== this.brand.id || this.short_description !== this.brand.short_description || this.alias !== this.brand.alias || this.website !== this.brand.website
      } else {
        return false
      }
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
