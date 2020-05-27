import axios from '@/axios'

const state = {
  clients: [],
  current_client: {}
}

const getters = {
  getAllClients: state => state.clients,
  getCurrentClient: state => state.current_client,
  getAllClientsCount: (state) => {
    return state.clients.length
  }
}

const actions = {
  async fetchClients ({ commit }) {
    await axios.get('/clients/')
      .then(response => {
        commit('SET_CLIENTS', response.data)
      })
  },
  async fetchCurrentClient ({ commit }, id) {
    await axios.get(`/clients/${id}/`)
      .then(response => {
        commit('SET_CURRENT_CLIENT', response.data)
      })
  },
  async createClient ({ commit }, client) {
    await axios.post('/clients/', client)
      .then(response => {
        commit('ADD_CLIENT', response.data)
      })
  },
  async updateClient ({ commit }, updatedClient) {
    await axios.put(`/clients/${updatedClient.id}/`, updatedClient)
      .then(response => {
        commit('UPDATE_CLIENT', response.data)
        commit('SET_CURRENT_CLIENT', response.data)
      })
  },
  async deleteClient ({ commit }, id) {
    await axios.delete(`/clients/${id}/`)
      .then(() => {
        commit('REMOVE_CLIENT', id)
      })
  }
}

const mutations = {
  SET_CLIENTS: (state, clients) => (state.clients = clients),
  SET_CURRENT_CLIENT: (state, client) => (state.current_client = client),
  ADD_CLIENT: (state, client) => state.clients.unshift(client),
  UPDATE_CLIENT: (state, updatedClient) => {
    const index = state.clients.findIndex(client => client.id === updatedClient.id)
    if (index !== -1) {
      state.clients.splice(index, 1, updatedClient)
    }
  },
  REMOVE_CLIENT: (state, id) => (state.clients = state.clients.filter(client => client.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
