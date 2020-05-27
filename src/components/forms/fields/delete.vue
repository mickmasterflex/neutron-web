<template>
  <button class="btn btn-circle btn-hollow-red" @click="this.runDelete"><font-awesome-icon icon="minus"></font-awesome-icon></button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: Number,
    type: String
  },
  methods: {
    ...mapActions({
      deleteOptionField: 'deleteOptionField',
      deleteTextField: 'deleteTextField'
    }),
    runDelete () {
      if (this.type === 'select' || this.type === 'radio') {
        this.deleteOptionField(this.id)
      } else if (this.type === 'text' || this.type === 'textarea') {
        this.deleteTextField(this.id)
      }
    }
  }
}
</script>
