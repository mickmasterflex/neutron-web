<template>
  <button class="btn btn-red" @click="runDelete">Delete Client</button>
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
    ...mapActions({ delete: 'deleteClient' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Relationships' })
        })
    }
  }
}
</script>
