<template>
  <div>
    <form @submit.prevent="createUser">
      <label for="firstName">First Name</label>
      <input type="text" v-model="first_name" required id="firstName">
      <label for="lastName">Last Name</label>
      <input type="text" v-model="last_name" required id="lastName">
      <label for="email">Email</label>
      <input type="text" v-model="email" required id="email">
      <label for="isStaff">Staff</label>
      <input type="checkbox" v-model="is_staff" id="isStaff">
      <button type="submit" class="btn btn-green">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      apiBaseUrl: 'http://127.0.0.1:8000/api',
      first_name: '',
      last_name: '',
      email: '',
      is_staff: '',
      output: ''
    }
  },
  methods: {
    createUser () {
      axios.post(`${this.apiBaseUrl}/users/`, {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        is_staff: this.is_staff
      })
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
