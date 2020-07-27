<template>
  <button class="btn btn-red" @click="runDelete">Delete Education Product</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    educationProduct: {
      type: Object
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteEducationProduct' }),
    runDelete () {
      this.delete(this.educationProduct.id)
        .then(() => {
          this.$router.push({ name: 'Campus', params: { id: this.educationProduct.brand } })
        })
    }
  }
}
</script>
