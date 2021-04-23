<template>
  <button class="btn btn-circle btn-hollow-red" @click="runDelete" :disabled="loading">
    <font-awesome-icon v-if="!loading" icon="minus"></font-awesome-icon>
    <font-awesome-icon v-else icon="spinner" pulse></font-awesome-icon>
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    option: Object
  },
  methods: {
    ...mapActions({
      deleteOption: 'deleteBaseOption'
    }),
    async runDelete () {
      this.loading = true
      await this.deleteOption(this.option.id).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
