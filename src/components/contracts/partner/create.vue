<template>
  <div>
    <form @submit.prevent="createPartnerContract">
      <label for="name">Name</label>
      <input type="text" v-model="name" id="name" class="base-field">
      <label for="parent">Parent</label>
      <div class="select-field-wrap">
        <select class="select-field base-field" id="parent" v-model="parent">
          <option v-for="contract in partnerContracts" v-bind:key="contract.id" :value="`${contract.id}`">{{contract.name}}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <button class="btn btn-green mt-5">Create Partner Contract</button>
    </form>
  </div>
</template>

<script>
import axios from '../../../axios'

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
          console.log(error)
          this.output = error
        })
    }
  }
}
</script>
