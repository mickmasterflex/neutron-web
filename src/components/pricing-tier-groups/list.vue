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
            <button @click="showModal()" class="btn btn-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      ...Loading...
    </div>
    <update-pricing-tier-group></update-pricing-tier-group>
  </div>
</template>

<script>
import deletePricingTierGroup from '@/components/pricing-tier-groups/delete'
import updatePricingTierGroup from '@/components/pricing-tier-groups/update'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'delete-pricing-tier-group': deletePricingTierGroup,
    'update-pricing-tier-group': updatePricingTierGroup
  },
  computed: {
    ...mapGetters({
      pricingTierGroups: 'getPricingTierGroups',
      form: 'getCurrentForm'
    })
  },
  methods: {
    ...mapMutations({
      show: 'SHOW_UPDATE_PRICING_TIER_GROUP_MODAL'
    }),
    showModal () {
      this.show()
    }
  }
}
</script>
