<template>
  <button class="btn btn-red" @click="runDelete">Delete Offer</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    },
    buyer: {
      type: Number
    },
    client: {
      type: Number
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteOffer' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'BuyerContract', props: { id: this.buyer, client: this.client } })
        })
    }
  }
}
</script>
