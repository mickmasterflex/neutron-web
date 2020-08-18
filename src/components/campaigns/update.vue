<template>
  <panel-template title="Edit Campaign" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          <v-text-field v-model="campaign_code" rules="required|alpha_dash" field_id="code" field_label="Code"></v-text-field>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      name: '',
      campaign_code: ''
    }
  },
  props: {
    campaign: Object
  },
  watch: {
    campaign: function () {
      this.name = this.campaign.name
      this.campaign_code = this.campaign.code
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateCampaign'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            id: this.campaign.id,
            name: this.name,
            contract: this.campaign.contract,
            code: this.campaign_code
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  computed: {
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.campaign.name || this.campaign_code !== this.campaign.code
      } else {
        return false
      }
    }
  }
}
</script>
