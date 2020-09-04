<template>
  <panel-modal :show="showModal" @close="close">
    <template v-slot:header>
      <span v-if="day !== null">{{day.day}}</span>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="limit" rules="required|integer" field_id="limit" field_label="Cap"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <delete-cap :id="id"></delete-cap>
      <button class="btn btn-green" @click="submitForm"><font-awesome-icon icon="check"></font-awesome-icon> Save</button>
    </template>
  </panel-modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'
import panelModal from '@/components/ui/modals/panel-modal'
import deleteCap from '@/components/caps/day/delete'

export default {
  data () {
    return {
      limit: '',
      id: null
    }
  },
  mixins: [setResponseErrors],
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
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            limit: this.limit,
            id: this.id,
            date: this.day.id,
            parent: this.caps.id
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
      }
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateDayCapModal',
      day: 'getSelectedCapDay',
      caps: 'getCurrentCaps'
    })
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
