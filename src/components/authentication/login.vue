<template>
  <div class="">
    <h1>Sign in</h1>
    <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="login">

      <div class="form-group" :class="{ 'form-group--error': $v.username.$error }">
        <text-field-stacked v-model.trim="$v.username.$model" field_id="username" label="Email"></text-field-stacked>
        <div class="field-errors" v-if="$v.username.$error">
          <div class="field-error" v-if="!$v.username.required">Field is required</div>
          <div class="field-error" v-if="!$v.username.email">Must enter a valid email</div>
        </div>
      </div>

      <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
        <text-field-stacked v-model.trim="$v.password.$model" field_id="password" label="Password" type="password"></text-field-stacked>
        <div class="field-errors" v-if="$v.password.$error">
          <div class="field-error" v-if="!$v.password.required">Field is required</div>
        </div>
      </div>
      <button type="submit" class="btn btn-green mt-3">Login</button>
    </form>
  </div>
</template>

<script>
import { AUTH_REQUEST } from '@/store/actions/authentication'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      username: '',
      password: '',
      submit_status: ''
    }
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    login: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
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
}
</script>
