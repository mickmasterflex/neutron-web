<template>
  <div class="">
    <h1>Sign in</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="handleSubmit(submitForm)">
        <v-text-field v-model="username" rules="required|email" field_id="username" field_label="Email" field_type="email" class="field-group"></v-text-field>
        <v-text-field v-model="password" rules="required" field_id="password" field_label="Password" field_type="password" class="field-group"></v-text-field>
        <button type="submit" class="btn btn-green mt-3">Login</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      submit_status: ''
    }
  },
  methods: {
    ...mapActions({ login: 'authLogin' }),
    submitForm () {
      const { username, password } = this
      this.login({
        username,
        password
      }).then(() => {
        this.$router.push({ name: 'Dashboard' })
      })
    }
  }
}
</script>
