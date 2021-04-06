<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="h1 text-white">Reasons Management</h1>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'reasons'">
          <router-link :to="{ name: 'Reasons' }">Reasons</router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'mappings'">
          <router-link :to="{ name: 'ResponseMappings' }">Response Mappings</router-link>
        </underscore-tab>
      </underscore-tabs>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </content-layout>
</template>
