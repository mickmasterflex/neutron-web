<template>
  <div>
    <table v-if="pricingTiers.length" :class="`w-${tableWidth} table table-white table-shadow`">
      <thead class="thead">
        <tr>
          <th class="th pr-8 lg:w-56">Lower Bound</th>
          <th class="th pr-8 lg:w-56">Upper Bound</th>
          <th class="th pr-8">Payout</th>
        </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="pricingTier in pricingTiers" :key="pricingTier.id">
        <td class="td lg:w-56"><font-awesome-icon icon="dollar-sign" class="text-gray-500"></font-awesome-icon> {{pricingTier.lower_bound}}</td>
        <td class="td lg:w-56"><font-awesome-icon icon="dollar-sign" class="text-gray-500"></font-awesome-icon> {{pricingTier.upper_bound}}</td>
        <td class="td"><font-awesome-icon icon="dollar-sign" class="text-gray-500"></font-awesome-icon> {{pricingTier.payout}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Tiers Added" copy="Edit the pricing tier group to add tiers" :class="`w-${tableWidth} ${emptyTableClass} px-4`"></table-empty-state>
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
