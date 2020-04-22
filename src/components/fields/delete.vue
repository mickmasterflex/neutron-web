<template>
  <button class="btn btn-circle btn-o-red" @click="this.deleteField">-</button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({ deleteField: 'deleteBaseTextField' })
  }
}
</script>
