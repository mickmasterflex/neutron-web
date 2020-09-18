<template>
  <button class="btn btn-red" @click="runDelete"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Partner Contract</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    client: {
      type: String
    },
    id: {
      type: Number
    }
  },
  methods: {
    ...mapActions({ delete: 'deletePartner' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'ClientContracts', params: { slug: this.client } })
        })
    }
  }
}
</script>
