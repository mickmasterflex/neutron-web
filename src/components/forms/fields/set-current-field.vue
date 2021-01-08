<template>
  <button class="btn btn-circle btn-hollow-blue" @click="setCurrent(field)">
    <font-awesome-icon :icon="icon"></font-awesome-icon>
  </button>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setCurrentField: 'SET_CURRENT_FIELD',
      setCurrentOptions: 'SET_CURRENT_OPTIONS',
      setInactiveOptions: 'SET_INACTIVE_OPTIONS',
      sortCurrentOptions: 'SORT_CURRENT_OPTIONS'
    }),
    setCurrent (field) {
      this.setCurrentField(field)
      if (field.type === 'select' || field.type === 'radio') {
        this.setCurrentOptions(field.options)
        this.setInactiveOptions(field.inactive_options)
        this.sortCurrentOptions()
      }
    }
  }
}
</script>
