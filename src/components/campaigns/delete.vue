<template>
  <button class="btn btn-red" @click="runDelete">Delete Campaign</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    campaign: {
      type: Object
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteCampaign' }),
    runDelete () {
      this.delete(this.campaign.id)
        .then(() => {
          this.$router.push({ name: 'PartnerContractCampaigns', params: { id: this.campaign.contract, client: this.campaign.client } })
        })
    }
  }
}
</script>
