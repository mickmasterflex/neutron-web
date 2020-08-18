<template>
  <div>
    <update-campus :campus="campus"></update-campus>
    <delete-campus :campus="campus" class="mt-4"></delete-campus>
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
