<template>
  <div>
    <form @submit.prevent="updateUser">
      <label for="firstName">First Name</label>
      <input type="text" v-model="user.first_name" id="firstName" class="base-field" required>
      <label for="lastName">Last Name</label>
      <input type="text" v-model="user.last_name" id="lastName" class="base-field" required>
      <label for="email">Email</label>
      <input type="text" v-model="user.email" id="email" class="base-field" required>
      <single-checkbox v-bind:label="'Staff'" v-bind:model="user.is_staff" v-bind:id="'isStaff'"></single-checkbox>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from '../../axios'
import singleCheckbox from '../utilities/forms/singleCheckbox'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
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
  components: {
    'single-checkbox': singleCheckbox
  },
  methods: {
    updateUser () {
      axios.put(`/users/${this.id}/`, {
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
