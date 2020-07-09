<template>
  <brand-layout :id="id" contentTab="details">
    <template v-slot:content>
      <h3 class="h3 mb-2">Update Brand</h3>
      <update-brand-contract :brand="brand" ></update-brand-contract>

      <h3 class="h3 mt-5 mb-2">Delete Brand</h3>
      <delete-brand-contract :client="brand.client" :id="id"></delete-brand-contract>
    </template>
  </brand-layout>
</template>

<script>
import brandLayout from '@/views/relationships/brands/brand/layout'
import deleteBrand from '@/components/brands/delete'
import updateBrand from '@/components/brands/update'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand'
    })
  },
  components: {
    'brand-layout': brandLayout,
    'delete-brand-contract': deleteBrand,
    'update-brand-contract': updateBrand
  }
}
</script>
