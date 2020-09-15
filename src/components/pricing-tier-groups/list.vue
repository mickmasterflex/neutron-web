<template>
  <div>
    <table v-if="pricingTierGroups" class="table">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">ID</th>
        <th class="th"></th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="pricingTierGroup in pricingTierGroups" :key="pricingTierGroup.id">
        <td class="td">{{pricingTierGroup.name}}</td>
        <td class="td">{{pricingTierGroup.id}}</td>
        <td class="td">
          <span class="flex flex-row justify-end">
              <delete-pricing-tier-group :id="pricingTierGroup.id" :type="pricingTierGroup.type"></delete-pricing-tier-group>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
import deletePricingTierGroup from '@/components/pricing-tier-groups/delete'
import { mapGetters } from 'vuex'

export default {
  components: {
    'delete-pricing-tier-group': deletePricingTierGroup
  },
  computed: {
    ...mapGetters({
      pricingTierGroups: 'getPricingTierGroups'
    })
  }
}
</script>
