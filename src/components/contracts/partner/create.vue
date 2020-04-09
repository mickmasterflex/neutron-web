<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(createPartnerContract)">
      <v-text-field v-model="name" rules="required" id="partnerName" label="Name"></v-text-field>
      <select-field v-model="parent" :options="partnerContracts" id="parent" label="Parent"></select-field>
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
