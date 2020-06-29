<template>
  <div>
    <analytics-nav v-show="tab==='analytics'"></analytics-nav>
    <config-nav v-show="tab==='config'"></config-nav>
    <dashboard-nav v-show="tab==='dashboard'"></dashboard-nav>
    <products-nav v-show="tab==='products'"></products-nav>
    <relationships-nav v-show="tab==='relationships'"></relationships-nav>
    <users-nav v-show="tab==='users'"></users-nav>
    <utilities-nav v-show="tab==='utilities'"></utilities-nav>
    <div v-show="tab===''"></div>
  </div>
</template>

<script>
import analyticsNav from '@/components/ui/topNav/apps/analytics'
import configNav from '@/components/ui/topNav/apps/config'
import dashboardNav from '@/components/ui/topNav/apps/dashboard'
import productsNav from '@/components/ui/topNav/apps/products'
import relationshipsNav from '@/components/ui/topNav/apps/relationships'
import usersNav from '@/components/ui/topNav/apps/users'
import utilitiesNav from '@/components/ui/topNav/apps/utilities'
import { mapGetters } from 'vuex'

export default {
  components: {
    'analytics-nav': analyticsNav,
    'config-nav': configNav,
    'dashboard-nav': dashboardNav,
    'products-nav': productsNav,
    'relationships-nav': relationshipsNav,
    'users-nav': usersNav,
    'utilities-nav': utilitiesNav
  },
  computed: {
    ...mapGetters({
      tab: 'getActiveApp'
    })
  }
}
</script>
