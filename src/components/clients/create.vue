<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Client</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm">
      <v-text-field v-model="name" rules="required" field_id="clientName" field_label="Client Name" class="field-group"></v-text-field>
      <v-text-field v-model="slug" rules="required|alpha_dash" field_id="clientSlug" field_label="Slug" class="field-group"></v-text-field>
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
      name: '',
      slug: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateClientModal'
    })
  },
  methods: {
    ...mapActions({ create: 'createClient' }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_CLIENT_MODAL'
    }),
    close () {
      this.name = ''
      this.parent = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.create({
        name: this.name,
        slug: this.slug
      })
    }
  }
}
</script>
