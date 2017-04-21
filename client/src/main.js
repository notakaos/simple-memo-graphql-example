// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

const { ROOT_URL } = process.env

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${ROOT_URL}/apollo`,
    transportBatching: true
  }),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
