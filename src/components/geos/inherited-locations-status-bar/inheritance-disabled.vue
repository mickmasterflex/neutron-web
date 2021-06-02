<template>
  <status-bar
    :show="show"
    icon="info-circle"
    color="red"
    enter-active-class="animate__animated animate__fadeIn">
    <template slot="content">
      Location inheritance is deactivated
    </template>
    <template slot="action">
      <activate-inheritance/>
    </template>
  </status-bar>
</template>

<script>
import statusBar from '@/components/ui/status-bar/default'
import activateInheritance from '@/components/geos/inherited-locations-status-bar/activate-inheritance'

export default {
  props: {
    show: Boolean
  },
  components: {
    'status-bar': statusBar,
    'activate-inheritance': activateInheritance
  }
}
</script>
