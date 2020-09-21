<template>
  <div>
    <panel-template v-for="pricingTierGroup in pricingTierGroups" :title="pricingTierGroup.name" :key="pricingTierGroup.id">
      <template v-slot:action>
        <span class="flex flex-row mr-2">
          <delete-pricing-tier-group :id="pricingTierGroup.id" :type="pricingTierGroup.type"></delete-pricing-tier-group>
          <button @click="showModalSetCurrent(pricingTierGroup)" class="btn btn-hollow-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
        </span>
       </template>
      <template v-slot:content>
        LIST TIERS HERE
      </template>
    </panel-template>
  </div>
</template>

<script>
import deletePricingTierGroup from '@/components/pricing-tier-groups/delete'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'delete-pricing-tier-group': deletePricingTierGroup
  },
  computed: {
    ...mapGetters({
      pricingTierGroups: 'getPricingTierGroups',
      form: 'getCurrentForm'
    })
  },
  methods: {
    ...mapMutations({
      showModal: 'SHOW_UPDATE_PRICING_TIER_GROUP_MODAL',
      setCurrent: 'SET_CURRENT_PRICING_TIER_GROUP'
    }),
    showModalSetCurrent (group) {
      this.showModal()
      this.setCurrent(group)
    }
  }
}
</script>
