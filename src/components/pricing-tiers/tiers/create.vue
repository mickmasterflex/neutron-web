<template>
  <div class="well">
    <ul class="fields-inline-heading px-1">
      <li class="w-40 fields-inline-heading-item">Lower Bound</li>
      <li class="w-40 fields-inline-heading-item">Upper Bound</li>
      <li class="w-40 fields-inline-heading-item">Payout</li>
    </ul>
    <div class="text-red-500">
      {{formError}}
    </div>
    <validation-observer v-slot="{ handleSubmit }" ref="form" class="form-horizontal">
      <form @submit.prevent="handleSubmit(submitCreateForm)" class="flex flex-row items-center justify-between card card-sm">
        <span class="fields-inline">
          <v-text-field placeholder="0.00" field_id="lower_bound" field_size="field-md" v-model="lower_bound" rules="required|dollar_amount" ref="lower_bound" mode="passive"/>
          <v-text-field placeholder="0.00" field_id="upper_bound" field_size="field-md" v-model="upper_bound" rules="required|dollar_amount" ref="upper_bound" mode="passive"/>
          <v-text-field placeholder="0.00" field_id="payout" field_size="field-md" v-model="payout" rules="required|dollar_amount" ref="payout" mode="passive"/>
        </span>
        <button ref="submit" class="btn btn-green btn-circle mx-1" type="submit"><font-awesome-icon icon="plus"></font-awesome-icon></button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { enterKeyListener } from '@/mixins/enter-key-listener'

export default {
  data () {
    return {
      lower_bound: '',
      upper_bound: '',
      payout: ''
    }
  },
  computed: {
    ...mapGetters({
      getCurrentPricingTiers: 'getCurrentPricingTiers',
      pricingTierGroup: 'getCurrentPricingTierGroup'
    })
  },
  mixins: [setResponseErrors, enterKeyListener],
  methods: {
    ...mapActions({
      create: 'createPricingTier'
    }),
    resetForm () {
      this.lower_bound = ''
      this.upper_bound = ''
      this.payout = ''
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
            this.resetResponseErrors()
          }).catch(error => {
            this.error = error
          })
        }
      })
    },
    enterKeyAction () {
      if (document.activeElement === this.$refs.submit || document.activeElement === this.$refs.payout.$refs.field.$refs.field || document.activeElement === this.$refs.upper_bound.$refs.field.$refs.field || document.activeElement === this.$refs.lower_bound.$refs.field.$refs.field) {
        this.submitCreateForm()
      }
    }
  }
}
</script>
