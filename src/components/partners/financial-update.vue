<template>
  <panel-template title="Financial Information" :actionTransition="true" v-bind="$attrs">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <min-rpl-field v-model="minimum_rpl"/>
          <select-pricing-tier-group v-model="pricing_tier_group"></select-pricing-tier-group>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import minRplField from './min-rpl-text-field'
import selectPricingTierGroup from '@/components/pricing-tiers/groups/select'
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      minimum_rpl: null,
      pricing_tier_group: ''
    }
  },
  props: {
    partner: Object
  },
  watch: {
    partner: function () {
      this.setPartner()
    }
  },
  methods: {
    ...mapActions({
      update: 'updatePartner'
    }),
    setPartner () {
      this.minimum_rpl = this.partner.minimum_rpl
      this.pricing_tier_group = this.partner.pricing_tier_group
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            id: this.partner.id,
            status: this.partner.status,
            client: this.partner.client,
            name: this.partner.name,
            minimum_rpl: this.minimum_rpl,
            pricing_tier_group: this.pricing_tier_group
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  mixins: [setResponseErrors],
  created () {
    this.setPartner()
  },
  computed: {
    ...mapGetters({
      statuses: 'getAllContractStatuses'
    }),
    unsavedChanges () {
      if (this.partner.name) {
        return this.minimum_rpl !== this.partner.minimum_rpl ||
          this.pricing_tier_group !== this.partner.pricing_tier_group
      } else {
        return false
      }
    }
  },
  components: {
    'select-pricing-tier-group': selectPricingTierGroup,
    'min-rpl-field': minRplField
  }
}
</script>
