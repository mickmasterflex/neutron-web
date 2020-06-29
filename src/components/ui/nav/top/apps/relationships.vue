<template>
  <ul class="flex flex-row">
    <top-nav-item label="Clients" route="Clients" :active="activeTab === 'clients'"></top-nav-item>
  </ul>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: String,
      default: 'clients'
    }
  }
}
</script>
