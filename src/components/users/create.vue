<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(createUser)">
      <v-text-field v-model="first_name" rules="required" id="first_name" label="First Name"></v-text-field>
      <v-text-field v-model="last_name" rules="required" id="last_name" label="Last Name"></v-text-field>
      <v-text-field v-model="email" rules="required|email" id="email" label="Email" type="email"></v-text-field>
      <checkbox-single v-model="is_staff" field_id="is_staff" label="Staff"></checkbox-single>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
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
  methods: {
    createUser () {
      axios.post('/users/', {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        is_staff: this.is_staff
      })
        .then(response => {
          this.output = response
          this.$router.push({ name: 'Users' })
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
