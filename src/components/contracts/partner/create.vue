<template>
  <div>
    <form @submit.prevent="createPartnerContract">
      <text-field v-bind:field_name="`name`"></text-field>
      <select-field v-bind:options="partnerContracts" v-bind:field_name="`parent`"></select-field>
      <button class="btn btn-green mt-5">Create Partner Contract</button>
    </form>
  </div>
</template>

<script>
import axios from '../../../axios'
import selectField from '../../utilities/forms/stacked/select_field'
import textField from '../../utilities/forms/stacked/text_field'

export default {
  data () {
    return {
      name: '',
      parent: '',
      output: ''
    }
  },
  props: ['client', 'partnerContracts'],
  components: {
    'select-field': selectField,
    'text-field': textField
  },
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
