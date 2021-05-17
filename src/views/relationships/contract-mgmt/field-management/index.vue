<template>
  <div>
    <div class="flex flex-row justify-between items-center mb-5">
      <h4 class="h3" >
        <span v-if="$route.name === 'BuyerContractFPI'">FPI Preview</span>
        <span v-if="$route.name === 'BuyerContractFields'">Field Management</span>
      </h4>
      <btn-group-right>
        <download-fpi :contract="buyer" :contractLoading="loadingBuyer"></download-fpi>
        <router-link v-if="$route.name === 'BuyerContractFPI'"
                     :to="{ name: 'BuyerContractFields', params: $route.params }"
                     class="btn btn-hollow-blue">Field Management <font-awesome-icon icon="arrow-right"></font-awesome-icon></router-link>
        <router-link v-if="$route.name === 'BuyerContractFields'"
                     :to="{ name: 'BuyerContractFPI', params: $route.params }"
                     class="btn btn-hollow-blue">Preview FPI <font-awesome-icon icon="arrow-right"></font-awesome-icon></router-link>
      </btn-group-right>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOut animate__faster">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import downloadFpi from '@/components/forms/fpi/download-csv'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      loadingBuyer: 'getBuyerFetchLoading'
    })
  },
  components: {
    'download-fpi': downloadFpi
  }
}
</script>
