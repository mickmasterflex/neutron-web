<template>
  <transition-table-state>
    <table v-if="reasons.length" class="table table-white">
      <thead>
      <tr>
        <th class="th w-16">Id</th>
        <th class="th">Name</th>
        <th class="th">Description</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="reason in reasons" :key="reason.id">
        <td class="td">{{ reason.id }}</td>
        <td class="td font-bold">{{ reason.name }}</td>
        <td class="td">{{ reason.description }}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Reasons" copy="Use the 'New Reason' button to add reasons."></table-empty-state>
  </transition-table-state>
</template>

<script>
export default {
  props: {
    reasons: Array
  }
}
</script>
