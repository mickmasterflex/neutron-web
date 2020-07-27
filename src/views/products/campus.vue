<template>
  <div v-if="campus">
    <div class="hud">
      <h1 class="h1 text-white">{{campus.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="campus.id" :title="`Campus`" :color="`teal`"></stat-card>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-4">
      <h3 class="h3">Education Products List</h3>
      <button class="btn btn-green" @click="showCreateEducationProductModal()">Create Education Product</button>
    </div>
    <education-products-list :educationProducts="educationProducts" class="mt-5"></education-products-list>
    <education-product-create :campusId="id"></education-product-create>

    <h3 class="h3 mt-5 mb-2">Edit Campus</h3>
    <update-campus :campus="campus"></update-campus>

    <h3 class="h3 mt-5 mb-2">Delete Campus</h3>
    <delete-campus :campus="campus"></delete-campus>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import deleteCampus from '@/components/campuses/delete'
import updateCampus from '@/components/campuses/update'
import educationProductCreate from '@/components/educationProducts/create'
import educationProductsList from '@/components/educationProducts/list'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-campus': deleteCampus,
    'update-campus': updateCampus,
    'education-products-list': educationProductsList,
    'education-product-create': educationProductCreate
  },
  computed: {
    ...mapGetters({
      campus: 'getCurrentCampus',
      getEducationProductByCampus: 'getEducationProductByCampus'
    }),
    educationProducts: function () {
      return this.getEducationProductByCampus(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentCampus: 'fetchCurrentCampus',
      fetchEducationProducts: 'fetchEducationProducts'
    }),
    ...mapMutations({
      showCreateEducationProductModal: 'SHOW_CREATE_EDUCATION_PRODUCT_MODAL'
    })
  },
  created () {
    this.fetchCurrentCampus(this.id)
  }
}
</script>
