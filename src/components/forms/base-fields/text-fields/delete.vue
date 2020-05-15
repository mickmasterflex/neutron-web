<template>
  <button class="btn btn-circle btn-o-red" @click="this.runDelete">-</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({ deleteField: 'deleteBaseTextField' }),
    runDelete () {
      this.deleteField(this.id)
    }
  }
}
</script>
