<template>
  <div class="">
    <h1>Reset Password</h1>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="handleSubmit(submitForm)">
        <v-text-field v-model="email" rules="required" mode="passive" field_id="email" field_label="Email" :field_type="email"></v-text-field>
        <button type="submit" class="btn btn-green mt-3"> Send Temporary Password</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      email: ''
    }
  },
  mixins: [setResponseErrors],
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser'
    })
  },
  methods: {
    ...mapActions({ setPassword: 'setPassword' }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.setPassword({
            email: this.email
          }).then(() => {
            this.$router.push({
              name: 'Login'
            })
          })
            .catch(error => {
              this.error = error
            })
        }
      })
    }
  },
  components: {
  }
}
</script>
