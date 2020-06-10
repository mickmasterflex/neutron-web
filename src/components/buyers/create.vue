<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Buyer Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm">
      <v-text-field v-model="name" rules="required" field_id="buyerName" field_label="Name" class="field-group"></v-text-field>
      <select-field v-model="parent" :options="buyerContracts" field_id="parent" field_label="Parent" class="field-group"></select-field>
    </form>
  </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Buyer Contract</button>
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
  props: {
    client: {
      type: Number
    },
    buyerContracts: {
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateBuyerModal'
    })
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_BUYER_MODAL'
    }),
    close () {
      this.name = ''
      this.parent = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    ...mapActions({ create: 'createBuyer' }),
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
