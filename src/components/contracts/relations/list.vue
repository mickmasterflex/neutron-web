<template>
  <div>
    <transition-table-state>
      <table v-if="contractRelations.length" class="table table-striped">
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
        <tr class="tr" v-for="(relation, index) in sorted(contractRelations)" :key="relation.id">
          <td class="td">
            <span>{{ getContract(relation[getContractType().contract]) }}</span>
          </td>
          <td class="td suppressed-cell">
            <update-suppressions :contractRelation="relation" :shiftClickList="sorted(contractRelations)" :shiftClickIndex="index"></update-suppressions>
          </td>
          <td class="td">
            <update-pricing-tiers :contractRelation="relation"></update-pricing-tiers>
          </td>
          <td-caps-preview :caps="relation.caps" :parent-id="relation.id" parent-type="relations"/>
          <td class="td">
            <span class="flex flex-row justify-end">
              <delete-contract-relation :id="relation.id"></delete-contract-relation>
            </span>
          </td>
        </tr>
        </tbody>
      </table>
      <table-empty-state v-else heading="No Contract Relations" copy="Use the 'New Contract Relation' to add Contract Relations" class="well"/>
    </transition-table-state>
    <pricing-tier-group-modal-list :pricing_tier_groups="pricingTierGroups"></pricing-tier-group-modal-list>
  </div>
</template>

<script>
import tdCapsPreview from '@/components/caps/td-preview/td'
import deleteContractRelation from '@/components/contracts/relations/delete'
import pricingTierModalList from '@/components/contracts/relations/pricing-tiers/modal'
import updatePricingTiers from '@/components/contracts/relations/pricing-tiers/update'
import updateSuppressions from '@/components/contracts/relations/suppressions/update'
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
      partnerById: 'getPartnerById',
      pricingTierGroups: 'getPricingTierGroups'
    })
  },
  components: {
    'td-caps-preview': tdCapsPreview,
    'delete-contract-relation': deleteContractRelation,
    'pricing-tier-group-modal-list': pricingTierModalList,
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
