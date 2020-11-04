<template>
  <base-panel-grid>
    <panel-template v-for="buyerGroup in buyerGroups" :title="buyerGroup.name" :key="buyerGroup.id" class="col-span-2">
      <template v-slot:action>
        <delete-group :id="buyerGroup.id"></delete-group>
      </template>
      <template v-slot:content>
        List Contracts
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteGroup from '@/components/buyer-groups/delete'

export default {
  computed: {
    ...mapGetters({
      buyerGroups: 'getBuyerGroups'
    })
  },
  components: {
    'delete-group': deleteGroup
  }
}
</script>
