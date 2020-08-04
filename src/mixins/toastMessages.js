import store from '@/store'

export const successfulToast = ({ color = 'green', icon = 'thumbs-up', heading = 'Success', content = '', id = Date.now() + Math.random() } = {}) => {
  store.commit('ADD_TOAST', {
    color: color,
    icon: icon,
    heading: heading,
    content: content,
    id: id
  })
}

export const failedToast = ({ color = 'red', icon = 'exclamation-triangle', heading = 'System Failure', content = '', id = Date.now() + Math.random() } = {}) => {
  store.commit('ADD_TOAST', {
    color: color,
    icon: icon,
    heading: heading,
    content: content,
    id: id
  })
}
