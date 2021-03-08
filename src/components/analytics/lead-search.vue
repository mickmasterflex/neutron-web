<template>
  <div ref="form" class="bg-gray-800 p-5 pt-3 rounded-lg">
    <form @submit.prevent="submitForm">
      <v-textarea-field
        ref="searchField"
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
import { enterKeyListener } from '@/mixins/enter-key-listener'

export default {
  data () {
    return {
      searchData: '',
      searchEmails: [],
      searchIds: []
    }
  },
  computed: {
    searchDataArray () {
      return this.searchData.split(/[ ,]+/)
    }
  },
  methods: {
    ...mapActions({
      searchLeads: 'searchLeads'
    }),
    async parseData () {
      for (let i = 0; i < this.searchDataArray.length; i++) {
        const data = this.searchDataArray[i]
        await validate(data, 'email').then(result => {
          if (result.valid) {
            this.searchEmails.push(data)
          }
        })
        await validate(data, 'integer').then(result => {
          if (result.valid) {
            this.searchIds.push(data)
          }
        })
      }
    },
    submitForm () {
      this.parseData().then(() => {
        this.searchLeads({
          emails: this.searchEmails,
          ids: this.searchIds
        }).finally(() => {
          this.searchEmails = []
          this.searchIds = []
        })
      })
    },
    enterKeyAction () {
      if (this.$refs.searchField.$refs.field.$refs.field === document.activeElement) {
        this.submitForm()
      }
    }
  },
  mixins: [enterKeyListener]
}
</script>
