<template>
  <button class="btn btn-red" @click="runDelete">Delete Offer</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    offer: {
      type: Object
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteOffer' }),
    runDelete () {
      this.delete(this.offer.id)
        .then(() => {
          this.$router.push({ name: 'BuyerContract', params: { id: this.offer.contract, client: this.offer.client } })
        })
    }
  }
}
</script>
