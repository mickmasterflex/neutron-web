<template>
  <div>
    <transition enter-active-class="animate__animated animate__fadeIn animate__fast" leave-active-class="hidden">
      <button class="btn btn-turquoise" @click="showForm()" v-show="formVisible === false"><font-awesome-icon icon="plus"></font-awesome-icon> New Group</button>
    </transition>
    <transition enter-active-class="animate__animated animate__fadeIn animate__fast" leave-active-class="hidden" v-on:after-enter="$refs.focusField.focusOnField()">
      <div class="flex flex-row items-start" v-show="formVisible">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm" class="form-horizontal form-horizontal-slim">
            <v-text-field ref="focusField" field_class="field-tall" v-model="name" rules="required" field_id="name" field_label=" Name"></v-text-field>
          </form>
        </validation-observer>
        <button @click="submitForm()" class="btn btn-green ml-2"><font-awesome-icon icon="plus"></font-awesome-icon> Create Group</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      form: 'getCurrentForm',
      formVisible: 'getShowCreatePricingTierGroupForm'
    })
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      create: 'createPricingTierGroup'
    }),
    ...mapMutations({
      showForm: 'SHOW_CREATE_PRICING_TIER_GROUP_FORM',
      showUpdate: 'SHOW_UPDATE_PRICING_TIER_GROUP_MODAL'
    }),
    enterKeyAction () {
      if (document.activeElement === this.$refs.focusField.$refs.field.$refs.field) {
        this.submitForm()
      }
    },
    resetForm () {
      this.name = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name
          }).then(() => {
            this.resetForm()
            this.showUpdate()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
