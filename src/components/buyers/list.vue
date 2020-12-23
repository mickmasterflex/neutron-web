<template>
  <div>
    <transition-table-state>
      <table v-if="contracts.length" class="table table-white">
        <thead>
          <tr>
            <th class="th w-64">Name</th>
            <th class="th w-32">Status</th>
            <th class="th w-16">Id</th>
            <th class="th">Client</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr class="tr w-64" v-for="contract in this.contracts" :key="contract.id">
            <td class="td">
              <span @click="linkToBuyer(contract)" class="text-link">{{contract.name}}</span>
            </td>
            <td class="td w-32">
              <status-indicator :red="contract.status === 'terminated'"
                                :green="contract.status === 'active'"
                                :yellow="contract.status === 'paused'">
                {{ contract.status }}
              </status-indicator>
            </td>
            <td class="td w-16">{{ contract.id }}</td>
            <td class="td">{{ contract.client }}</td>
          </tr>
        </tbody>
      </table>
      <table-empty-state v-else
                         heading="No Buyer Contracts"
                         copy="Use the 'New Buyer' button to add buyers to this contract."
      ></table-empty-state>
    </transition-table-state>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    contracts: Array,
    client: String
  },
  methods: {
    ...mapMutations({
      setCurrentBuyer: 'SET_CURRENT_BUYER'
    }),
    linkToBuyer (contract) {
      this.setCurrentBuyer(contract)
      this.$router.push({ name: 'BuyerContract', params: { client: this.client, id: contract.id } })
    }
  }
}
</script>
