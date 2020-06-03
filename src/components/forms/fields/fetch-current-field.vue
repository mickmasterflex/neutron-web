<template>
  <button class="btn btn-circle btn-hollow-blue" @click="fetchFieldById(id, type)">
    <font-awesome-icon :icon="icon"></font-awesome-icon>
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentTextField: 'fetchCurrentTextField',
      fetchCurrentOptionField: 'fetchCurrentOptionField'
    }),
    fetchFieldById (id, type) {
      if (type === 'radio' || type === 'select') {
        this.fetchCurrentOptionField(id)
      } else if (type === 'text' || type === 'textarea') {
        this.fetchCurrentTextField(id)
      }
    }
  }
}
</script>
