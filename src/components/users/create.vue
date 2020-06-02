<template>
  <modal-template :show="showModal">
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
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: ''
    }
  },
  methods: {
    ...mapActions({ create: 'createUser' }),
    submitForm () {
      this.create({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email
      })
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateUserModal'
    })
  }
}
</script>
