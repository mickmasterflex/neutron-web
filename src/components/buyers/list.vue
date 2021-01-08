<template>
  <transition-table-state>
    <table v-if="contracts.length" class="table table-white">
      <thead>
        <tr>
          <th class="th w-64">Name</th>
          <th class="th w-32">Status</th>
          <th class="th w-16">Id</th>
          <th class="th">Client</th>
          <th class="th">Children</th>
          <th class="th">RPL</th>
          <th class="th">Caps</th>
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
          <td class="td">
            <table-link @table-link-click="linkToBuyerContracts(contract)">{{ contract.children.length }} </table-link>
          </td>
          <td class="td">{{ contract.rpl }}</td>
            <td class="td">
              <span v-if="contract.caps.month_caps.length || contract.caps.day_caps.length">{{ contract.caps.month_caps.length }} Month,
                    {{ contract.caps.day_caps.length }} Day
              </span>
          <span v-else class="italic text-gray-500">No Caps Set</span>
            </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       :heading="emptyStateHeading"
                       :copy="emptyStateCopy"
    ></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    contracts: Array,
    client: String,
    children: String,
    caps: Object,
    emptyStateHeading: {
      type: String,
      default: 'No Buyer Contracts'
    },
    emptyStateCopy: {
      type: String,
      default: 'Use the \'New Buyer\' button to add buyers to this client.'
    }
  },
  methods: {
    ...mapMutations({
      setCurrentBuyer: 'SET_CURRENT_BUYER',
      setCurrentForm: 'SET_CURRENT_FORM',
      sortCurrentFormFields: 'SORT_CURRENT_FORM_FIELDS'
    }),
    linkToBuyer (contract) {
      this.setCurrentBuyer(contract)
      this.setCurrentForm(contract.form)
      this.sortCurrentFormFields()
      this.$router.push({ name: 'BuyerContract', params: { client: this.client, id: contract.id } })
    },
    linkToBuyerContracts (contract) {
      this.setCurrentBuyer(contract)
      this.$router.push({ name: 'BuyerContractChildren', params: { client: this.client, id: contract.id } })
    }
  }
}
</script>
