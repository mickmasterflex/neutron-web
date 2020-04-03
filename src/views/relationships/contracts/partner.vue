<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{contract.name}}</h1>
      <div>
        <stat-card v-if="contract.parent" v-bind:data="contract.parent" v-bind:title="`Parent`" v-bind:color="`teal`"></stat-card>
        <stat-card v-bind:data="contract.client" v-bind:title="`Client`" v-bind:color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Partner Contracts</h3>
    <delete-partner-contract :client="contract.client" :id="id"></delete-partner-contract>
  </div>
</template>

<script>
import axios from '../../../axios'
import deletePartnerContract from '../../../components/contracts/partner/delete'

export default {
  data () {
    return {
      contract: {
        name: null,
        client: null,
        parent: null,
        form: null
      },
      output: null
    }
  },
  props: ['client', 'id'],
  components: {
    'delete-partner-contract': deletePartnerContract
  },
  methods: {
    getContract () {
      axios
        .get(`/partners/${this.id}/`)
        .then(response => {
          this.contract = response.data
        }).catch(error => {
          this.output = error
          this.errored = true
        })
    }
  },
  created () {
    this.getContract()
  }
}
</script>
