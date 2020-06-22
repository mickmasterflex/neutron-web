<template>
  <button class="btn btn-turquoise" @click="submitForm()"><font-awesome-icon icon="plus"></font-awesome-icon> Add an Option</button>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      options: 'getCurrentBaseOptions',
      field: 'getCurrentBaseOptionField'
    }),
    baseOption: function () {
      return {
        field: this.field.id,
        order: this.options.length + 1
      }
    }
  },
  methods: {
    ...mapMutations({ toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED' }),
    ...mapActions({ createBaseOption: 'createBaseOption' }),
    submitForm () {
      this.createBaseOption(this.baseOption).then(() => {
        this.toggleChangesInModalUnsaved(true)
      })
    }
  }
}
</script>
