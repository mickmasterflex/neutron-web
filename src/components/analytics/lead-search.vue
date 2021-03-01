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
import { validate } from 'vee-validate'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      searchData: '',
      mails: []
    }
  },
  computed: {
    parsedData () {
      return this.searchData.split(',')
    },
    parsedEmails () {
      return this.parsedData.filter(data => {
        validate(data, 'email').then(result => {
          if (result.valid) {
            return true
          }
        })
      })
    },
    parsedIds () {
      return this.parsedData.filter(async data => {
        await validate(data, 'integer').then(result => {
          return result.valid
        })
      })
    }
  },
  methods: {
    ...mapActions({
      searchLeads: 'searchLeads'
    }),
    parsedEmailz () {
      this.parsedData.forEach(async data => {
        await validate(data, 'email').then(result => {
          if (result.valid) {
            console.log(result.valid)
            console.log(data)
            this.mails.push(data)
          }
        })
      })
    },
    submitForm () {
      this.parsedEmailz()
      this.searchLeads({
        emails: this.mails.join(', ')
      })
    }
  }
}
</script>
