<template>
  <button class="btn btn-red" @click="runDelete()"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Logo</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions({
      deleteCampusLogo: 'deleteCampusLogo'
    }),
    runDelete () {
      this.campusLogos.forEach(logo => {
        if (logo.campus === this.campus.id) {
          this.deleteCampusLogo(logo.id)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      campusLogos: 'getCurrentCampusLogos',
      campus: 'getCurrentCampus'
    })
  }
}
</script>
