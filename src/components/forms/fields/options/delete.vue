<template>
  <button class="btn btn-circle btn-hollow-red" @click="this.runDelete" :disabled="loading">
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
    option: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteOption: 'deleteOption'
    }),
    async runDelete () {
      this.loading = true
      await this.deleteOption(this.option).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
