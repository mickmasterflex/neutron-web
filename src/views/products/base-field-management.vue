<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">Fields</h1>
        <div class="hud--stat-cards">
          <stat-card :data="baseFieldCount" :title="`Fields`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="flex flex-row justify-between">
        <h2 class="h2-hairline">Base Fields</h2>
        <button class="btn btn-turquoise" @click="showCreateBaseFieldModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Field</button>
      </div>
      <list-base-fields class="mt-5"></list-base-fields>
      <create-base-field-modal></create-base-field-modal>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import createBaseField from '@/components/forms/base-fields/create'
import listBaseFields from '@/components/forms/base-fields/list'

export default {
  methods: {
    ...mapMutations({
      showCreateBaseFieldModal: 'SHOW_CREATE_BASE_FIELD_MODAL'
    }),
    ...mapActions({
      fetchBaseFields: 'fetchBaseFields'
    })
  },
  computed: {
    ...mapGetters({
      baseFieldCount: 'getBaseFieldCount'
    })
  },
  components: {
    'create-base-field-modal': createBaseField,
    'list-base-fields': listBaseFields
  },
  created () {
    this.fetchBaseFields()
  }
}
</script>
