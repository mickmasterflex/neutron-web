<template>
  <transition-table-state>
    <table v-if="contracts.length" class="table table-striped">
      <thead>
        <tr>
          <th class="th w-4"></th>
          <th class="th w-16">Id</th>
          <th class="th w-64">Name</th>
          <th class="th w-32">Status</th>
          <th class="th">Client</th>
          <th class="th">RPL</th>
          <th class="th">Caps</th>
          <th class="th">Contracts</th>
          <th class="th">Offers</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr w-64" v-for="(contract, index) in contracts" :key="contract.id">
          <td class="td w-4">
            <bulk-update-checkbox :contract="contract.id" :contracts="contracts" :index="index"></bulk-update-checkbox>
          </td>
          <td class="td w-16">{{ contract.id }}</td>
          <td class="td">
            <span @click="linkToBuyer(contract)" class="text-link">{{contract.name}}</span>
          </td>
          <td-status :status="contract.status"/>
          <td class="td">{{ contract.client_data.name }}</td>
          <td class="td">{{ contract.rpl }}</td>
          <td class="td">
            <caps-count :caps="contract.caps"></caps-count>
          </td>
          <td class="td">
            <table-link @table-link-click="linkToBuyerContracts(contract)"
                        :number="contract.children.length"
            ></table-link>
          </td>
          <td class="td">
            <table-link @table-link-click="linkToBuyerOffers(contract)"
                        :number="contract.offer_contracts.length"
            ></table-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       :heading="emptyStateHeading"
                       :copy="emptyStateCopy"
                       class="well"
    ></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'
import bulkUpdateCheckbox from '@/components/bulk-update/status/buyer-checkbox'
import capsCount from '@/components/caps/caps-count'
import statusActivateTd from '@/components/contracts/td-status'

export default {
  props: {
    contracts: Array,
    client: String,
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
      setCurrentClientData: 'SET_CURRENT_CLIENT_DATA',
      setCurrentAncestors: 'SET_CURRENT_ANCESTORS',
      sortCurrentFormFields: 'SORT_CURRENT_FORM_FIELDS',
      resetShiftClickIndex: 'RESET_BULK_UPDATE_BUYERS_SHIFT_CLICK_INDEX'
    }),
    setCurrentBuyerAndForm (contract) {
      this.setCurrentBuyer(contract)
      this.setCurrentClientData(contract.client_data)
      this.setCurrentAncestors(contract.ancestors)
      this.setCurrentForm(contract.form)
      this.sortCurrentFormFields()
    },
    linkToBuyer (contract) {
      this.setCurrentBuyerAndForm(contract)
      this.$router.push({ name: 'BuyerContract', params: { client: this.client, id: contract.id } })
    },
    linkToBuyerContracts (contract) {
      this.setCurrentBuyerAndForm(contract)
      this.$router.push({ name: 'BuyerContractContracts', params: { client: this.client, id: contract.id } })
    },
    linkToBuyerOffers (contract) {
      this.setCurrentBuyerAndForm(contract)
      this.$router.push({ name: 'BuyerContractOffers', params: { client: this.client, id: contract.id } })
    }
  },
  components: {
    'bulk-update-checkbox': bulkUpdateCheckbox,
    'caps-count': capsCount,
    'td-status': statusActivateTd
  },
  destroyed () {
    this.resetShiftClickIndex()
  }
}
</script>
