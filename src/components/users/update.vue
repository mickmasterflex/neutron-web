<template>
  <form @submit.prevent="updateUser">
    <text-field-stacked v-model="first_name" field_id="first_name" label="First Name" :required="true"></text-field-stacked>
    <text-field-stacked v-model="last_name" field_id="last_name" label="Last Name" :required="true"></text-field-stacked>
    <text-field-stacked v-model="email" field_id="email" label="Email" :required="true"></text-field-stacked>
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
