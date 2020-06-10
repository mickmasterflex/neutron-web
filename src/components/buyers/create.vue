<template>
  <modal-template :show="showModal">
    <template v-slot:header>Create Buyer Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm">
      <v-text-field v-model="name" rules="required" field_id="buyerName" field_label="Name" class="field-group"></v-text-field>
      <select-field v-model="parent" :options="buyerContracts" field_id="parent" field_label="Parent" class="field-group"></select-field>
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
    ...mapActions({ create: 'createBuyer' }),
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
