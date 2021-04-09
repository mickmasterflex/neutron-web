<template>
  <ul>
    <li class="card" v-for="content in form.additional_form_content_tcpa" :key="`additionalContent-${content.id}`">
      <h4 class="h4">{{ content.type }}</h4>
      <text-field :field_disabled="true"></text-field>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      form: 'getCurrentForm'
    })
  }
}
</script>
