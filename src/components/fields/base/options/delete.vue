<template>
  <span class="btn btn-circle btn-o-red" @click="runDelete">-</span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    option: Object
  },
  methods: {
    ...mapActions({
      delete: 'deleteBaseOption',
      fetchCurrentBaseOptionField: 'fetchCurrentBaseOptionField'
    }),
    runDelete () {
      this.delete(this.option.id)
        .then(() => {
          this.fetchCurrentBaseOptionField(this.option.field)
        })
    }
  }
}
</script>
