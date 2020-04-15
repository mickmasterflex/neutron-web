<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(updateBuyerContract)">
      <v-text-field v-model="name" rules="required" field_id="buyerName" field_label="Name" class="field-group"></v-text-field>
      <select-field v-model="parent" :options="siblings" field_id="parent" field_label="Parent" class="field-group"></select-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import axios from '@/axios'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      parent: '',
      siblings: [],
      output: null
    }
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    client: {
      type: Number,
      default: null
    }
  },
  methods: {
    ...mapActions({ update: 'updateBuyerContract', getSiblings: 'getSiblingsContracts' }),
    submitForm () {
      this.update({
        name: this.name,
        parents: this.parent,
        client: this.client,
        id: this.id
      })
    },
    getSiblingContracts () {
      axios.get(`/clients/${this.$props.client}/`)
        .then(response => {
          this.siblings = response.data.buyercontract_set
        })
    }
  },
  mounted () {
    this.getSiblingContracts()
  }
}
</script>
