<template>
  <panel-template title="Lead Data" :show-loader="fetchLoading" :loading-text="fetchLoadingText">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="leadUnlocked" :disabled="putLoading">
        {{ submitButtonText }}
      </button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="flex flex-row flex-wrap">
          <text-field
            v-for="(field, key) in leadData"
            v-model="leadData[key]"
            :key="key"
            :field_label="key"
            :field_disabled="!leadUnlocked"
            :id="key"
            class="mr-2"
          ></text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer>
      <panel-footer>
        <template v-slot:end>
          <button class="btn btn-hollow-red" @click="toggleLeadUnlocked()">
            <span v-if="leadUnlocked">
              <font-awesome-icon icon="lock-open"></font-awesome-icon> Lock to Cancel
            </span>
            <span v-else>
              <font-awesome-icon icon="lock"></font-awesome-icon> Unlock to Edit
            </span>
          </button>
        </template>
      </panel-footer>
    </template>
  </panel-template>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import panelFooter from '@/components/ui/panels/base/footer'

export default {
  data () {
    return {
      leadUnlocked: false,
      leadData: {}
    }
  },
  computed: {
    ...mapGetters({
      lead: 'getCurrentLead',
      putLoading: 'getLeadPutLoading',
      putLoadingText: 'getLeadPutLoadingText',
      fetchLoading: 'getLeadFetchLoading',
      fetchLoadingText: 'getLeadFetchLoadingText'
    }),
    submitButtonText () {
      if (this.putLoading) {
        return this.putLoadingText
      }
      return 'Save Changes'
    }
  },
  methods: {
    toggleLeadUnlocked () {
      this.leadUnlocked = !this.leadUnlocked
      this.setLeadData()
    },
    setLeadData () {
      this.leadData = { ...this.lead.data }
    },
    submitForm () {
      const updatedLead = this.lead
      updatedLead.data = this.leadData
      this.updateLeadData(updatedLead).then(() => {
        this.toggleLeadUnlocked()
      })
    },
    ...mapActions({
      updateLeadData: 'updateLeadData'
    })
  },
  components: {
    'panel-footer': panelFooter
  },
  created () {
    this.setLeadData()
  },
  watch: {
    lead () {
      this.setLeadData()
    }
  }
}
</script>
