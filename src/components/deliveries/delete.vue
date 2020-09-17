<template>
    <button class="btn btn-circle btn-hollow-red" @click="this.delete"><font-awesome-icon icon="minus"></font-awesome-icon></button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({
      deleteDelivery: 'deleteDelivery'
    }),
    delete () {
      this.deleteDelivery(this.id)
    }
  }
}
</script>
