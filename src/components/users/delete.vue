<template>
  <button class="btn btn-red" @click="runDelete">Delete User</button>
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
    ...mapActions({ delete: 'deleteUser' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$router.push({ name: 'Users' })
        })
    }
  }
}
</script>
