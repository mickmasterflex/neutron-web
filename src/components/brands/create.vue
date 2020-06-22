<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Brand</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="brandName" field_label="Brand Name" class="field-group"></v-text-field>
          <v-text-field v-model="short_description" rules="required|alpha_dash" field_id="short_description" field_label="ShortDescription" class="field-group"></v-text-field>
          <v-text-field v-model="alias" rules="required" field_id="alias" field_label="Alias" class="field-group"></v-text-field>
          <v-text-field v-model="website" rules="required" field_id="website" field_label="Wesbite" class="field-group"></v-text-field>
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
  mixins: [enterKeyListener],
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
          })
        }
      })
    }
  }
}
</script>
