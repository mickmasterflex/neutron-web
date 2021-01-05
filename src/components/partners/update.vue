<template>
  <panel-template title="Edit Partner" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
          <parent-select v-model="parent"></parent-select>
          <v-select-field v-model="status" rules="required" :options="statusOptions" field_id="status" field_label="Status"></v-select-field>
          <v-text-field v-model="pingbackUrl" mode="passive" placeholder="http://www.example.com/" rules="url" field_id="rpl" field_label="Pingback URL"></v-text-field>
          <date-picker v-model="scheduledStart" field_id="scheduled_start" field_label="Scheduled Start"></date-picker>
          <select-channels v-model="channel"></select-channels>
          <v-select-field :field_wrap_class="pricing_tier_group ? 'well' : ''" v-model="pricing_tier_group" :options="pricingTierGroups" field_label="Pricing Tier Group">
            <list-tiers class="mt-3" tableWidth="auto" emptyTableClass="max-w-sm" v-if="currentGroup" :pricingTiers='currentGroup.pricingtier_set'></list-tiers>
          </v-select-field>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import listTiers from '@/components/pricing-tiers/tiers/list'
import datePicker from '@/components/ui/forms/validation-fields/date-picker'
import selectChannels from '@/components/channels/select'
import parentSelect from '@/components/partners/parent-select'
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
      channel: '',
      pricing_tier_group: '',
      scheduledStart: null
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
      this.channel = this.partner.channel
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
            channel: this.channel,
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
          this.channel !== this.partner.channel ||
          this.pricing_tier_group !== this.partner.pricing_tier_group ||
          this.scheduledStart !== this.partner.scheduled_start
      } else {
        return false
      }
    }
  },
  components: {
    'list-tiers': listTiers,
    'date-picker': datePicker,
    'parent-select': parentSelect,
    'select-channels': selectChannels
  }
}
</script>
