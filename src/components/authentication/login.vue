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
import { mapGetters, mapActions, mapMutations } from 'vuex'
import statusBar from '@/components/ui/status-bar/default'
import { setResponseErrors } from '@/mixins/setResponseErrors'

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
    ...mapMutations({
      setFormError: 'SET_FORM_ERROR',
      resetFormError: 'RESET_FORM_ERROR'
    }),
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
  },
  mounted () {
    this.form_ref = this.$refs.form
  }
}
</script>
