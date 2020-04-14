<template>
  <button class="btn btn-red" @click="runDelete">Delete Contract</button>
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
    ...mapActions({ delete: 'deletePartnerContract' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Client', params: { id: this.client } })
        })
    }
  }
}
</script>
