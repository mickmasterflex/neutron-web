<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Product</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="partnerName" field_label="Name" class="field-group"></v-text-field>
          <v-text-feild v-model="slug" :options="slug" field_id="slug" field_label="Slug" class="slug"></v-text-feild>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Product</button>
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
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      create: 'createPartner'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_PARTNER_MODAL'
    }),
    close () {
      this.name = ''
      this.parent = ''
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
            parent: this.parent,
            client: this.$props.client
          }).then(() => {
            this.close()
          })
        }
      })
    }
  }
}
</script>
