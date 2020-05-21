<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="campaignName" field_label="Campaign Name" class="field-group"></v-text-field>
      <v-text-field v-model="campaign_code" rules="required" field_id="campaignCode" field_label="Campaign Code" class="field-group"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      campaign_code: ''
    }
  },
  props: {
    campaign: Object
  },

  methods: {
    ...mapActions({
      update: 'updateCampaign'
    }),
    submitForm () {
      this.update({
        id: this.campaign.id,
        name: this.name,
        contract: this.campaign.contract,
        code: this.campaign_code
      })
    }
  }
}
</script>
