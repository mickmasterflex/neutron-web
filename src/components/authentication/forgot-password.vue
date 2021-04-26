<template>
  <div>
    <div>
    <h1>Reset Password</h1>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="handleSubmit(submitForm)">
        <v-text-field v-model="email" rules="email|required" mode="passive" field_id="email" field_label="Email" field_type="email"></v-text-field>
        <button :disabled="loading" type="submit" class="btn btn-green mt-3"> Send Temporary Password</button>
      </form>
      <router-link :to="{ name: 'Login'}" class="text-link">Back to Login</router-link>
    </validation-observer>
    </div>
    <div v-show="showMessage">
      <h1 class="text-white">Email Has Been Sent to {{email}}</h1>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      email: '',
      showMessage: false,
      loading: false
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      forgotPassword: 'forgotPassword'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        this.loading = true
        if (success) {
          this.forgotPassword({
            email: this.email
          }).then(() => {
            this.showMessage = true
          })
            .catch(error => {
              this.error = error
            }).finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
