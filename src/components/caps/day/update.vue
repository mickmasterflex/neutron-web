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
      <button class="btn btn-green" @click="submitForm"><font-awesome-icon icon="check"></font-awesome-icon> Save Changes</button>
    </template>
  </panel-modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import panelModal from '@/components/ui/modals/panel-modal'

export default {
  data () {
    return {
      limit: ''
    }
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_UPDATE_DAY_CAP_MODAL'
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
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
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
    day: function () {
      this.setCap()
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
    'panel-modal': panelModal
  }
}
</script>
