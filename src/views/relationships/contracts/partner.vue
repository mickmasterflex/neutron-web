<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{contract.name}}</h1>
      <div>
        <stat-card v-if="contract.parent" v-bind:data="contract.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="contract.client" :title="`Client`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Delete Partner Contract</h3>
    <delete-partner-contract :client="client" :id="id"></delete-partner-contract>

    <h3 class="h3 mt-5 mb-2">Update Partner Contract</h3>
    <update-partner-contract :client="client" :id="id"></update-partner-contract>
  </div>
</template>

<script>
import axios from '@/axios'
import deletePartnerContract from '@/components/contracts/partners/delete'
import updatePartnerContract from '@/components/contracts/partners/update'

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
    'delete-partner-contract': deletePartnerContract,
    'update-partner-contract': updatePartnerContract
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
