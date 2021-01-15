<template>
  <panel-template title="Edit Partner" :actionTransition="true" v-bind="$attrs">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
          <parent-select v-model="parent"></parent-select>
          <v-select-field v-model="status" rules="required" :options="formatListForSelectOptions(statuses)" field_id="status" field_label="Status"></v-select-field>
          <v-text-field v-model="pingbackUrl" mode="passive" placeholder="http://www.example.com/" rules="url" field_id="rpl" field_label="Pingback URL"></v-text-field>
          <date-picker v-model="scheduledStart" field_id="scheduled_start" field_label="Scheduled Start"></date-picker>
          <select-channels v-model="channel"></select-channels>
          <select-pricing-tier-group v-model="pricing_tier_group"></select-pricing-tier-group>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import datePicker from '@/components/ui/forms/validation-fields/date-picker'
import selectPricingTierGroup from '@/components/pricing-tiers/groups/select'
import selectChannels from '@/components/channels/select'
import parentSelect from '@/components/partners/parent-select'
import { mapActions, mapGetters } from 'vuex'
import formatList from '@/mixins/format-list-for-select-options'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      parent: '',
      pingbackUrl: '',
      status: undefined,
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
  methods: {
    ...mapActions({
      update: 'updatePartner'
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
  mixins: [formatList, setResponseErrors],
  created () {
    this.setPartner()
  },
  computed: {
    ...mapGetters({
      statuses: 'getAllContractStatuses'
    }),
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
    'select-pricing-tier-group': selectPricingTierGroup,
    'date-picker': datePicker,
    'parent-select': parentSelect,
    'select-channels': selectChannels
  }
}
</script>
