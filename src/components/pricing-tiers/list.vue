<template>
  <div>
    <table v-if="pricingTiers.length" :class="`w-${tableWidth} table table-white table-shadow`">
      <thead class="thead-transparent">
        <tr>
          <th class="th pr-8">Lower Bound</th>
          <th class="th pr-8">Upper Bound</th>
          <th class="th pr-8">Payout</th>
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
    <table-empty-state v-else heading="No Tiers Added" copy="Edit the pricing tier group to add tiers" :class="`w-${tableWidth} ${emptyTableClass}`"></table-empty-state>
  </div>
</template>

<script>

export default {
  props: {
    pricingTiers: Array,
    emptyTableClass: String,
    tableWidth: {
      type: String,
      default: 'full',
      validator: function (value) {
        return ['full', 'auto'].includes(value)
      }
    }
  }
}
</script>
