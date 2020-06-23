<template>
  <div v-if="brand">
    <div class="hud">
      <h1 class="h1 text-white">{{brand.name}}</h1>
    </div>
    <h3 class="h3 mt-5 mb-2">Edit Brand</h3>
    <update-brand :brand="brand"></update-brand>

    <h3 class="h3 mt-5 mb-2">Delete Brand</h3>
    <delete-brand :id="brand.id"></delete-brand>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteBrand from '@/components/brands/delete'
import updateBrand from '@/components/brands/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-brand': deleteBrand,
    'update-brand': updateBrand
  },
  computed: {
    ...mapGetters({
      brand: 'getCurrentBrand'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentBrand: 'fetchCurrentBrand'
    })
  },
  created () {
    this.fetchCurrentBrand(this.id)
  }
}
</script>
