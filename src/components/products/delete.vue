<template>
  <button class="btn btn-red" @click="runDelete">Delete Product</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteProduct' }),
    runDelete () {
      this.delete(this.product.id)
        .then(() => {
          this.$router.push({ name: 'Product', params: { id: this.product.contract, client: this.product.client } })
        })
    }
  }
}
</script>
