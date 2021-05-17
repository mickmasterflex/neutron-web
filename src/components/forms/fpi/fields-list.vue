<template>
  <div>
    <table v-if="fields.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">Label</th>
        <th class="th">Type</th>
        <th class="th">Offers</th>
        <th class="th">Options</th>
      </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="field in fields" :key="field.id + '-' + field.type">
          <td class="td">{{ field.name }}</td>
          <td class="td">{{ field.label }}</td>
          <td class="td">{{ field.type }}</td>
          <td class="td">{{ field.offer_contract_ids }}</td>
          <td class="td">{{ field.options }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else class="well" heading="No fields are available for this contract"/>
  </div>
</template>

<script>
export default {
  props: {
    fields: Array
  }
}
</script>
