<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Partner Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm">
      <v-text-field v-model="name" rules="required" field_id="partnerName" field_label="Name" class="field-group"></v-text-field>
      <select-field v-model="parent" :options="partnerContracts" field_id="parent" field_label="Parent" class="field-group"></select-field>
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
      parent: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreatePartnerModal'
    })
  },
  props: {
    client: {
      type: Number
    },
    partnerContracts: {
      type: Array
    }
  },
  methods: {
    ...mapActions({
      create: 'createPartner'
    }),
    ...mapMutations({
      showCreatePartnerModal: 'SHOW_CREATE_PARTNER_MODAL',
      closeModal: 'CLOSE_CREATE_PARTNER_MODAL'
    }),
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    close () {
      this.name = ''
      this.parent = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    ...mapActions({ create: 'createPartner' }),
    submitForm () {
      this.create({
        name: this.name,
        parent: this.parent,
        client: this.$props.client
      })
    }
  }
}
</script>
