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
      <tr class="tr" v-for="relation in contractRelations.sort((a, b) => (a.id > b.id) ? 1 : -1)" :key="relation.id">
        <td class="td">
          <span>{{ getPartner(relation[getContractType().contract]) }}</span>
        </td>
        <td class="td">
          <!-- TODO halp me style these -->
          <checkbox-single v-model="relation.suppressed" :field_id="`suppressed-${relation.id}`" :field_label="showSuppressed(relation.suppressed)" @input="updateSuppressionStatus(relation, relation.suppressed)"/>
        </td>
        <td class="td">
          <span class="flex flex-row justify-start">
            <button class="btn btn-circle btn-hollow-blue" @click="showModalSetCurrentPricingTierGroup(getPricingTierGroupById(relation.pricing_tier_group), relation)"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
            <span v-if="relation.pricing_tier_group">{{ getPricingTierGroupById(relation.pricing_tier_group).name }}</span>
            <span v-else>No Pricing Tier Set</span>
          </span>
        </td>
        <td class="td">
          <span v-if="relation.caps.month_caps.length || relation.caps.day_caps.length" class="flex flex-row justify-start">
            <!-- TODO need to update button click to update caps -->
            <button class="btn btn-circle btn-hollow-blue"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
            <span>{{ relation.caps.month_caps.length }} Month Caps, {{ relation.caps.day_caps.length }} Day Caps</span>
          </span>
          <span v-else class="flex flex-row justify-start">
            <button class="btn btn-circle btn-hollow-blue"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
            <span>No Caps Set</span>
          </span>
        </td>
        <td class="td">
          <span class="flex flex-row justify-end">
            <button class="btn btn-circle btn-hollow-red"><font-awesome-icon icon="minus"></font-awesome-icon></button>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Contract Relations" copy="Use the 'New Contract Relation' to add Contract Relations"></table-empty-state>
    <update-pricing-tier-group></update-pricing-tier-group>
    <pricing-tier-group-modal-list :pricing_tier_groups="pricingTierGroups"></pricing-tier-group-modal-list>
  </div>
</template>

<script>
import updatePricingTierGroup from '@/components/pricing-tier-groups/update'
import pricingTierModalList from '@/components/pricing-tier-groups/modal-list'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    contractRelations: Array,
    contractType: String
  },
  computed: {
    ...mapGetters({
      partners: 'getAllPartners',
      partnerById: 'getPartnerById',
      pricingTierGroups: 'getPricingTierGroups',
      pricingTierGroupById: 'getPricingTierGroupById'
    })
  },
  methods: {
    ...mapActions({
      fetchPartners: 'fetchPartners',
      fetchPricingTierGroups: 'fetchPricingTierGroups',
      updateContractRelation: 'updateContractRelation'
    }),
    ...mapMutations({
      setCurrentPricingTierGroup: 'SET_CURRENT_PRICING_TIER_GROUP',
      showPricingTierGroupModal: 'SHOW_UPDATE_PRICING_TIER_GROUP_MODAL',
      showPricingTierListModal: 'SHOW_LIST_PRICING_TIER_GROUP_MODAL',
      setCurrentPricingTiers: 'SET_CURRENT_PRICING_TIERS',
      setCurrentContractRelation: 'SET_CURRENT_CONTRACT_RELATION'
    }),
    getContractType () {
      // needs to return opposite of whatever contract type it is
      return {
        type: this.contractType === 'buyer' ? 'Partner' : 'Buyer',
        contract: this.contractType === 'buyer' ? 'partner_contract' : 'buyer_contract'
      }
    },
    getPartner (partnerId) {
      const partner = this.partnerById(partnerId)
      return partner.name
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
    this.fetchPartners()
    this.fetchPricingTierGroups()
  },
  components: {
    'update-pricing-tier-group': updatePricingTierGroup,
    'pricing-tier-group-modal-list': pricingTierModalList
  }
}
</script>
