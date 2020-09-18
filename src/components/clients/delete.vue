<template>
  <button class="btn btn-red" @click="runDelete">Delete Client</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    slug: {
      type: String
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteClient' }),
    runDelete () {
      this.delete(this.slug)
        .then(() => {
          this.$router.push({ name: 'Relationships' })
        })
    }
  }
}
</script>
