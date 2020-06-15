<template>
  <modal-template :show="showModal">
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="clientName" field_label="Client Name" class="field-group"></v-text-field>
      <v-text-field v-model="slug" rules="required|alpha_dash" field_id="clientSlug" field_label="Slug" class="field-group"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
    submitForm () {
      this.create({
        name: this.name,
        slug: this.slug
      })
    }
  }
}
</script>
