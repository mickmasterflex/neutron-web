<template>
  <div>
    <analytics-nav v-if="app==='analytics'" :activeTab="tab"></analytics-nav>
    <config-nav v-if="app==='config'" :activeTab="tab"></config-nav>
    <dashboard-nav v-if="app==='dashboard'" :activeTab="tab"></dashboard-nav>
    <products-nav v-if="app==='products'" :activeTab="tab"></products-nav>
    <relationships-nav v-if="app==='relationships'" :activeTab="tab"></relationships-nav>
    <users-nav v-if="app==='users'" :activeTab="tab"></users-nav>
    <utilities-nav v-if="app==='utilities'" :activeTab="tab"></utilities-nav>
  </div>
</template>

<script>
import analyticsNav from '@/components/app/nav/top/apps/analytics'
import configNav from '@/components/app/nav/top/apps/config'
import dashboardNav from '@/components/app/nav/top/apps/dashboard'
import productsNav from '@/components/app/nav/top/apps/products'
import relationshipsNav from '@/components/app/nav/top/apps/relationships'
import usersNav from '@/components/app/nav/top/apps/users'
import utilitiesNav from '@/components/app/nav/top/apps/utilities'
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
      app: 'getActiveApp',
      tab: 'getActiveAppTab'
    })
  }
}
</script>
