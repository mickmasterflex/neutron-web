<template>
  <button class="btn btn-red" @click="runDelete"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Campaign</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    client: String,
    campaign: {
      type: Object
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteCampaign' }),
    runDelete () {
      this.delete(this.campaign.id)
        .then(() => {
          this.$router.push({ name: 'PartnerContractCampaigns', params: { id: this.campaign.contract, client: this.client } })
        })
    }
  }
}
</script>
