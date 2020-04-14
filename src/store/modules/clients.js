import axios from '@/axios'

const state = {
  clients: []
}

const getters = {
  allClients: state => state.clients,
  getClientById: (state, getters) => (id) => {
    return getters.allClients.find(client => client.id === id)
  },
  clientCount: (state, getters) => {
    return getters.allClients.length
  }
}

const actions = {
  async getClients ({ commit }) {
    await axios.get('/clients/')
      .then(response => {
        commit('setClients', response.data)
      })
  },
  async createClient ({ commit }, client) {
    await axios.post('/clients/', client)
      .then(response => {
        commit('createClient', response.data)
      })
  },
  async updateClient ({ commit }, updatedClient) {
    await axios.put(`/clients/${updatedClient.id}/`, updatedClient)
      .then(() => {
        commit('updateClient', updatedClient)
      })
  },
  async deleteClient ({ commit }, id) {
    await axios.delete(`/clients/${id}/`)
      .then(() => {
        commit('deleteClient', id)
      })
  }
}

const mutations = {
  setClients: (state, clients) => (state.clients = clients),
  createClient: (state, client) => state.clients.unshift(client),
  updateClient: (state, updatedClient) => {
    const index = state.clients.findIndex(client => client.id === updatedClient.id)
    if (index !== -1) {
      state.clients.splice(index, 1, updatedClient)
    }
  },
  deleteClient: (state, id) => (state.clients = state.clients.filter(client => client.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
