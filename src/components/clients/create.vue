<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Client</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required|client_name" field_id="name" field_label="Client Name"></v-text-field>
          <text-field :value="slug" field_id="slug" field_label="Slug" field_disabled="true"></text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Client</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateClientModal'
    }),
    slug: function () {
      return this.cleanName(this.name)
    }
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({ create: 'createClient' }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_CLIENT_MODAL'
    }),
    cleanName (name) {
      const nameLower = name.toLowerCase()
      let formattedSlug = nameLower.replace(/\s*$/g, '')
      formattedSlug = formattedSlug.replace(/\s+/g, '-')
      return formattedSlug
    },
    close () {
      this.name = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            slug: this.slug
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
