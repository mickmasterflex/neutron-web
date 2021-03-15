<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Partner Contract</template>
    <template v-slot:body>
    <validation-observer ref="form">
      <form @submit.prevent="submitForm" class="form-horizontal">
        <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
        <v-select-field v-model="status" rules="required" :options="formatListForSelectOptions(statuses)" field_id="status" field_label="Status"></v-select-field>
        <v-text-field v-model="pingbackUrl" mode="passive" placeholder="http://www.example.com/" rules="url" field_id="rpl" field_label="Pingback URL"></v-text-field>
        <date-picker v-model="scheduledStart" field_id="scheduled_start" field_label="Scheduled Start"></date-picker>
        <select-channels v-model="channel"></select-channels>
        <select-pricing-tier-group v-model="pricing_tier_group"></select-pricing-tier-group>
      </form>
    </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Partner Contract</button>
    </template>
  </modal-template>
</template>

<script>
import selectPricingTierGroup from '@/components/pricing-tiers/groups/select'
import datePicker from '@/components/ui/forms/validation-fields/date-picker'
import selectChannels from '@/components/channels/select'
import formatList from '@/mixins/format-list-for-select-options'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      channel: '',
      pricing_tier_group: '',
      pingbackUrl: '',
      status: 'active',
      scheduledStart: null
    }
  },
  computed: {
    ...mapGetters({
      statuses: 'getNewContractStatuses',
      showModal: 'getShowCreatePartnerModal'
    })
  },
  props: {
    client: {
      type: Number
    },
    parent: {
      type: Number
    }
  },
  methods: {
    ...mapActions({
      create: 'createPartner'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_PARTNER_MODAL'
    }),
    close () {
      this.name = ''
      this.channel = ''
      this.status = 'active'
      this.pingbackUrl = ''
      this.scheduledStart = null
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            parent: this.parent,
            client: this.client,
            channel: this.channel,
            pricing_tier_group: this.pricing_tier_group,
            status: this.status,
            ping_back_url: this.pingbackUrl,
            scheduled_start: this.scheduledStart
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  mixins: [formatList, enterKeyListener, setResponseErrors],
  components: {
    'select-pricing-tier-group': selectPricingTierGroup,
    'date-picker': datePicker,
    'select-channels': selectChannels
  }
}
</script>
