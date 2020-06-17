<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Campaign</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm">
      <v-text-field v-model="name" rules="required" field_id="campaignName" field_label="Campaign Name" class="field-group"></v-text-field>
      <v-text-field v-model="campaign_code" rules="required|alpha_dash" field_id="campaignCode" field_label="Campaign Code" class="field-group"></v-text-field>
    </form>
  </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Campaign</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'

export default {
  data () {
    return {
      name: '',
      campaign_code: ''
    }
  },
  props: {
    partner: Number
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateCampaignModal'
    })
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      create: 'createCampaign'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_CAMPAIGN_MODAL'
    }),
    close () {
      this.name = ''
      this.campaign_code = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            contract: this.partner,
            code: this.campaign_code
          }).then(() => {
            this.close()
          })
        }
      })
    }
  }
}
</script>
