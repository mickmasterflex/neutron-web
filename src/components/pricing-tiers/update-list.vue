<template>
    <div class="well">
      <ul class="fields-inline-heading px-1">
        <li class="w-64 fields-inline-heading-item">Lower Bound</li>
        <li class="w-64 fields-inline-heading-item">Upper Bound</li>
        <li class="w-64 fields-inline-heading-item">Payout</li>
      </ul>
      <ul class="card card-sm mb-1 flex flex-row items-center justify-between" v-for="pricingTier in pricingTiers" :key="pricingTier.id">
        <li>{{pricingTier.lower_bound}}</li>
        <li>{{pricingTier.upper_bound}}</li>
        <li>{{pricingTier.payout}}</li>
        <delete-pricing-tier :id="pricingTier.id"></delete-pricing-tier>
      </ul>
    <table-empty-state  heading="No Tiers Added" copy="Edit the pricing tier group to add tiers"></table-empty-state>
  </div>
</template>

<script>
import deletePricingTier from '@/components/pricing-tiers/delete'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      pricingTiers: 'getCurrentPricingTiers'
    })
  },
  components: {
    'delete-pricing-tier': deletePricingTier
  }
}
</script>
