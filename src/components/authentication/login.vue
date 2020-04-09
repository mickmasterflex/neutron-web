<template>
  <div class="">
    <h1>Sign in</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="handleSubmit(login)">
        <validation-provider class="form-group" rules="email|required" v-slot="{ errors, classes }">
          <text-field-stacked v-model="username" field_id="username" label="Email" :class="classes"></text-field-stacked>
          <span class="field-error">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider class="form-group" rules="required" v-slot="{ errors, classes }">
          <text-field-stacked v-model="password" field_id="password" label="Password" type="password" :class="classes"></text-field-stacked>
          <span class="field-error">{{ errors[0] }}</span>
        </validation-provider>
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
    login: function () {
      const { username, password } = this
      this.$store.dispatch(AUTH_REQUEST, {
        username,
        password
      }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
