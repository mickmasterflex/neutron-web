<template>
  <button class="btn btn-red" @click="runDelete()"><font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete Banner</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions({
      deleteCampusBanner: 'deleteCampusBanner'
    }),
    runDelete () {
      this.campusBanners.forEach(banner => {
        if (banner.campus === this.campus.id) {
          this.deleteCampusBanner(banner.id)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      campusBanners: 'getCurrentCampusBanners',
      campus: 'getCurrentCampus'
    })
  }
}
</script>
