<template>
  <button class="btn btn-red" @click="runDelete"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Campus</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    campus: {
      type: Object
    }
  },
  methods: {
    ...mapActions({ delete: 'deleteCampus' }),
    runDelete () {
      this.delete(this.campus.id)
        .then(() => {
          this.$router.push({ name: 'BrandCampuses', params: { id: this.campus.brand } })
        })
    }
  }
}
</script>
