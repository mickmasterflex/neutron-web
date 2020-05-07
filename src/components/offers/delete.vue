<template>
  <button class="btn btn-red" @click="runDelete">Delete Offer</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    offer: {
      type: Object
    },
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient'
    })
  },
  methods: {
    ...mapActions({ delete: 'deleteOffer' }),
    runDelete () {
      this.delete(this.offer.id)
        .then(() => {
          this.$router.push({ name: 'BuyerContract', params: { id: this.offer.contract, client: this.client.id } })
        })
    }
  }
}
</script>
