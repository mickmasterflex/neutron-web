<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="campaignName" field_label="Campaign Name" class="field-group"></v-text-field>
      <v-select-field v-model="contract" rules="required" :options="contracts" field_id="contract" field_label="Contract" class="field-group"></v-select-field>
      <v-text-field v-model="campaign_code" rules="required" field_id="campaignCode" field_label="Campaign Code" class="field-group"></v-text-field>
      <button class="btn btn-green mt-5">Create Campaign</button>
    </form>
  </validation-observer>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      contract: '',
      campaign_code: ''
    }
  },
  props: {
    partner: Number
  },
  methods: {
    ...mapActions({
      create: 'createCampaign',
      fetchContracts: 'fetchContracts'
    }),
    submitForm () {
      this.create({
        name: this.name,
        contract: this.partner,
        campaign_code: this.campaign_code
      })
    }
  },
  computed: {
    ...mapGetters({
      contracts: 'getAllContracts'
    })
  },
  created () {
    this.fetchContracts()
  }
}
</script>
