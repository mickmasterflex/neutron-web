<template>
  <panel-template
    :title="content.additional_content_type"
    contentBackgroundColor="white"
  >
    <template #action>
      <span v-if="inheritedFrom">
        Inherited From <router-link :to="{ name: 'BuyerContractFieldManagement', params: { id: inheritedFrom.id, client: clientSlug } }" class="text-link">{{inheritedFrom.name}}</router-link>
      </span>
      <btn-group-right v-else>
        <delete-content :id="content.id"/>
        <button class="btn btn-hollow-blue btn-circle" @click="showModalAndSetCurrent(content)">
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
        </button>
      </btn-group-right>
    </template>
    <template #content>
      <div class="space-x-4 mb-3">
          <span v-if="content.additional_content_type === 'tcpa'">
            Leadid Toggle: <span class="font-bold" :class="content.leadid_toggle ? 'text-green-600' : 'text-red-500'">{{ content.leadid_toggle }}</span>
          </span>
        <span>
            Double Opt-in: <span class="font-bold" :class="content.double_optin ? 'text-green-600' : 'text-red-500'">{{ content.double_optin }}</span>
          </span>
      </div>
      <div class="well">{{ content.additional_content_block }}</div>
    </template>
  </panel-template>
</template>

<script>
import deleteContent from './delete'
import { mapMutations, mapActions } from 'vuex'

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    inheritedFrom: {
      type: Object
    },
    clientSlug: {
      type: String
    }
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_ADDITIONAL_FORM_CONTENT'
    }),
    ...mapActions({
      showModal: 'showAdditionalFormContentModal'
    }),
    showModalAndSetCurrent (content) {
      this.setCurrent(content)
      this.showModal('update')
    }
  },
  components: {
    'delete-content': deleteContent
  }
}
</script>
