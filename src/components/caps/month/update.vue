<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>Holo</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="limit" rules="required|integer|min_value:0" field_id="limit" field_label="Month Cap"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <delete-cap :id="id"></delete-cap>
      <button class="btn btn-green flex-grow" @click="submitForm"><font-awesome-icon icon="check"></font-awesome-icon> Save</button>
    </template>
  </panel-modal>
</template>

<script>
import panelModal from '@/components/ui/modals/panel-modal'
import deleteCap from '@/components/caps/month/delete'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      limit: '',
      id: null
    }
  },
  mixins: [setResponseErrors, checkUnsavedChangesInModal],
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_UPDATE_MONTH_CAP_MODAL',
      resetSelected: 'RESET_SELECTED_CAP_MONTH'
    }),
    ...mapActions({
      update: 'updateMonthCap'
    }),
    setCap () {
      this.limit = this.month.limit
      this.id = this.month.id
    },
    close () {
      this.closeModal()
      this.limit = ''
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
            date: this.month.date,
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
      if (this.showModal === true) {
        this.setCap()
      }
    },
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateMonthCapModal',
      month: 'getSelectedCapMonth',
      parent: 'getCurrentCapParent'
    }),
    unsavedChanges () {
      if (this.month) {
        return this.limit !== this.month.limit
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
