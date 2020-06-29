<template>
  <ul class="flex flex-row">
    <top-nav-item label="Accounts" route="Users" :active="activeTab === 'accounts'"></top-nav-item>
  </ul>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: String,
      default: 'accounts'
    }
  }
}
</script>
