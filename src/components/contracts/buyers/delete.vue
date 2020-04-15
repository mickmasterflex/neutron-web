<template>
  <button class="btn btn-red" @click="deleteBuyerContract">Delete Buyer Contract</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      output: null
    }
  },
  props: ['client', 'id'],
  methods: {
    ...mapActions({ delete: 'deleteBuyerContract' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Buyers', params: { id: this.client } })
        })
    }
  }
}
</script>
