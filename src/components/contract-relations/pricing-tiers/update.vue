<template>
  <span class="flex flex-row justify-start">
    <button class="btn btn-circle btn-hollow-blue mr-1"
            @click="showModalSetCurrent(getById(contractRelation.pricing_tier_group), contractRelation)">
      <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
    </button>
    <span v-if="contractRelation.pricing_tier_group">
      {{ relationName(contractRelation.pricing_tier_group) }}
    </span>
    <span v-else class="italic text-gray-500">No Pricing Tier Set</span>
  </span>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapActions({
      fetchPricingTierGroups: 'fetchPricingTierGroups'
    }),
    ...mapMutations({
      setCurrentPricingTierGroup: 'SET_CURRENT_PRICING_TIER_GROUP',
      setCurrentPricingTiers: 'SET_CURRENT_PRICING_TIERS',
      showPricingTierListModal: 'SHOW_RELATION_PRICING_TIER_GROUP_MODAL',
      setCurrentContractRelation: 'SET_CURRENT_CONTRACT_RELATION'
    }),
    showModalSetCurrent (group, relation) {
      this.showPricingTierListModal()
      this.setCurrentContractRelation(relation)
      if (group) {
        this.setCurrentPricingTierGroup(group)
        this.setCurrentPricingTiers(group.pricingtier_set)
      }
    },
    relationName (id) {
      const relation = this.getById(id)
      if (relation) {
        return relation.name
      }
    },
    getById (id) {
      return this.pricingTierGroupById(id)
    }
  },
  computed: {
    ...mapGetters({
      pricingTierGroupById: 'getPricingTierGroupById'
    })
  },
  created () {
    this.fetchPricingTierGroups()
  },
  props: {
    contractRelation: {
      type: Object,
      required: true
    }
  }
}
</script>
