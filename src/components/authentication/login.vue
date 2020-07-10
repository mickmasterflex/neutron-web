<template>
  <div class="">
    <h1>Sign in</h1>
    <status-bar :show="formError.length !== 0" :copy="formError" color="red" icon="exclamation-triangle"/>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="handleSubmit(submitForm)">
        <v-text-field v-model="username" mode="passive" rules="required|email" field_id="username" field_label="Email" field_type="email"></v-text-field>
        <v-text-field v-model="password" rules="required" field_id="password" field_label="Password" field_type="password"></v-text-field>
        <button type="submit" class="btn btn-green mt-3">Login</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import statusBar from '@/components/ui/status-bar/default'

export default {
  data () {
    return {
      username: '',
      password: '',
      submit_status: ''
    }
  },
  computed: {
    ...mapGetters({
      error: 'getError',
      formError: 'getFormError',
      errorStatus: 'getErrorStatus',
      errorData: 'getErrorData'
    })
  },
  methods: {
    ...mapMutations({
      setAuthError: 'SET_AUTH_ERROR',
      setFormError: 'SET_FORM_ERROR',
      resetError: 'RESET_ERROR',
      resetFormError: 'RESET_FORM_ERROR'
    }),
    setErrors () {
      this.$refs.form.setErrors(this.errorData)
    },
    async submitForm () {
      this.resetError()
      this.resetFormError()
      const { username, password } = this
      try {
        await this.$store.dispatch('authLogin', { username, password })
      } catch {
        this.setAuthError()
        localStorage.removeItem('user-token')
        if (this.errorStatus === 400) {
          this.setErrors()
        }
      }
    }
  },
  components: {
    'status-bar': statusBar
  }
}
</script>
