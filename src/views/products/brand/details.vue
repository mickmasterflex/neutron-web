<template>
  <div>
    <h3 class="h3 mb-2">Update Brand</h3>
    <update-brand :brand="brand" ></update-brand>

    <h3 class="h3 mt-5 mb-2">Delete Brand</h3>
    <delete-brand :id="brand.id"></delete-brand>
  </div>
</template>

<script>
import deleteBrand from '@/components/brands/delete'
import updateBrand from '@/components/brands/update'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand'
    })
  },
  components: {
    'delete-brand': deleteBrand,
    'update-brand': updateBrand
  }
}
</script>
