<template>
  <div>
    <transition-table-state>
      <table v-if="contractRelations.length" class="table table-white">
        <thead>
        <tr>
          <th class="th">{{ getContractType().type }}</th>
          <th class="th">Suppressed</th>
          <th class="th">Pricing Tier Group</th>
          <th class="th">Caps</th>
          <th class="th"></th>
        </tr>
        </thead>
        <tbody class="tbody">
        <tr class="tr" v-for="relation in sorted(contractRelations)" :key="relation.id">
          <td class="td">
            <span>{{ getContract(relation[getContractType().contract]) }}</span>
          </td>
          <td class="td suppressed-cell">
            <update-suppressions :contractRelation="relation"></update-suppressions>
          </td>
          <td class="td">
            <update-pricing-tiers :contractRelation="relation"></update-pricing-tiers>
          </td>
          <td class="td">
            <update-caps :contractRelation="relation"></update-caps>
          </td>
          <td class="td">
            <span class="flex flex-row justify-end">
              <delete-contract-relation :id="relation.id"></delete-contract-relation>
            </span>
          </td>
        </tr>
        </tbody>
      </table>
      <table-empty-state v-else heading="No Contract Relations" copy="Use the 'New Contract Relation' to add Contract Relations" />
    </transition-table-state>
    <pricing-tier-group-modal-list :pricing_tier_groups="pricingTierGroups"></pricing-tier-group-modal-list>
    <caps-modal v-if="currentRelation.id" :capParent="currentRelation.id" capType="relations"></caps-modal>
  </div>
</template>

<script>
import capsModal from '@/components/contract-relations/caps/modal'
import deleteContractRelation from '@/components/contract-relations/delete'
import pricingTierModalList from '@/components/contract-relations/pricing-tiers/modal'
import updateCaps from '@/components/contract-relations/caps/update'
import updatePricingTiers from '@/components/contract-relations/pricing-tiers/update'
import updateSuppressions from '@/components/contract-relations/suppressions/update'

import { mapGetters } from 'vuex'

export default {
  methods: {
    sorted (values) {
      return values.sort((a, b) => (a.id > b.id) ? 1 : -1)
    },
    getContractType () {
      // return opposite of whatever contract type it is
      return {
        type: this.contractType === 'buyer' ? 'Partner' : 'Buyer',
        contract: this.contractType === 'buyer' ? 'partner_contract' : 'buyer_contract'
      }
    },
    getContract (contractId) {
      let contract
      if (this.contractType === 'buyer') {
        contract = this.partnerById(contractId)
      } else {
        contract = this.buyerById(contractId)
      }
      if (contract) {
        return contract.name
      }
    }
  },
  computed: {
    ...mapGetters({
      buyerById: 'getBuyerById',
      currentRelation: 'getCurrentContractRelation',
      partnerById: 'getPartnerById',
      pricingTierGroups: 'getPricingTierGroups'
    })
  },
  components: {
    'caps-modal': capsModal,
    'delete-contract-relation': deleteContractRelation,
    'pricing-tier-group-modal-list': pricingTierModalList,
    'update-caps': updateCaps,
    'update-pricing-tiers': updatePricingTiers,
    'update-suppressions': updateSuppressions
  },
  props: {
    contractRelations: Array,
    contractType: {
      type: String,
      validator: function (value) {
        return ['buyer', 'partner'].includes(value)
      }
    }
  }
}
</script>

<style scoped>
  .suppressed-cell {
    width: 200px;
  }
</style>
