<template>
  <div>
    <h3 class="h3 mt-5 mb-2">Edit Campus</h3>
    <update-campus :campus="campus"></update-campus>

    <h3 class="h3 mt-5 mb-2">Delete Campus</h3>
    <delete-campus :campus="campus"></delete-campus>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteCampus from '@/components/campuses/delete'
import updateCampus from '@/components/campuses/update'

export default {
  components: {
    'delete-campus': deleteCampus,
    'update-campus': updateCampus
  },
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus'
    })
  }
}
</script>
