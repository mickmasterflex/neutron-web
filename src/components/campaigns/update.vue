<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Campaign Name"></v-text-field>
      <v-text-field v-model="campaign_code" rules="required|alpha_dash" field_id="code" field_label="Campaign Code"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

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
  watch: {
    campaign: function () {
      this.name = this.campaign.name
      this.campaign_code = this.campaign.code
    }
  },
  mixins: [setResponseErrors],
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
      }).catch(error => {
        this.error = error
      })
    }
  }
}
</script>
