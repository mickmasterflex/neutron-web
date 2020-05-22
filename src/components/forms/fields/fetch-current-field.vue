<template>
  <button class="btn btn-circle btn-o-blue" @click="fetchFieldById(id, type)">{{copy}}</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: Number,
    type: String,
    copy: String
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
