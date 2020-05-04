<template>
  <button class="btn btn-red" @click="runDelete">Delete Offer</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    offer: {
      type: Object
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
      this.delete(this.offer.pk)
        .then(() => {
          this.$router.push({ name: 'BuyerContract', params: { id: this.offer.contract, client: this.client.id } })
        })
    }
  }
}
</script>
