<template>
  <div>
    <p class="bold">Edit User</p>
    <form @submit.prevent="updateUser">
      <label for="firstName">First Name</label>
      <input type="text" v-model="user.first_name" required id="firstName">
      <label for="lastName">Last Name</label>
      <input type="text" v-model="user.last_name" required id="lastName">
      <label for="email">Email</label>
      <input type="text" v-model="user.email" required id="email">
      <label for="isStaff">Staff</label>
      <input type="checkbox" v-model="user.is_staff" id="isStaff">
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
      apiBaseUrl: 'http://neutron.localhost:8000/api',
      user: {
        first_name: '',
        last_name: '',
        email: '',
        is_staff: ''
      },
      output: ''
    }
  },
  props: ['id'],
  methods: {
    updateUser () {
      axios.put(`${this.apiBaseUrl}/users/${this.id}/`, {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        is_staff: this.user.is_staff
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
