<template>
  <div>
    <update-brand :brand="brand" ></update-brand>
    <delete-brand :id="brand.id" class="mt-4"></delete-brand>
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
