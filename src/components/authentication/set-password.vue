<template>
  <panel-template title="Set New Password">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="passwordUnlocked">Save Password</button>
    </template>
    <template slot="content">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <form class="form-horizontal" @submit.prevent="handleSubmit(submitForm)">
          <v-text-field :field_disabled="!passwordUnlocked" v-model="new_password" rules="required|password:@confirm_password" mode="passive" field_id="new_password" field_label="New Password" :field_type="password_field_type"></v-text-field>
          <v-text-field :field_disabled="!passwordUnlocked" v-model="confirm_password" rules="required" field_id="confirm_password" field_label="Confirm Password" :field_type="password_field_type"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer>
      <panel-footer>
        <template v-slot:end>
          <button class="btn btn-hollow-red" @click="togglePasswordUnlocked()">
            <span v-if="passwordUnlocked">
              <font-awesome-icon icon="lock-open"></font-awesome-icon> Lock to Cancel
            </span>
            <span v-else>
              <font-awesome-icon icon="lock"></font-awesome-icon> Unlock to Edit
            </span>
          </button>
        </template>
      </panel-footer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import panelFooter from '@/components/ui/panels/base/footer'

export default {
  data () {
    return {
      new_password: '',
      confirm_password: '',
      password_field_type: 'password',
      loading: false,
      passwordUnlocked: false
    }
  },
  watch: {
    passwordUnlocked () {
      if (this.passwordUnlocked === false) {
        this.new_password = ''
        this.confirm_password = ''
        this.$nextTick(() => {
          this.$refs.form.reset()
        })
      }
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({ setPassword: 'resetPassword' }),
    togglePasswordUnlocked () {
      this.passwordUnlocked = !this.passwordUnlocked
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        this.loading = true
        if (success) {
          this.setPassword({
            new_password: this.new_password,
            confirm_password: this.confirm_password
          }).then(() => {
            this.togglePasswordUnlocked()
          })
            .catch(error => {
              this.error = error
            }).finally(() => {
              this.loading = false
            })
        }
      })
    }
  },
  components: {
    'panel-footer': panelFooter
  }
}
</script>
