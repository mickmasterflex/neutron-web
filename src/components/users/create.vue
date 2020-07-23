<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create User</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="first_name" rules="required" field_id="first_name" field_label="First Name"></v-text-field>
          <v-text-field v-model="last_name" rules="required" field_id="last_name" field_label="Last Name"></v-text-field>
          <v-text-field v-model="email" mode="passive" rules="required|email" field_id="email" field_label="Email" field_type="email"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create User</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateUserModal'
    })
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      create: 'createUser'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_USER_MODAL'
    }),
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    close () {
      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  mounted () {
    this.form_ref = this.$refs.form
  }
}
</script>
