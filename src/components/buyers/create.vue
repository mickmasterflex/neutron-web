<template>
  <modal-template :show="showModal">
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="buyerName" field_label="Name" class="field-group"></v-text-field>
      <select-field v-model="parent" :options="buyerContracts" field_id="parent" field_label="Parent" class="field-group"></select-field>
      <button class="btn btn-green mt-5">Create Buyer Contract</button>
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
