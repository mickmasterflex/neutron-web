<template>
  <button class="btn btn-circle btn-hollow-red" @click="this.runDelete" :disabled="deleteLoading">
    <font-awesome-icon v-if="!deleteLoading" icon="minus"></font-awesome-icon>
    <font-awesome-icon v-else icon="spinner" pulse></font-awesome-icon>
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      deleteLoading: 'getReasonsDeleteLoading'
    })
  },
  methods: {
    ...mapActions({
      deleteReason: 'deleteReason'
    }),
    runDelete () {
      this.deleteReason(this.id)
    }
  }
}
</script>
