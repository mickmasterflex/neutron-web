<template>
  <button class="btn btn-hollow-green btn-circle" @click="addOptionToForm">
    <font-awesome-icon icon="plus"></font-awesome-icon>
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField',
      currentOptions: 'getCurrentOptions'
    }),
    optionData () {
      return {
        label: this.option.label,
        order: this.currentOptions.length + 1,
        base_option: this.option.base_option,
        base_field: this.option.base_field,
        field: this.currentField.id
      }
    }
  },
  methods: {
    ...mapActions({
      add: 'addInactiveOption'
    }),
    addOptionToForm () {
      this.add(this.optionData)
    }
  }
}
</script>
