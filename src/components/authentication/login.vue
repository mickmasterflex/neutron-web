<template>
  <div class="">
    <h1>Sign in</h1>
    <status-bar :show="formError.length !== 0" color="red" icon="exclamation-triangle">
      <template slot="content">
        {{formError}}
      </template>
    </status-bar>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="handleSubmit(submitForm)">
        <v-text-field v-model="username" mode="passive" rules="required|email" field_id="username" field_label="Email" field_type="email"></v-text-field>
        <v-text-field v-model="password" rules="required" field_id="password" field_label="Password" field_type="password"></v-text-field>
        <button type="submit" class="btn btn-green mt-3" :disabled="formStatus === 'loading'">Login</button>
      </form>
      <router-link :to="{ name: 'ForgotPassword'}" class="text-link">Forgot Password</router-link>
    </validation-observer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import statusBar from '@/components/ui/status-bar/default'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mixins: [setResponseErrors],
  computed: {
    ...mapGetters({
      formStatus: 'getAuthStatus'
    })
  },
  methods: {
    ...mapActions({ login: 'authLogin' }),
    submitForm () {
      this.login({
        username: this.username,
        password: this.password
      }).catch(error => {
        this.error = error
      })
    }
  },
  components: {
    'status-bar': statusBar
  }
}
</script>
