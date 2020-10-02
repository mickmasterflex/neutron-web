<template>
  <div class="fields-inline">
    <v-text-field v-model="lower_bound" rules="required" class="field-error-inside"/>
    <v-text-field v-model="upper_bound" rules="required" class="field-error-inside"/>
    <v-text-field v-model="payout" rules="required" class="field-error-inside"/>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      lower_bound: this.pricingTier.lower_bound,
      upper_bound: this.pricingTier.upper_bound,
      payout: this.pricingTier.payout
    }
  },
  props: {
    pricingTier: Object
  },
  computed: {
    tierData () {
      return [this.lower_bound, this.upper_bound, this.payout]
    },
    ...mapGetters({
      showUpdateOptionModal: 'getShowUpdatePricingTierModal'
    })
  },
  watch: {
    tierData () {
      this.addToModified()
    },
    newOrder () {
      this.order = this.newOrder
    }
  },
  methods: {
    ...mapMutations({
      addPricingTierToModified: 'ADD_PRICING_TIER_TO_MODIFIED',
      setUnsavedBaseOptionChanges: 'SET_UNSAVED_BASE_OPTION_CHANGES'
    }),
    addToModified () {
      this.setUnsavedBaseOptionChanges()
      this.addPricingTierToModified({
        id: this.pricingTier.id,
        lower_bound: this.lower_bound,
        upper_bound: this.upper_bound,
        payout: this.payout,
        pricing_tier_group: this.pricingTier.pricing_tier_group
      })
    }
  }
}
</script>
