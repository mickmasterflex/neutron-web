<template>
  <button class="btn btn-red" @click="deleteUser">Delete User</button>
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
