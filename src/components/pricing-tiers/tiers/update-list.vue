<template>
  <div class="well">
    <ul class="fields-inline-heading px-1">
      <li class="w-40 fields-inline-heading-item">Lower Bound</li>
      <li class="w-40 fields-inline-heading-item">Upper Bound</li>
      <li class="w-40 fields-inline-heading-item">Payout</li>
    </ul>
    <ul>
      <li class="card card-sm mb-1 flex flex-row items-center justify-between" v-for="pricingTier in pricingTiers" :key="pricingTier.id">
        <update-pricing-tier :pricingTier="pricingTier"></update-pricing-tier>
        <delete-pricing-tier class="mx-1" :tier="pricingTier"></delete-pricing-tier>
      </li>
    </ul>
  </div>
</template>

<script>
import deletePricingTier from '@/components/pricing-tiers/tiers/delete'
import updatePricingTier from '@/components/pricing-tiers/tiers/update'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      pricingTiers: 'getCurrentPricingTiers'
    })
  },
  components: {
    'delete-pricing-tier': deletePricingTier,
    'update-pricing-tier': updatePricingTier
  }
}
</script>
