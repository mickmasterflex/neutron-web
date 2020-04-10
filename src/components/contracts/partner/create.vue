<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(createPartnerContract)">
      <v-text-field v-model="name" rules="required" field_id="partnerName" field_label="Name" class="field-group"></v-text-field>
      <select-field v-model="parent" :options="partnerContracts" field_id="parent" field_label="Parent" class="field-group"></select-field>
      <button class="btn btn-green mt-5">Create Partner Contract</button>
    </form>
  </validation-observer>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      name: '',
      parent: '',
      output: ''
    }
  },
  props: ['client', 'partnerContracts'],
  methods: {
    createPartnerContract () {
      axios.post('/partners/', {
        name: this.name,
        parent: this.parent,
        client: this.$props.client
      })
        .then(response => {
          this.output = response
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
