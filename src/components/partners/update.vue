<template>
  <panel-template title="Edit Partner" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          <select-field v-model="parent" :options="siblings" field_id="parent" field_label="Parent"></select-field>
          <v-select-field v-model="pricing_tier_group" :options="pricingTierGroups" field_label="Pricing Tier Group"></v-select-field>
          <list-tiers v-if="currentGroup" :pricingTiers='currentGroup.pricingtier_set'></list-tiers>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import listTiers from '@/components/pricing-tiers/list'
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      parent: '',
      pricing_tier_group: ''
    }
  },
  components: {
    'list-tiers': listTiers
  },
  props: {
    partner: Object
  },
  watch: {
    partner: function () {
      this.setPartner()
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updatePartner',
      fetchPricingTierGroups: 'fetchPricingTierGroups'
    }),
    setPartner () {
      this.name = this.partner.name
      this.parent = this.partner.parent
      this.pricing_tier_group = this.partner.pricing_tier_group
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            parent: this.parent,
            client: this.partner.client,
            id: this.partner.id,
            pricing_tier_group: this.pricing_tier_group
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  created () {
    this.setPartner()
    this.fetchPricingTierGroups()
  },
  computed: {
    ...mapGetters({
      siblings: 'getPartnerSiblings',
      pricingTierGroups: 'getPricingTierGroups',
      getPricingTierGroupById: 'getPricingTierGroupById'
    }),
    currentGroup () {
      if (this.pricing_tier_group) {
        return this.getPricingTierGroupById(Number(this.pricing_tier_group))
      } else {
        return null
      }
    },
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.partner.name || this.parent !== this.partner.parent || this.pricing_tier_group !== this.partner.pricing_tier_group
      } else {
        return false
      }
    }
  }
}
</script>
