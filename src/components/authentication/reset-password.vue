<template>
  <div class="">
    <h1>Set New Password</h1>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form class="login bg-gray-100 p-8 rounded-lg" @submit.prevent="handleSubmit(submitForm)">
        <v-text-field v-model="new_password" rules="required|password:@confirm_password" mode="passive" field_id="new_password" field_label="New Password" :field_type="password_field_type"></v-text-field>
        <v-text-field v-model="confirm_password" rules="required" field_id="confirm_password" field_label="Confirm Password" :field_type="password_field_type"></v-text-field>
        <button type="submit" class="btn btn-green mt-3"> Save Password</button>
      </form>
    </validation-observer>
    <button class="btn btn-green mt-3" @click="showPassword" v-if="password_field_type === 'password'"> Show</button>
    <button class="btn btn-green mt-3" @click="hidePassword" v-if="password_field_type === 'text'"> Hide</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      new_password: '',
      confirm_password: '',
      password_field_type: 'password'
    }
  },
  mixins: [setResponseErrors],
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser'
    })
  },
  methods: {
    ...mapActions({ setPassword: 'resetPassword' }),
    showPassword () {
      this.password_field_type = 'text'
    },
    hidePassword () {
      this.password_field_type = 'password'
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.setPassword({
            new_password: this.new_password,
            confirm_password: this.confirm_password
          }).then(() => {
            this.$router.push({
              name: 'Dashboard'
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
