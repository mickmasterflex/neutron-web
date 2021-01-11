<template>
  <v-select-field
    v-bind="$attrs"
    :loading="loading"
    :field_wrap_class="inner_value ? 'well' : ''" v-model="inner_value"
    :options="pricingTierGroups"
    field_label="Pricing Tier Group">
    <list-tiers class="mt-3" tableWidth="auto" emptyTableClass="max-w-sm" v-if="currentGroup" :pricingTiers='currentGroup.pricingtier_set'></list-tiers>
  </v-select-field>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import listTiers from '@/components/pricing-tiers/tiers/list'
import validation from '@/mixins/fields/validation'

export default {
  mixins: [validation],
  methods: {
    ...mapActions({
      fetchPricingTierGroups: 'fetchPricingTierGroups'
    })
  },
  computed: {
    ...mapGetters({
      pricingTierGroups: 'getPricingTierGroups',
      getPricingTierGroupById: 'getPricingTierGroupById',
      loading: 'getPricingTierGroupsFetchLoading'
    }),
    currentGroup () {
      return this.getPricingTierGroupById(Number(this.inner_value))
    }
  },
  components: {
    'list-tiers': listTiers
  },
  created () {
    this.fetchPricingTierGroups()
  }
}
</script>
