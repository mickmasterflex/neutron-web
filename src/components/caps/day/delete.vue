<template>
  <button @click="runDelete()" class="btn btn-red">
    <font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({
      delete: 'deleteDayCap'
    }),
    runDelete () {
      this.delete(this.id)
    }
  }
}
</script>
