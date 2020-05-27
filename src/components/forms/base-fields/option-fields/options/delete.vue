<template>
  <span class="btn btn-circle btn-hollow-red" @click="runDelete"><font-awesome-icon icon="minus"></font-awesome-icon></span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    option: Object
  },
  methods: {
    ...mapActions({
      delete: 'deleteBaseOption'
    }),
    runDelete () {
      this.delete(this.option.id)
    }
  }
}
</script>
