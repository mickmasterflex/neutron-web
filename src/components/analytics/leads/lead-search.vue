<template>
  <hud-panel ref="form" grid-classes="w-full">
    <template v-slot:hud-content>
      <hud-h1>Search All Leads</hud-h1>
      <p class="text-gray-200">Search by ID or email address, separate with commas.</p>
      <div class="flex flex-col items-start lg:flex-row lg:items-end mt-2">
        <form @submit.prevent="submitForm" class="form">
          <textarea-field
            ref="searchField"
            v-model="searchData"
            field_id="searchparams"
            placeholder="example@gmail.com, 1234, test@gmail.com, 4567"
            field_class="w-full bg-gray-200"
          ></textarea-field>
        </form>
        <button @click="submitForm()" class="btn btn-green my-2 lg:ml-4" :disabled="!searchData">Search Leads</button>
      </div>
    </template>
  </hud-panel>
</template>

<style scoped>
  .form {
    width: 100%;
  }
  @media screen and (min-width: 800px) {
    .form {
      width: 500px;
    }
  }
</style>

<script>
import { validate } from 'vee-validate'
import { mapActions } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import hudPanel from '@/components/ui/hud/default'

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
          emails: this.searchEmails.join(),
          ids: this.searchIds.join()
        }).finally(() => {
          this.searchEmails = []
          this.searchIds = []
        })
      })
    },
    enterKeyAction () {
      if (this.$refs.searchField.$refs.field === document.activeElement && !!this.searchData) {
        this.submitForm()
      }
    }
  },
  components: {
    'hud-panel': hudPanel
  },
  mixins: [enterKeyListener]
}
</script>
