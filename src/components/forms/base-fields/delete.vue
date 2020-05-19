<template>
  <button class="btn btn-circle btn-o-red" @click="this.runDelete">-</button>
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
