<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{contract.name}}</h1>
      <div>
        <stat-card v-if="contract.parent" v-bind:data="contract.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="contract.client" :title="`Client`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Delete Buyer Contract</h3>
    <delete-buyer-contract :client="client" :id="id"></delete-buyer-contract>

    <h3 class="h3 mt-5 mb-2">Update Buyer Contract</h3>
    <update-buyer-contract :client="client" :id="id"></update-buyer-contract>
  </div>
</template>
<script>
import axios from '../../../axios'
import deleteBuyerContract from '../../../components/contracts/partner/delete'
import updateBuyerContract from '../../../components/contracts/partner/update'

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
    'delete-buyer-contract': deleteBuyerContract,
    'update-buyer-contract': updateBuyerContract
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
