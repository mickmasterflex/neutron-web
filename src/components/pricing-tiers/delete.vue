<template>
  <button class="btn btn-circle btn-hollow-red" @click="this.runDelete"><font-awesome-icon icon="minus"></font-awesome-icon></button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({
      delete: 'deletePricingTier'
    }),
    runDelete () {
      this.delete(this.id)
    }
  }
}
</script>
