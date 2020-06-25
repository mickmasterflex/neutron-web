<template>
  <button class="btn btn-red" @click="runDelete">Delete Campus</button>
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
    ...mapActions({ delete: 'deleteCampus' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Campuses' })
        })
    }
  }
}
</script>
