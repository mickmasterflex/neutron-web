<template>
  <transition-table-state>
    <table v-if="contracts.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Contract</th>
        <th class="th">Leads</th>
        <th class="th">Sold Leads</th>
        <th class="th">Revenue</th>
        <th class="th">Margin</th>
        <th class="th">Payout</th>
        <th class="th">Scrub Rate</th>
        <th class="th">Margin Percent</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="contract in contracts" :key="contract.id">
        <td class="td">
          <span class="text-link" @click="linkToContract({ name: contract.name, id: contract.id })">{{contract.name}}</span>
        </td>
        <td class="td">
          <table-link :number="descendantContractDataById(contract.id)[0] ? descendantContractDataById(contract.id)[0].lead_count : contract.lead_count"
                      @table-link-click="linkToContractLeads({ name: contract.name, id: contract.id })"
          ></table-link>
        </td>
        <td-number :number="descendantContractDataById(contract.id)[0] ? descendantContractDataById(contract.id)[0].sold_count : contract.sold_count"></td-number>
        <td-number :dollar="true" :number="descendantContractDataById(contract.id)[0] ? descendantContractDataById(contract.id)[0].revenue : contract.revenue"></td-number>
        <td-number :dollar="true" :number="descendantContractDataById(contract.id)[0] ? descendantContractDataById(contract.id)[0].margin : contract.margin"></td-number>
        <td-number :dollar="true" :number="descendantContractDataById(contract.id)[0] ? descendantContractDataById(contract.id)[0].payout : contract.payout"></td-number>
        <td class="td">{{descendantContractDataById(contract.id)[0] ? descendantContractDataById(contract.id)[0].scrub_rate : contract.scrub_rate}}</td>
        <td class="td">{{descendantContractDataById(contract.id)[0] ? descendantContractDataById(contract.id)[0].margin_percent : contract.margin_percent}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No stats in selected date range"
                       key="empty"
                       class="well"
                       copy="Try altering the date range"></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    parentContractId: {
      type: Number
    },
    isClientContracts: {
      type: Boolean,
      required: true
    },
    linkToContract: {
      type: Function,
      required: true
    },
    linkToContractLeads: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      descendantContractDataById: 'getCurrentStatsDescendantContractDataById',
      parentlessContracts: 'getCurrentStatsContractsParentless',
      contractsByParent: 'getCurrentStatsContractsByParent'
    }),
    contracts () {
      if (this.isClientContracts === true) {
        return this.parentlessContracts
      }
      return this.contractsByParent(this.parentContractId)
    }
  }
}
</script>
