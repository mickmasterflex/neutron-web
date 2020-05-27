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
      deleteBaseOptionField: 'deleteBaseOptionField',
      deleteBaseTextField: 'deleteBaseTextField'
    }),
    runDelete () {
      if (this.type === 'select' || this.type === 'radio') {
        this.deleteBaseOptionField(this.id)
      } else if (this.type === 'text' || this.type === 'textarea') {
        this.deleteBaseTextField(this.id)
      }
    }
  }
}
</script>
