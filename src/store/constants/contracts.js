const state = {
  contract_status_active: 'active',
  contract_status_paused: 'paused',
  contract_status_archived: 'archived',
  contract_status_terminated: 'terminated'
}

const getters = {
  getNewContractStatuses: state => [
    state.contract_status_active,
    state.contract_status_paused
  ],
  getAllContractStatuses: state => [
    state.contract_status_active,
    state.contract_status_paused,
    state.contract_status_archived,
    state.contract_status_terminated
  ]
}

export default {
  state,
  getters
}
