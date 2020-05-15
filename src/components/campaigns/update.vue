<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="campaignName" field_label="Campaign Name" class="field-group"></v-text-field>
      <v-select-field v-model="contract" rules="required" :options="contracts" field_id="contract" field_label="Contract" class="field-group"></v-select-field>
      <v-text-field v-model="campaign_code" rules="required" field_id="campaignCode" field_label="Campaign Code" class="field-group"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
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
    campaign: Object
  },

  methods: {
    ...mapActions({
      update: 'updateCampaign',
      fetchContracts: 'fetchContracts'
    }),
    submitForm () {
      this.update({
        id: this.campaign.id,
        name: this.name,
        contract: this.campaign.contract,
        client: this.campaign.client
      })
    }
  },
  computed: {
    ...mapGetters({
      contract: 'getAllContracts'
    })
  },
  created () {
    this.fetchContracts()
  }
}
</script>
