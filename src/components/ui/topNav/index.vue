<template>
  <div>
    <products-nav v-show="tab==='products'"></products-nav>
    <div v-show="tab===''"></div>
  </div>
</template>

<script>
import productsNav from '@/components/ui/topNav/apps/products'
import { mapGetters } from 'vuex'

export default {
  components: {
    'products-nav': productsNav
  },
  computed: {
    ...mapGetters({
      tab: 'getActiveApp'
    })
  }
}
</script>
