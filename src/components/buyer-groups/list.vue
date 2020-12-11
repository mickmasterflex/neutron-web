<template>
  <base-panel-grid>
    <table-empty-state
      class="well col-span-2"
      v-if="buyerGroups === undefined"
      heading="No Buyer Groups Added"
      copy="Use the 'New Buyer Group' button to add buyer groups."></table-empty-state>
    <panel-template v-for="buyerGroup in buyerGroups" :title="buyerGroup.name" :subtitle="'id: ' + buyerGroup.id" :key="buyerGroup.id" class="col-span-2">
      <template v-slot:action>
        <span class="flex flex-row mr-2">
          <delete-group :id="buyerGroup.id"></delete-group>
          <button @click="showModalSetCurrent(buyerGroup)" class="btn btn-hollow-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
        </span>
      </template>
      <template v-slot:content>
        List Contracts
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import deleteGroup from '@/components/buyer-groups/delete'

export default {
  computed: {
    ...mapGetters({
      buyerGroups: 'getBuyerGroups'
    })
  },
  components: {
    'delete-group': deleteGroup
  },
  methods: {
    ...mapMutations({
      showModal: 'SHOW_UPDATE_BUYER_GROUP_MODAL',
      setCurrent: 'SET_CURRENT_BUYER_GROUP'
    }),
    showModalSetCurrent (group) {
      this.showModal()
      this.setCurrent(group)
    }
  }
}
</script>
