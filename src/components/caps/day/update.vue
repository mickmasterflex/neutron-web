<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>
      <span v-if="day !== null">{{day.month}}/{{day.day}}/{{day.year}}</span>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field
            ref="focusField"
            v-model="limit" rules="required|integer|min_value:0"
            field_id="limit"
            field_label="Day Cap"
            :loading="loading"/>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <delete-cap :id="id"></delete-cap>
      <button class="btn btn-green flex-grow" @click="submitForm" :disabled="loading">
        <font-awesome-icon icon="spinner" pulse v-if="loadingPut"></font-awesome-icon>
        <font-awesome-icon icon="check" v-else></font-awesome-icon> Save
      </button>
    </template>
  </panel-modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import panelModal from '@/components/ui/modals/panel-modal'
import deleteCap from '@/components/caps/day/delete'

export default {
  data () {
    return {
      limit: '',
      id: null
    }
  },
  mixins: [setResponseErrors, checkUnsavedChangesInModal, enterKeyListener],
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_UPDATE_DAY_CAP_MODAL',
      resetSelected: 'RESET_SELECTED_CAP_DAY'
    }),
    ...mapActions({
      update: 'updateDayCap'
    }),
    setCap () {
      if (this.day.attributes) {
        this.limit = this.day.attributes[0].customData.limit
        this.id = this.day.attributes[0].customData.id
      }
    },
    close () {
      this.closeModal()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            limit: this.limit,
            id: this.id,
            date: this.day.id,
            parent: this.parent
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  watch: {
    showModal () {
      if (this.showModal === true && this.day) {
        this.setCap()
        this.$refs.focusField.focusOnField()
      }
    },
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateDayCapModal',
      day: 'getSelectedCapDay',
      parent: 'getCurrentCapParent',
      loading: 'getCapsLoading',
      loadingPut: 'getCapsPutLoading'
    }),
    unsavedChanges () {
      if (this.limit && this.day.attributes) {
        return this.limit !== this.day.attributes[0].customData.limit
      } else {
        return false
      }
    }
  },
  components: {
    'panel-modal': panelModal,
    'delete-cap': deleteCap
  },
  destroyed () {
    this.resetSelected()
  }
}
</script>
