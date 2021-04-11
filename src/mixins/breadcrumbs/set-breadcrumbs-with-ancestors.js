import { mapGetters, mapMutations } from 'vuex'

export const setBreadcrumbsWithAncestors = {
  computed: {
    ...mapGetters({
      ancestors: 'getCurrentAncestors'
    })
  },
  methods: {
    setBreadcrumbsWithAncestors () {
      if (this.setBreadcrumbText) {
        this.setBreadcrumbText()
      }
      const breadcrumbs = [
        this.clientsBreadcrumb,
        this.clientBreadcrumb
      ]
      this.ancestors.forEach(ancestor => {
        breadcrumbs.push({
          name: this.ancestorBreadcrumbRouteName,
          text: ancestor.name,
          params: {
            clientId: this.$route.params.clientId,
            id: ancestor.id
          },
          query: this.$route.query
        })
      })
      if (this.parentBreadcrumb) {
        breadcrumbs.push(this.parentBreadcrumb)
      }
      breadcrumbs.push(this.currentBreadcrumb)
      this.setBreadcrumbs(breadcrumbs)
    },
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  }
}
