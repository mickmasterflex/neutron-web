<template>
  <button :disabled="!id" class="btn btn-circle btn-hollow-red" @click="runDelete"><font-awesome-icon icon="minus"></font-awesome-icon></button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteBuyerGroup: 'deleteBuyerGroup'
    }),
    runDelete () {
      this.deleteBuyerGroup(this.id)
    }
  }
}
</script>
