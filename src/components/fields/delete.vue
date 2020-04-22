<template>
  <button class="btn btn-circle btn-o-red" @click="runDelete">-</button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({ delete: 'deleteBaseTextField' }),
    runDelete () {
      this.delete(this.id)
        .then(() => {
          this.$emit('close')
        })
    }
  }
}
</script>
