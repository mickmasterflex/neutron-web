<template>
  <div ref="form" class="bg-gray-800 p-5 pt-3 rounded-lg">
    <form @submit.prevent="submitForm">
      <v-textarea-field
        rules="required"
        v-model="searchData"
        field_id="searchparams"
        :placeholder="`Search by ID or email address, separate with commas.\nie: example@gmail.com, 1234, test@gmail.com, 4567`"
        field_class="w-full bg-gray-900 border-gray-700 text-gray-200"
      ></v-textarea-field>
    </form>
    <button @click="submitForm()" class="btn btn-green mt-2">Search Leads</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Validator } from 'vee-validate'

export default {
  data () {
    return {
      searchData: '',
      parsedEmails: '',
      parsedIds: ''
    }
  },
  computed: {
    parsedData () {
      return this.searchData.split(', ')
    }
  },
  methods: {
    ...mapActions({
      searchLeads: 'searchLeads'
    }),
    returnEmailz () {
      const v = new Validator()
      const { valid } = v.verify('test@searchData.com', 'email')
      console.log(valid)
    },
    async submitForm () {
      await this.returnEmailz().then(() => {
        this.searchLeads({
          emails: this.parsedEmails
        })
      })
    }
    // async submitForm () {
    //   this.$refs.form.validate().then(success => {
    //     this.getEmails().then(() => {
    //       if (success) {
    //         console.log(this.parsedEmails)
    //         this.searchLeads({
    //           emails: this.parsedEmails
    //         }).catch(error => {
    //           this.error = error
    //         })
    //       }
    //     })
    //   })
    // }
  }
}
</script>
