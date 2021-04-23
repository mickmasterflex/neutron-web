<template>
  <button class="btn btn-hollow-green btn-circle" @click="addOptionToForm" :disabled="loading">
    <font-awesome-icon v-if="!loading" icon="plus"></font-awesome-icon>
    <font-awesome-icon v-else icon="spinner" pulse></font-awesome-icon>
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },
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
    async addOptionToForm () {
      this.loading = true
      await this.add(this.optionData).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
