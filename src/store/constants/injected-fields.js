
const state = {
  injected_field_types: [
    { name: 'ADID', id: 'adid' },
    { name: 'Capture Url', id: 'capture_url' },
    { name: 'Hidden', id: 'hidden' },
    { name: 'IP Address', id: 'ip_address' },
    { name: 'Lead ID', id: 'lead_id' },
    { name: 'Universal Lead ID', id: 'leadid_guid' },
    { name: 'Trusted Form', id: 'trusted_form' },
    { name: 'Warm Call Transfer', id: 'warm_call_transfer' }
  ]
}

const getters = {
  getInjectedFieldTypes: state => state.injected_field_types
}

const modules = {
  injectedFieldTypes: state.injected_field_types
}

export default {
  state,
  getters,
  modules
}
