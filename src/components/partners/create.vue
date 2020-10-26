<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Partner Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm" class="form-horizontal">
      <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
      <v-select-field v-model="status" rules="required" :options="statusOptions" field_id="status" field_label="Status"></v-select-field>
      <v-text-field v-model="pingbackUrl" mode="passive" placeholder="http://www.example.com/" rules="url" field_id="rpl" field_label="Pingback URL"></v-text-field>
      <date-picker v-model="scheduledStart" rules="date" field_id="date" field_label="Scheduled Start"></date-picker>
      <v-select-field v-model="pricing_tier_group" :options="pricingTierGroups" field_label="Pricing Tier Group"></v-select-field>
      <list-tiers class="ml-label-width" tableWidth="auto" emptyTableClass="max-w-sm well" v-if="currentGroup" :pricingTiers='currentGroup.pricingtier_set'></list-tiers>
    </form>
  </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Partner Contract</button>
    </template>
  </modal-template>
</template>

<script>
import listTiers from '@/components/pricing-tiers/tiers/list'
import datePicker from '@/components/ui/forms/validation-fields/date-picker'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      pricing_tier_group: '',
      pingbackUrl: '',
      status: undefined,
      statusOptions: {
        active: { name: 'Active', id: 'active' },
        paused: { name: 'Paused', id: 'paused' }
      },
      scheduledStart: null
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreatePartnerModal',
      pricingTierGroups: 'getPricingTierGroups',
      getPricingTierGroupById: 'getPricingTierGroupById'
    }),
    currentGroup () {
      return this.getPricingTierGroupById(Number(this.pricing_tier_group))
    }
  },
  props: {
    client: {
      type: Number
    },
    parent: {
      type: Number
    }
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      create: 'createPartner',
      fetchPricingTierGroups: 'fetchPricingTierGroups'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_PARTNER_MODAL'
    }),
    close () {
      this.name = ''
      this.status = undefined
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
  created () {
    this.fetchPricingTierGroups()
  },
  components: {
    'date-picker': datePicker,
    'list-tiers': listTiers
  }
}
</script>
