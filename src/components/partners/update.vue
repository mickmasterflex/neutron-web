<template>
  <panel-template title="Edit Partner" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
          <select-field v-model="parent" :options="siblings" field_id="parent" field_label="Parent"></select-field>
          <v-select-field v-model="status" rules="required" :options="statusOptions" field_id="status" field_label="Status"></v-select-field>
          <v-text-field v-model="pingbackUrl" mode="passive" placeholder="http://www.example.com/" rules="url" field_id="rpl" field_label="Pingback URL"></v-text-field>
          <date-picker @resetDate="scheduledStart = $event" v-model="scheduledStart" rules="date" field_id="date" field_label="Scheduled Start"></date-picker>
          <v-select-field v-model="pricing_tier_group" :options="pricingTierGroups" field_label="Pricing Tier Group"></v-select-field>
          <list-tiers class="ml-label-width" tableWidth="auto" emptyTableClass="max-w-sm well" v-if="currentGroup" :pricingTiers='currentGroup.pricingtier_set'></list-tiers>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import listTiers from '@/components/pricing-tiers/tiers/list'
import datePicker from '@/components/ui/forms/validation-fields/date-picker'
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      parent: '',
      pingbackUrl: '',
      status: undefined,
      statusOptions: {
        active: { name: 'Active', id: 'active' },
        paused: { name: 'Paused', id: 'paused' },
        archived: { name: 'Archived', id: 'archived' },
        terminated: { name: 'Terminated', id: 'terminated' }
      },
      pricing_tier_group: '',
      scheduledStart: null
    }
  },
  components: {
    'list-tiers': listTiers,
    'date-picker': datePicker
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
      this.pingbackUrl = this.partner.ping_back_url
      this.status = this.partner.status
      this.pricing_tier_group = this.partner.pricing_tier_group
      this.scheduledStart = this.partner.scheduled_start
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            parent: this.parent,
            client: this.partner.client,
            id: this.partner.id,
            ping_back_url: this.pingbackUrl,
            status: this.status,
            pricing_tier_group: this.pricing_tier_group,
            scheduled_start: this.scheduledStart
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
      return this.getPricingTierGroupById(Number(this.pricing_tier_group))
    },
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.partner.name ||
          this.parent !== this.partner.parent ||
          this.status !== this.partner.status ||
          this.pingbackUrl !== this.partner.ping_back_url ||
          this.pricing_tier_group !== this.partner.pricing_tier_group ||
          this.scheduledStart !== this.partner.scheduled_start
      } else {
        return false
      }
    }
  }
}
</script>
