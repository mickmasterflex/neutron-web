<template>
  <form @submit.prevent="updateUser">
    <text-field v-model="first_name" rules="required" id="first_name" label="First Name"></text-field>
    <text-field v-model="last_name" rules="required" id="last_name" label="Last Name"></text-field>
    <text-field v-model="email" rules="required|email" id="email" label="Email" type="email"></text-field>
    <checkbox-single v-model="is_staff" field_id="is_staff" label="Staff"></checkbox-single>
    <button type="submit" class="btn btn-green mt-5">Submit</button>
  </form>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      first_name: '',
      last_name: '',
      email: '',
      is_staff: '',
      output: ''
    }
  },
  props: ['id'],
  methods: {
    updateUser () {
      axios.put(`/users/${this.id}/`, {
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
