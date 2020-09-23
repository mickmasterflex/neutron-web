<template>
  <div>
    <table v-if="pricingTiers" class="table">
      <thead>
      <tr>
        <th class="th">Lower Bound</th>
        <th class="th">Upper Bound</th>
        <th class="th">Payout</th>
        <th class="th"></th>
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
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>

export default {
  props: {
    pricingTiers: Array
  }
}
</script>
