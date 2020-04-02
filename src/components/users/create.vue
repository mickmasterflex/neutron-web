<template>
  <div>
    <form @submit.prevent="createUser">
      <label for="firstName">First Name</label>
      <input type="text" v-model="first_name" id="firstName" class="base-field" required>
      <label for="lastName">Last Name</label>
      <input type="text" v-model="last_name" id="lastName" class="base-field" required>
      <label for="email">Email</label>
      <input type="text" v-model="email" id="email" class="base-field" required>
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
      first_name: '',
      last_name: '',
      email: '',
      is_staff: '',
      output: ''
    }
  },
  components: {
    'single-checkbox': singleCheckbox
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
