<template>
  <content-layout>
    <template v-slot:hud>
      <div class="h-64 flex flex-col justify-center mb-3">
        <h1 class="text-white text-5xl font-hairline">Welcome to Proton</h1>
        <p class="p text-white">Dashboard in progress</p>
      </div>
    </template>
  </content-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      resetBreadCrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  }
}
</script>
