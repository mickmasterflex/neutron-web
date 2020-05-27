<template>
  <button class="btn btn-turquoise" @click="submitForm()"><font-awesome-icon icon="plus"/> Add an Option</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    field: Object
  },
  computed: {
    ...mapGetters({
      options: 'getCurrentBaseOptions'
    }),
    baseOption: function () {
      return {
        field: this.field.id,
        order: this.options.length + 1
      }
    }
  },
  methods: {
    ...mapActions({ createBaseOption: 'createBaseOption' }),
    submitForm () {
      this.createBaseOption(this.baseOption)
    }
  }
}
</script>
