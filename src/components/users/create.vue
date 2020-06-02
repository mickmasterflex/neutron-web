<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create User</template>
    <template v-slot:body>
      <validation-observer v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <v-text-field v-model="first_name" rules="required" field_id="first_name" field_label="First Name" class="field-group"></v-text-field>
          <v-text-field v-model="last_name" rules="required" field_id="last_name" field_label="Last Name" class="field-group"></v-text-field>
          <v-text-field v-model="email" rules="required|email" field_id="email" field_label="Email" field_type="email" class="field-group"></v-text-field>
          <button type="submit" class="btn btn-green mt-5">Submit</button>
        </form>
      </validation-observer>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
  methods: {
    ...mapActions({
      create: 'createUser'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_USER_MODAL'
    }),
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
      this.create({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email
      })
    }
  }
}
</script>
