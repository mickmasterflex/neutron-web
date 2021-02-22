<template>
  <base-panel-grid>
    <table-empty-state
      class="well col-span-2"
      v-if="loading"
      heading="Loading"
      :copy="loadingText"></table-empty-state>
    <table-empty-state
      class="well col-span-2"
      v-else-if="pricingTierGroups === undefined"
      heading="No Pricing Tier Groups Added"
      copy="Use the 'New Group' button to add pricing tier groups."></table-empty-state>
    <panel-template v-for="pricingTierGroup in pricingTierGroups" :title="pricingTierGroup.name" :key="pricingTierGroup.id" class="col-span-2">
      <template v-slot:action>
      <btn-group-right>
        <delete-pricing-tier-group :id="pricingTierGroup.id" :type="pricingTierGroup.type"></delete-pricing-tier-group>
        <button @click="showModalSetCurrent(pricingTierGroup)" class="btn btn-hollow-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
      </btn-group-right>
      </template>
      <template v-slot:content>
        <list-tiers :pricingTiers='pricingTierGroup.pricingtier_set'></list-tiers>
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import deletePricingTierGroup from '@/components/pricing-tiers/groups/delete'
import listTiers from '@/components/pricing-tiers/tiers/list'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'delete-pricing-tier-group': deletePricingTierGroup,
    'list-tiers': listTiers
  },
  computed: {
    ...mapGetters({
      pricingTierGroups: 'getPricingTierGroups',
      form: 'getCurrentForm',
      loading: 'getPricingTierGroupsFetchLoading',
      loadingText: 'getPricingTierGroupsFetchLoadingText'
    })
  },
  methods: {
    ...mapMutations({
      showModal: 'SHOW_UPDATE_PRICING_TIER_GROUP_MODAL',
      setCurrent: 'SET_CURRENT_PRICING_TIER_GROUP',
      setCurrentPricingTiers: 'SET_CURRENT_PRICING_TIERS'
    }),
    showModalSetCurrent (group) {
      this.showModal()
      this.setCurrent(group)
      this.setCurrentPricingTiers(group.pricingtier_set)
    }
  }
}
</script>
