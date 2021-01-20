<template>
  <base-panel-grid>
    <update-product :educationProduct="educationProduct" class="col-span-2 xl:col-span-1"></update-product>
      <template #content>
        <delete-product :id="educationProduct.id"></delete-product>
      </template>
  </base-panel-grid>
</template>

<script>
import deleteProduct from '@/components/products/education/delete'
import updateProduct from '@/components/products/education/update'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      educationProduct: 'getCurrentEducationProduct'
    })
  },
  components: {
    'delete-product': deleteProduct,
    'update-product': updateProduct
  }
}
</script>
