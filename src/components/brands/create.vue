<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Brand</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Brand Name"></v-text-field>
          <textarea-field model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
          <text-field model="alias" field_id="alias" field_label="Alias"></text-field>
          <text-field model="website" field_id="website" field_label="Website"></text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Brand</button>
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
      name: '',
      short_description: '',
      alias: '',
      website: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateBrandModal'
    })
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({ create: 'createBrand' }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_BRAND_MODAL'
    }),
    close () {
      this.name = ''
      this.short_description = ''
      this.alias = ''
      this.website = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            short_description: this.short_description,
            alias: this.alias,
            website: this.website
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
