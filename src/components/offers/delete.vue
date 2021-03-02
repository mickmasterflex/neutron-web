<template>
  <button class="btn btn-red" @click="runDelete"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Offer</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    offer: {
      type: Object
    },
    client: [String, Number]
  },
  methods: {
    ...mapActions({ delete: 'deleteOffer' }),
    runDelete () {
      this.delete(this.offer.id)
        .then(() => {
          this.$router.push({ name: 'BuyerContractOffers', params: { id: this.offer.parent.id, client: this.client } })
        })
    }
  }
}
</script>
