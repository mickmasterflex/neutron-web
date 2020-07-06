<template>
  <button class="btn btn-red" @click="runDelete">Delete Campus</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    brands: {
      type: Number
    },
    id: {
      type: Number
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteCampus' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Brands', params: { id: this.brand } })
        })
    }
  }
}
</script>
