<template>
  <div class="min-h-screen flex flex-row pl-3">
    <div id="nav" class="app-side-nav min-h-screen flex flex-col">
      <proton-logo class="app-side-nav-logo mt-6 mb-10 pl-2"></proton-logo>
      <side-nav-item icon="th-large" route="Dashboard" label="Dashboard"></side-nav-item>
      <side-nav-item icon="chart-area" route="Analytics" label="Analytics"></side-nav-item>
      <side-nav-item icon="dna" route="Relationships" label="Relationships"></side-nav-item>
      <side-nav-item icon="atom" route="Brands" label="Products"></side-nav-item>
      <side-nav-item icon="cog" route="Config" label="Config"></side-nav-item>
      <side-nav-item icon="wrench" route="Utilities" label="Utilities"></side-nav-item>
      <side-nav-item icon="key" route="Users" label="Accounts"></side-nav-item>
    </div>
    <div class="w-full min-h-screen pt-2">
      <div class="flex flex-row justify-between items-center pr-4">
        <top-nav-products></top-nav-products>
        <logout-button class="pb-2"></logout-button>
      </div>
      <div class="bg-white p-8 h-full">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import logoutButton from '@/components/authentication/logout'
import logo from '@/components/ui/logo'
import sideNavItem from '@/components/ui/sidenav/navItem'
import topNavProducts from '@/components/ui/topNav/apps/products'

export default {
  components: {
    'logout-button': logoutButton,
    'proton-logo': logo,
    'side-nav-item': sideNavItem,
    'top-nav-products': topNavProducts
  }
}
</script>

<style>
  .app-side-nav {
    width: 200px;
  }
  .app-side-nav-logo {
    width: 150px;
  }
</style>
