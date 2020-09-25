<template>
  <div>
    <table v-if="pricingTiers" class="table">
      <thead>
      <tr>
        <th class="th">Lower Bound</th>
        <th class="th">Upper Bound</th>
        <th class="th">Payout</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="pricingTier in pricingTiers" :key="pricingTier.id">
        <td class="td">{{pricingTier.lower_bound}}</td>
        <td class="td">{{pricingTier.upper_bound}}</td>
        <td class="td">{{pricingTier.payout}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Tiers Added" copy="Edit the pricing tier group to add tiers"></table-empty-state>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      pricingTiers: 'getCurrentPricingTiers'
    })
  }
}
</script>
