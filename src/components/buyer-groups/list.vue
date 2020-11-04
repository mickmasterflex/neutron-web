<template>
  <base-panel-grid>
    <panel-template v-for="buyerGroup in buyerGroups" :title="buyerGroup.name" :key="buyerGroup.id" class="col-span-2">
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
