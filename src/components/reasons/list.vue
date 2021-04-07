<template>
  <transition-table-state>
    <table v-if="reasons.length" class="table table-white">
      <thead>
      <tr>
        <th class="th w-16">Id</th>
        <th class="th">Name</th>
        <th class="th">Description</th>
        <th class="th w-20"></th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="reason in reasons" :key="reason.id">
        <td class="td">{{ reason.id }}</td>
        <td class="td font-bold">{{ reason.name }}</td>
        <td class="td">{{ reason.description }}</td>
        <td class="td">
          <btn-group-right>
            <delete-reason :id="reason.id"></delete-reason>
            <button class="btn btn-circle btn-hollow-blue" @click="openUpdateModal(reason)">
              <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
            </button>
          </btn-group-right>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Reasons" copy="Use the 'New Reason' button to add reasons."></table-empty-state>
  </transition-table-state>
</template>

<script>
import deleteReason from '@/components/reasons/delete'
import { mapMutations } from 'vuex'

export default {
  props: {
    reasons: Array
  },
  methods: {
    ...mapMutations({
      showUpdateModal: 'SHOW_UPDATE_REASON_MODAL',
      setCurrentReason: 'SET_CURRENT_REASON'
    }),
    openUpdateModal (reason) {
      this.showUpdateModal()
      this.setCurrentReason(reason)
    }
  },
  components: {
    'delete-reason': deleteReason
  }
}
</script>
