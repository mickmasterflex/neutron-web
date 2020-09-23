<template>
  <div>
    <span class="mr-3">
      Sold: <span class="text-3xl">{{ month.sold }}</span>
    </span>
    <span v-if="month.limit">
      Cap: <span @click="updateCap()" class="text-link text-3xl">{{ month.limit }}</span>
    </span>
    <button v-else class="btn btn-green" @click="addCap()"><font-awesome-icon icon="plus"></font-awesome-icon> Add Month Cap</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      setSelectedCapMonth: 'SET_SELECTED_CAP_MONTH',
      showCreate: 'SHOW_CREATE_MONTH_CAP_MODAL',
      showUpdate: 'SHOW_UPDATE_MONTH_CAP_MODAL'
    }),
    addCap () {
      this.setSelectedCapMonth(this.month)
      this.showCreate()
    },
    updateCap () {
      this.setSelectedCapMonth(this.month)
      this.showUpdate()
    }
  },
  computed: {
    ...mapGetters({
      month: 'getMonthCapByCurrentMonthDate'
    })
  }
}
</script>
