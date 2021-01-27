<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{product.name}}</h1>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'ProductDetails', params: {id:id}}">Product Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'offers' ? 'active' : ''">
          <router-link :to="{name: 'ProductOffers', params: {id:id}}">Offers</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({
      fetchCurrentEducationProduct: 'fetchCurrentEducationProduct'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_EDUCATION_PRODUCT'
    }),
    async setEducationProduct () {
      if (this.Product.id !== this.id) {
        await this.fetchCurrentEducationProduct(this.id)
      }
    }
  },
  computed: {
    ...mapGetters({
      product: 'getCurrentEducationProduct'
    })
  },
  created () {
    this.setEducationProduct().then(() => {
      document.title = this.product.name
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
