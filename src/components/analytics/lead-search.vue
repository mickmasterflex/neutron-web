<template>
  <validation-observer ref="form" class="bg-gray-800 p-5 pt-3 rounded-lg">
    <form @submit.prevent="submitForm">
      <v-textarea-field
        rules="required"
        v-model="searchData"
        field_id="searchparams"
        placeholder="example@gmail.com, 1234, test@gmail.com, 4567, "
        field_class="w-full bg-gray-900 border-gray-700 text-gray-200"
      ></v-textarea-field>
    </form>
    <button @click="submitForm()" class="btn btn-green mt-2">Search Leads</button>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      searchData: ''
    }
  },
  methods: {
    ...mapActions({
      searchLeads: 'searchLeads'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.searchLeads({
            emails: this.searchData
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
