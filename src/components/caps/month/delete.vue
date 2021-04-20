<template>
  <button @click="runDelete()" class="btn btn-red" :disabled="loading">
    <font-awesome-icon icon="spinner" pulse v-if="loadingDelete"></font-awesome-icon>
    <font-awesome-icon icon="trash-alt" v-else></font-awesome-icon> Delete
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
      loading: 'getCapsLoading',
      loadingDelete: 'getCapsDeleteLoading'
    })
  },
  methods: {
    ...mapActions({
      delete: 'deleteMonthCap'
    }),
    runDelete () {
      this.delete(this.id)
    }
  }
}
</script>
