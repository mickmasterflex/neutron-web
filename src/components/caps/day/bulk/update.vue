<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>
      <span>{{ selectedDates.length }} Days Selected</span>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field ref="focusField" v-model="limit" rules="required|integer|min_value:0" field_id="limit" field_label="Day Cap"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
<!--      <delete-cap></delete-cap>-->
      <button class="btn btn-green flex-grow" @click="submitForm"><font-awesome-icon icon="check"></font-awesome-icon> Save</button>
    </template>
  </panel-modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import panelModal from '@/components/ui/modals/panel-modal'
// import deleteCap from '@/components/caps/day/delete'

export default {
  data () {
    return {
      limit: ''
    }
  },
  mixins: [setResponseErrors, enterKeyListener],
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_BULK_DAY_CAP_MODAL'
    }),
    ...mapActions({
      update: 'bulkUpdateDayCap'
    }),
    close () {
      this.closeModal()
      this.limit = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            limit: this.limit,
            dates: this.selectedDates.join(),
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
        this.$refs.focusField.focusOnField()
      }
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowBulkDayCapModal',
      parent: 'getCurrentCapParent',
      selectedDates: 'getBulkUpdateDayCaps'
    })
  },
  components: {
    'panel-modal': panelModal
    // 'delete-cap': deleteCap
  }
}
</script>
