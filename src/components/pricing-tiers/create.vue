<template>
  <div class="well">
    <ul class="fields-inline-heading px-1">
      <li class="w-40 fields-inline-heading-item">Upper Bound</li>
      <li class="w-40 fields-inline-heading-item">Lower Bound</li>
      <li class="w-40 fields-inline-heading-item">Payout</li>
    </ul>
    <div class="text-red-500">
      {{formError}}
    </div>
    <validation-observer v-slot="{ handleSubmit }" ref="form" class="form-horizontal">
      <form @submit.prevent="handleSubmit(submitCreateForm)" class="flex flex-row items-center justify-between card card-sm">
        <span class="fields-inline">
          <v-text-field field_id="newTier_lowerBound" field_class="field-md" v-model="lower_bound" rules="required"/>
          <v-text-field field_id="newTier_upperBound" field_class="field-md" v-model="upper_bound" rules="required"/>
          <v-text-field field_id="newTier_payout" field_class="field-md" v-model="payout" rules="required"/>
        </span>
        <button class="btn btn-green btn-circle mx-1" type="submit"><font-awesome-icon icon="plus"></font-awesome-icon></button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      lower_bound: '0.00',
      upper_bound: '0.00',
      payout: '0.00'
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPricingTiers: 'getCurrentPricingTiers',
      pricingTierGroup: 'getCurrentPricingTierGroup'
    })
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      create: 'createPricingTier'
    }),
    resetForm () {
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    submitCreateForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            lower_bound: this.lower_bound,
            upper_bound: this.upper_bound,
            payout: this.payout,
            pricing_tier_group: this.pricingTierGroup.id
          }).then(() => {
            this.resetForm()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
