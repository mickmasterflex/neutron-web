<template>
  <form @submit.prevent="createPartnerContract">
    <text-field-stacked v-model="name" field_id="name" label="Name" :required="true"></text-field-stacked>
    <select-field-stacked v-model="parent" :options="partnerContracts" field_id="parent" label="Parent"></select-field-stacked>
    <button class="btn btn-green mt-5">Create Partner Contract</button>
  </form>
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
