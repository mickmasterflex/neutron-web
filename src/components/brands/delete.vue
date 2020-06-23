<template>
  <button class="btn btn-red" @click="runDelete">Delete Brand</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteBrand' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Brands' })
        })
    }
  }
}
</script>
