<template>
  <button class="btn btn-red" @click="deleteUser">Delete User</button>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      output: null
    }
  },
  props: ['id'],
  methods: {
    deleteUser () {
      axios.delete(`/users/${this.id}/`)
        .then(response => {
          this.output = response
          console.log(response)
          this.$router.push({ name: 'Users' })
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
