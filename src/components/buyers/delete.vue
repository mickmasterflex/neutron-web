<template>
  <button class="btn btn-red" @click="runDelete"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Buyer Contract</button>
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
    },
    parent: {
      type: Number
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteBuyer' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          if (this.parent) {
            this.$router.push({
              name: 'BuyerContractContracts',
              params: { id: this.parent, client: this.client }
            })
          } else {
            this.$router.push({
              name: 'ClientBuyerContracts',
              params: { slug: this.client }
            })
          }
        })
    }
  }
}
</script>
