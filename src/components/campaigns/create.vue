<template>
  <modal-template :show="showModal">
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="campaignName" field_label="Campaign Name" class="field-group"></v-text-field>
      <v-text-field v-model="campaign_code" rules="required|alpha_dash" field_id="campaignCode" field_label="Campaign Code" class="field-group"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Create Campaign</button>
    </form>
  </validation-observer>
  </modal-template>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
      name: '',
      campaign_code: ''
    }
  },
  props: {
    partner: Number
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateCampaignModal'
    })
  },
  methods: {
    ...mapActions({
      create: 'createCampaign'
    }),
    submitForm () {
      this.create({
        name: this.name,
        contract: this.partner,
        code: this.campaign_code
      })
    }
  }
}
</script>
