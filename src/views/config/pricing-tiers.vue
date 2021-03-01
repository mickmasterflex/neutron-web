<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">All Pricing Tiers</h1>
    </template>
    <template v-slot:content>
      <action-heading>
        <template v-slot:left>
          <h2 class="h3">Pricing Tier Groups</h2>
        </template>
        <template v-slot:right>
          <create-pricing-tier-group></create-pricing-tier-group>
        </template>
      </action-heading>
      <pricing-tier-groups :pricing_tier_groups="pricing_tier_groups" class="mt-5"></pricing-tier-groups>
      <update-pricing-tier-group></update-pricing-tier-group>
    </template>
  </content-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import getPricingTierGroups from '@/components/pricing-tiers/groups/list'
import createPricingTierGroup from '@/components/pricing-tiers/groups/create'
import updatePricingTierGroup from '@/components/pricing-tiers/groups/update'

export default {
  components: {
    'pricing-tier-groups': getPricingTierGroups,
    'create-pricing-tier-group': createPricingTierGroup,
    'update-pricing-tier-group': updatePricingTierGroup
  },
  computed: {
    ...mapGetters({
      pricing_tier_groups: 'getPricingTierGroups'
    })
  },
  methods: {
    ...mapActions({
      fetchPricingTierGroups: 'fetchPricingTierGroups'
    }),
    ...mapMutations({
      showCreatePricingTierGroupModal: 'SHOW_CREATE_PRICING_TIER_GROUP_MODAL'
    })
  },
  created () {
    this.fetchPricingTierGroups()
  }
}
</script>
