<template>
  <button class="btn btn-circle btn-hollow-red" @click="this.runDelete"><font-awesome-icon icon="minus"></font-awesome-icon></button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteOption: 'deleteOption'
    }),
    runDelete () {
      this.deleteOption(this.option)
    }
  }
}
</script>
