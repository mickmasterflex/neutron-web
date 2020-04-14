<template>
  <div class="">
    <h1>Sign in</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="handleSubmit(login)">
        <v-text-field v-model="username" rules="required|email" field_id="username" field_label="Email" field_type="email" class="field-group"></v-text-field>
        <v-text-field v-model="password" rules="required" field_id="password" field_label="Password" field_type="password" class="field-group"></v-text-field>
        <button type="submit" class="btn btn-green mt-3">Login</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { AUTH_REQUEST } from '@/store/actions/authentication'

export default {
  data () {
    return {
      username: '',
      password: '',
      submit_status: ''
    }
  },
  methods: {
    login () {
      const { username, password } = this
      this.$store.dispatch(AUTH_REQUEST, {
        username,
        password
      }).then(() => {
        this.$router.push({ name: 'Dashboard' })
      })
    }
  }
}
</script>
