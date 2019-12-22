// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from "firebase"
import { firestorePlugin } from 'vuefire'
import store from "./store"
import 'firebase/database'
import JwPagination from 'jw-vue-pagination';



Vue.component('jw-pagination', JwPagination);

Vue.config.productionTip = false

Vue.use(firestorePlugin)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

