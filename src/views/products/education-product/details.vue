<template>
  <base-panel-grid>
    <update-product :educationProduct="educationProduct" class="col-span-2 xl:col-span-1"></update-product>
      <template #content>
        <delete-education-product :educationProduct="educationProduct"></delete-education-product>
      </template>
  </base-panel-grid>
</template>

<script>
import deleteEducationProduct from '@/components/products/education/delete'
import updateProduct from '@/components/products/education/update'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      educationProduct: 'getCurrentEducationProduct'
    })
  },
  components: {
    'delete-education-product': deleteEducationProduct,
    'update-product': updateProduct
  }
}
</script>
