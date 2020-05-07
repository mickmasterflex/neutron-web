<template>
  <div>
    <h2>Contract Form</h2>
    <table v-if="form.fields">
      <tr>
        <th class="th">ID</th>
        <th class="th">Label</th>
      </tr>
      <tr v-for="field in form.fields" :key="field.id">
        <td>{{field.id}}</td>
        <td>{{field.label}}</td>
      </tr>
    </table>
    <div v-else>
      No Fields
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: Object
  }
}
</script>
