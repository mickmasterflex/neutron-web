<template>
  <form @submit.prevent="createPartnerContract">
    <text-field v-model="name" :field_id="`name`" :label="`Name`" :required="true"></text-field>
    <select-field v-model="parent" :options="partnerContracts" :field_id="`parent`" :label="`Parent`"></select-field>
    <button class="btn btn-green mt-5">Create Partner Contract</button>
  </form>
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
