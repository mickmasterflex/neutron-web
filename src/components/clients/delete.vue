<template>
  <button class="btn btn-red" @click="runAction">Delete Client</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteClient' }),
    runAction () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Relationships' })
        })
    }
  }
}
</script>
