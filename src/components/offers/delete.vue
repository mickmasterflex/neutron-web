<template>
  <button class="btn btn-red" @click="runDelete">Delete Offer</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    buyer: {
      type: Number
    },
    id: {
      type: Number
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteOffer' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Client', params: { id: this.client } })
        })
    }
  }
}
</script>
