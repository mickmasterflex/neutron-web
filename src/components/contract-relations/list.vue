<template>
  <div>
    <table v-if="contractRelations.length" class="table table-white table-shadow">
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
          <input v-model="relation.suppressed"
                 type="checkbox"
                 :id="`suppressed-${relation.id}`"
                 @change="updateSuppressionStatus(relation, relation.suppressed)"
                 class="mr-1"
          >
          <span :class="relation.suppressed ? 'text-red-500' : 'text-green-600'" class="font-bold"> {{ showSuppressed(relation.suppressed) }}</span>
        </td>
        <td class="td">
          <span class="flex flex-row justify-start">
            <button class="btn btn-circle btn-hollow-blue mr-1"
                    @click="showModalSetCurrentPricingTierGroup(getPricingTierGroupById(relation.pricing_tier_group), relation)"
            >
              <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
            </button>
            <span v-if="relation.pricing_tier_group">
              {{ getPricingTierGroupById(relation.pricing_tier_group).name }}
            </span>
            <span v-else class="italic text-gray-500">No Pricing Tier Set</span>
          </span>
        </td>
        <td class="td">
          <span class="flex flex-row justify-start">
            <button class="btn btn-circle btn-hollow-blue mr-1" @click="showModalSetCurrentRelation(relation)">
              <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
            </button>
            <span v-if="relation.caps.month_caps.length || relation.caps.day_caps.length">
              {{ relation.caps.month_caps.length }} {{ plural('Month Cap', relation.caps.month_caps.length) }},
              {{ relation.caps.day_caps.length }} {{ plural('Day Cap', relation.caps.day_caps.length) }}
            </span>
            <span v-else class="italic text-gray-500">No Caps Set</span>
          </span>
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
    <pricing-tier-group-modal-list :pricing_tier_groups="pricingTierGroups"></pricing-tier-group-modal-list>
    <caps-modal v-if="currentRelation.id" :capParent="currentRelation.id" capType="relations"></caps-modal>
  </div>
</template>

<script>
import pricingTierModalList from '@/components/contract-relations/modal-list'
import capsModal from '@/components/contract-relations/caps-modal'
import deleteContractRelation from '@/components/contract-relations/delete'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    contractRelations: Array,
    contractType: {
      type: String,
      validator: function (value) {
        return ['buyer', 'partner'].includes(value)
      }
    }
  },
  computed: {
    ...mapGetters({
      partnerById: 'getPartnerById',
      buyerById: 'getBuyerById',
      pricingTierGroups: 'getPricingTierGroups',
      pricingTierGroupById: 'getPricingTierGroupById',
      currentRelation: 'getCurrentContractRelation'
    })
  },
  methods: {
    ...mapActions({
      fetchPricingTierGroups: 'fetchPricingTierGroups',
      updateContractRelation: 'updateContractRelation'
    }),
    ...mapMutations({
      setCurrentPricingTierGroup: 'SET_CURRENT_PRICING_TIER_GROUP',
      showPricingTierListModal: 'SHOW_RELATION_PRICING_TIER_GROUP_MODAL',
      setCurrentPricingTiers: 'SET_CURRENT_PRICING_TIERS',
      setCurrentContractRelation: 'SET_CURRENT_CONTRACT_RELATION',
      showCapsModal: 'SHOW_CAPS_PARENT_MODAL'
    }),
    plural (value, len) {
      return len !== 1 ? value + 's' : value
    },
    sorted (values) {
      return values.sort((a, b) => (a.id > b.id) ? 1 : -1)
    },
    getContractType () {
      // needs to return opposite of whatever contract type it is
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
    },
    getPricingTierGroupById (pricingTierGroupId) {
      return this.pricingTierGroupById(pricingTierGroupId)
    },
    showModalSetCurrentPricingTierGroup (group, relation) {
      this.showPricingTierListModal()
      this.setCurrentContractRelation(relation)
      if (group) {
        this.setCurrentPricingTierGroup(group)
        this.setCurrentPricingTiers(group.pricingtier_set)
      }
    },
    showModalSetCurrentRelation (relation) {
      this.showCapsModal()
      this.setCurrentContractRelation(relation)
    },
    updateSuppressionStatus (relation, status) {
      if (relation) {
        this.updateContractRelation({
          id: relation.id,
          buyer_contract: relation.buyer_contract,
          partner_contract: relation.partner_contract,
          suppressed: status
        }).catch(error => { this.error = error })
      }
    },
    showSuppressed (status) {
      return status === true ? 'Suppressed' : 'Active'
    }
  },
  created () {
    this.fetchPricingTierGroups()
  },
  components: {
    'pricing-tier-group-modal-list': pricingTierModalList,
    'caps-modal': capsModal,
    'delete-contract-relation': deleteContractRelation
  }
}
</script>

<style scoped>
  .suppressed-cell {
    width: 200px;
  }
</style>
